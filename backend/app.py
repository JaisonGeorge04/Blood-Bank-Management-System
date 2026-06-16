# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import pooling
from werkzeug.security import generate_password_hash, check_password_hash
from config import DB_CONFIG
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Connection pool
cnxpool = pooling.MySQLConnectionPool(
    pool_name="bloodbank_pool",
    pool_size=5,
    **DB_CONFIG
)

def get_conn():
    return cnxpool.get_connection()

# Utility to fetch one row
def fetch_one(query, params=()):
    conn = get_conn()
    cur = conn.cursor(dictionary=True)
    cur.execute(query, params)
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row

# Utility to fetch all rows
def fetch_all(query, params=()):
    conn = get_conn()
    cur = conn.cursor(dictionary=True)
    cur.execute(query, params)
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows

# Utility to execute (insert/update/delete)
def execute(query, params=()):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(query, params)
    conn.commit()
    lastid = cur.lastrowid
    cur.close()
    conn.close()
    return lastid

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'error': 'Missing required fields'}), 400

    hashed = generate_password_hash(data['password'])

    try:
        user_id = execute(
            "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)",
            (data['name'], data['email'], hashed, data.get('role', 'donor'))
        )
    except mysql.connector.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 409

    # Optional donor profile
    if data.get('role') == 'donor' and data.get('blood_group'):
        execute(
            "INSERT INTO donors (user_id, blood_group, location, last_donation_date) "
            "VALUES (%s, %s, %s, %s)",
            (user_id, data.get('blood_group'), data.get('location'), data.get('last_donation_date'))
        )

    return jsonify({'message': 'User registered', 'user_id': user_id}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing credentials'}), 400

    user = fetch_one(
        "SELECT id, name, email, password, role FROM users WHERE email=%s",
        (data['email'],)
    )

    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401

    if check_password_hash(user['password'], data['password']):
        user.pop('password', None)
        return jsonify(user)

    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/donors/<int:id>', methods=['PUT'])
def update_donor(id):
    data = request.json
    required = ('blood_group', 'location', 'last_donation_date')
    if not all(k in data for k in required):
        return jsonify({'error': 'Missing fields'}), 400

    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        UPDATE donors
        SET blood_group = %s, location = %s, last_donation_date = %s
        WHERE id = %s
    """, (data['blood_group'], data['location'], data['last_donation_date'], id))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'message': 'Donor updated successfully!'})

@app.route('/api/donors', methods=['GET'])
def get_donors():
    rows = fetch_all("""
        SELECT d.id, d.user_id, u.name, d.blood_group, d.location, d.last_donation_date
        FROM donors d
        JOIN users u ON d.user_id = u.id
    """)
    return jsonify(rows)

@app.route('/api/donors/<int:id>', methods=['DELETE'])
def delete_donor(id):
    execute("DELETE FROM donors WHERE id=%s", (id,))
    return jsonify({'message': 'Donor deleted successfully!'})

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    return jsonify(fetch_all("SELECT * FROM inventory"))

@app.route('/api/inventory/<blood_group>', methods=['PUT'])
def update_inventory(blood_group):
    data = request.json
    if 'units' not in data:
        return jsonify({'error': 'Missing units value'}), 400

    existing = fetch_one("SELECT * FROM inventory WHERE blood_group=%s", (blood_group,))
    if existing:
        execute(
            "UPDATE inventory SET units_available=%s WHERE blood_group=%s",
            (data['units'], blood_group)
        )
    else:
        execute(
            "INSERT INTO inventory (blood_group, units_available) VALUES (%s, %s)",
            (blood_group, data['units'])
        )

    return jsonify({'message': 'Inventory updated'})

@app.route('/api/request', methods=['POST'])
def create_request():
    data = request.json
    required = ('hospital_id', 'blood_group', 'quantity')
    if not all(k in data for k in required):
        return jsonify({'error': 'Missing fields'}), 400

    request_id = execute(
        "INSERT INTO requests (hospital_id, blood_group, quantity, status) "
        "VALUES (%s, %s, %s, 'pending')",
        (data['hospital_id'], data['blood_group'], data['quantity'])
    )

    return jsonify({'message': 'Request submitted', 'request_id': request_id}), 201

@app.route('/api/requests', methods=['GET'])
def list_requests():
    rows = fetch_all("""
        SELECT r.*, u.name AS hospital_name
        FROM requests r
        JOIN users u ON r.hospital_id = u.id
        ORDER BY r.created_at DESC
    """)
    return jsonify(rows)

@app.route('/api/request/<int:id>', methods=['PUT'])
def approve_or_reject(id):
    data = request.get_json()
    new_status = data.get("status")

    # Optional: validate allowed statuses
    if new_status not in ("approved", "rejected", "pending"):
        return jsonify({"error": "Invalid status"}), 400

    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("UPDATE requests SET status=%s WHERE id=%s", (new_status, id))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Status updated"})
    except Exception as e:
        # Helpful logging while you’re developing
        print("Error updating request:", e)
        return jsonify({"error": "Update failed"}), 500

@app.route('/api/users', methods=['GET'])
def list_users():
    return jsonify(fetch_all("SELECT id, name, email, role, created_at FROM users"))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
