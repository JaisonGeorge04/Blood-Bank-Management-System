**🩸 Blood Bank Management System** 

A Dockerized Blood Bank Management System built with Flask and MySQL, designed to streamline donor registration, blood inventory tracking, and request processing through secure REST APIs.
   
**📋 Overview**
The Blood Bank Management System is a full-stack backend application that digitizes and automates core blood bank operations. It supports donor registration, real-time blood inventory management, and request processing for hospitals and patients— with an automated shortage alert engine that flags low-stock blood groups before they become critical.

The entire application is containerized with Docker for consistent deployment across environments, and I tested all APIs end-to-end in Postman. 
 
**✨ Key Features**
 
🩸 Donor Registration — Secure API endpoints to register and manage donor records
📦 Blood Inventory Management — Real-time tracking of blood group stock levels
🔔 Automated Shortage Alert Engine — Flags critical blood group shortages automatically
🔄 Request Processing — Handles blood requests from hospitals/patients with status tracking
👥 Multi-Role Support — Separate access flows for donors, hospital staff, and administrators
🐳 Fully Dockerized — Simplified, consistent deployment using Docker containers
✅ Tested REST APIs — All endpoints validated using Postman for reliability

**🛠️ Tech Stack**

CategoryTechnologyLanguagePythonBackend FrameworkFlaskDatabaseMySQLAPI ArchitectureREST APIsContainerizationDockerAPI TestingPostmanVersion ControlGit & GitHub

**🏗️ System Architecture**

┌─────────────┐      ┌──────────────┐      ┌───────────────┐
│   Client /  │─────▶│  Flask REST  │─────▶│  MySQL         │
│   Postman   │◀─────│  API Layer   │◀─────│  Database      │
└─────────────┘      └──────────────┘      └───────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Shortage Alert  │
                    │  Engine          │
                    └──────────────────┘

The application follows a layered architecture in which a Flask REST API handles incoming requests and communicates with a MySQL database for persistent data storage. An automated alert engine continuously monitors blood inventory levels and generates notifications when it detects a shortage.

The API provides the following endpoints: POST /donors to register a new blood donor, GET /donors/{id} to retrieve the details of a specific donor, GET /inventory to retrieve the current blood inventory levels, PATCH /inventory/{blood_group} to update the stock for a specific blood group, POST /requests to submit a new blood request, and GET /requests/{id} to retrieve the status of a specific blood request.

We tested all endpoints for success and error scenarios (e.g., invalid blood group, duplicate donor registration) using Postman. 

**🚀 Getting Started**

Prerequisites

Python 3.10+
Docker & Docker Compose
MySQL (or use the Dockerized MySQL service)

**Installation & Setup**

bash# Clone the repository
git clone https://github.com/<your-username>/blood-bank-management-system.git
cd blood-bank-management-system

# Build and run using Docker
docker build -t blood-bank-app
docker run -p 5000:5000 blood-bank-app

Environment Variables

Create a .env file in the root directory with your database configuration:

envDB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blood_bank_db

Running Locally (without Docker)

bash# Create a virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask application
python app.py

The API will be available at http://localhost:5000.

🧪 Testing

All API endpoints were manually tested using Postman, covering:

✅ Successful request/response flows
⚠️ Edge cases (invalid inputs, duplicate records)
🔒 Error handling and proper HTTP status codes

**📈 Future Enhancements**

 Add JWT-based authentication for role-based API access
 Integrate email/SMS notifications for shortage alerts
 Add a front-end dashboard for hospital staff and administrators
 Deploy to AWS with CI/CD automation via GitHub Actions
 Add automated unit/integration tests (e.g., using Pytest)

**👤 Author**

Jaison George
📧 jaisongeorge699@gmail.com
