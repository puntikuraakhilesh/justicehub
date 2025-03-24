# Justice Hub: Bridging the Gap Between Citizens and Legal Experts

## Overview
Justice Hub is a web-based platform designed to enhance access to legal services by connecting citizens with experienced legal professionals. Built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**, it provides a seamless interface for users to file cases, consult legal professionals, and receive guidance through an AI-powered chatbot. 

The platform incorporates real-time chat functionality, allowing for direct communication between users and lawyers. Additionally, the **Know Your Rights (KYR) chatbot** provides legal assistance and document summarization, making legal services more accessible and user-friendly.

---

## Features

### Citizen Features
- **User Registration & Login** – Secure authentication for citizens to access legal services.
- **Case Filing** – Submit legal cases with structured details.
- **Find Lawyers** – Search and filter legal professionals based on expertise and experience.
- **Know Your Rights Chatbot** – AI-powered chatbot offering legal guidance.
- **Real-Time Chat** – Communicate with advocates directly after request approval.
- **Case Tracking** – Monitor the progress of filed cases.

### Advocate Features
- **Lawyer Registration & Profile Management** – Legal professionals can create and update their profiles.
- **Case Management** – View, accept, or reject legal case requests from citizens.
- **Secure Communication** – Real-time chat with clients for legal consultation.

### Additional Features
- **AI-Powered Legal Assistance** – The KYR chatbot provides law-related queries.
- **Data Security & Privacy** – Encrypted conversations and secure data storage.

---

## Technology Stack

### Frontend:
- **React.js** – Interactive UI design.
- **Tailwind CSS** – Responsive styling framework.

### Backend:
- **Node.js & Express.js** – API handling and business logic.
- **Socket.io** – Real-time chat functionality.
- **JWT Authentication** – Secure login and authentication system.

### Database:
- **MongoDB** – NoSQL database for storing user and case details.
- **Mongoose ORM** – Schema modeling and database interaction.

### AI Integration:
- **Gemini API** – AI-driven chatbot for legal assistance.

---

## Installation & Setup

### Prerequisites
Ensure you have the following installed before proceeding:
- **Node.js (v16 or higher)** – [Download here](https://nodejs.org/)
- **MongoDB** – [Download here](https://www.mongodb.com/try/download/community)
- **Git** – [Download here](https://git-scm.com/)

### Clone the Repository
```sh
$ git clone https://github.com/your-repo-url/puntikuraakhilesh-justicehub.git
$ cd puntikuraakhilesh-justicehub
```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   $ cd backend
   ```
2. Install dependencies:
   ```sh
   $ npm install
   ```
3. Create a `.env` file and configure the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```sh
   $ npm start
   ```
   The backend server will run on `http://localhost:5000/`

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   $ cd ../frontend
   ```
2. Install dependencies:
   ```sh
   $ npm install
   ```
3. Start the frontend server:
   ```sh
   $ npm start
   ```
   The frontend will be accessible at `http://localhost:3000/`

---

## Usage Guide

1. **Register/Login** – Citizens and lawyers create accounts.
2. **File a Case** – Citizens submit legal issues.
3. **Search & Connect with Lawyers** – Find legal professionals.
4. **Real-Time Chat** – Communicate after case approval.
5. **Know Your Rights Chatbot** – Ask legal queries and get AI-generated responses.

---

## Future Enhancements

- **Multilingual Support** – Expanding language options.
- **Video Consultation** – Real-time video interactions between clients and advocates.
- **Document Management System** – Securely store and share legal documents.
- **Automated Case Status Updates** – Notify users about their case progress.
- **Enhanced Security Measures** – Improve encryption and authentication protocols.

---

## Contributors

- **Puntikura Akhilesh Kumar**
- **Thota Sathwika**
- **Yedla Sharvani**

---

## License
This project is licensed under the **MIT License**.

For any queries, reach out to us at akhilesh.p1211@gmail.com,sharvani.yedla@gmail.com,thota.sathwika@gmail.com.
