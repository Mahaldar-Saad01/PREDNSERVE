# 🍽️ PREDNSERVE

PREDNSERVE is a full-stack restaurant sales prediction and management web application built as a beginner project. It allows users to register, log in, manage restaurants, upload datasets, and predict future sales using machine learning.

This project combines backend development, frontend development, database integration, authentication, and ML features in one system.

> ⚡ This is my first project, so there may be mistakes or areas for improvement. It was built mainly for learning and practical experience.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- Secure Login with JWT Authentication
- Protected Routes

### 🍴 Restaurant Management
- Create Restaurants
- View Restaurants linked to logged-in user

### 📊 Machine Learning Features
- Upload dataset
- Predict sales using trained ML model

### 🖥️ Frontend Dashboard
- Responsive UI with Sidebar Navigation
- Dashboard Pages
- React Routing

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- Axios
- React Router DOM

### Backend
- FastAPI
- Python
- SQLAlchemy
- JWT Authentication

### Database
- SQL Database

### Machine Learning
- Python
- Jupyter Notebook
- Trained Prediction Model

---

## 📂 Project Structure
```
PREDNSERVE/
│── frontend/
│   └── smart/vite-project/
│       ├── src/
│       ├── package.json
│
│── routers/
│── main.py
│── auth.py
│── database.py
│── models.py
│── schemas.py
│── ml_service.py
│── ml_model_train.ipynb
│── requirements.txt
```

⚙️ Installation Guide
1️⃣ Clone Repository

    git clone https://github.com/your-username/PREDNSERVE.git
    cd PREDNSERVE
    
2️⃣ Backend Setup

Create virtual environment:

     python -m venv env

Activate:

     source env/bin/activate

or on Windows:

     env\Scripts\activate

Install dependencies:

    pip install -r requirements.txt

Run backend:

    uvicorn main:app --reload

Backend runs on:

    http://127.0.0.1:8000
    
3️⃣ Frontend Setup

Go to frontend folder:

    cd frontend/smart/vite-project

Install packages:

    npm install

Run frontend:

    npm run dev

Frontend runs on:

    http://localhost:5173

📈 Future Improvements

  Better UI Design
  Better Error Handling
  Role Based Access
  Real-time Analytics
  Improved ML Accuracy
  Unit Testing
  
👨‍💻 Author

  ~Mahaldar Saad
  ~Saniya Syeda

📄 License

   This project is for learning and educational purposes.
