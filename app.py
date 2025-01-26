from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import CORS for cross-origin requests
from pymongo import MongoClient  # Import MongoDB client
import uuid

app = Flask(__name__)

# Enable CORS for the app
CORS(app)

# MongoDB Atlas connection string (Replace <username>, <password>, and <database> with actual values)
MONGO_URI = "mongodb+srv://hrdyaah:12345@cluster0.1dzri.mongodb.net/sookshmadarshini?retryWrites=true&w=majority&appName=Cluster0"

# Connect to MongoDB
try:
    client = MongoClient(MONGO_URI)
    db = client['sookshmadarshini']  # Replace with your actual database name
    cases_collection = db['cases']  # MongoDB collection for storing cases
    users_collection = db['users']  # MongoDB collection for storing user details
    reports_collection = db['reports']  # MongoDB collection for storing user reports
    print("\ud83d\ude80 Successfully connected to MongoDB!")
except Exception as e:
    print(f"\u274c Error connecting to MongoDB: {e}")

@app.route("/")
def home():
    return render_template("login.html")

@app.route("/lginwithgps")
def login_with_gps():
    return render_template("lginwithgps.html")

@app.route("/police-dashboard")
def police_dashboard():
    cases = list(cases_collection.find({}, {"_id": 0}))
    reports = list(reports_collection.find({}, {"_id": 0}))
    return render_template("police-dashboard.html", cases=cases, reports=reports)

@app.route("/user-dashboard")
def user_dashboard():
    cases = list(cases_collection.find({}, {"_id": 0}))
    return render_template("user-dashboard.html", cases=cases)

@app.route("/police", methods=["GET", "POST"])
def handle_cases():
    if request.method == "POST":
        # Add a new case to MongoDB
        data = request.json
        title = data.get("title")
        location = data.get("location")
        date = data.get("date")
        case_type = data.get("case_type")

        if not title or not location or not date or not case_type:
            return jsonify({"message": "Invalid input"}), 400

        new_case = {
            "title": title,
            "location": location,
            "date": date,
            "case_type": case_type
        }

        cases_collection.insert_one(new_case)  # Insert into MongoDB
        return jsonify({"message": "Case added successfully!", "case": new_case}), 201
    else:
        cases = list(cases_collection.find({}, {"_id": 0}))
        print(cases)
        return jsonify(cases)

@app.route("/reports", methods=["POST"])
def handle_reports():
    case_id = request.json.get("case_id")
    content = request.json.get("content")

    if not case_id or not content:
        return jsonify({"message": "Invalid input"}), 400

    report = {
        "case_id": case_id,
        "content": content
    }
    reports_collection.insert_one(report)  # Insert report into MongoDB collection

    return jsonify({"message": "Report submitted successfully!"}), 201

@app.route("/login", methods=["POST"])
def login():
    user_data = request.json
    user_type = user_data.get("user_type")
    username = user_data.get("username")
    location = user_data.get("location")

    if not user_type or not username or not location:
        return jsonify({"message": "Invalid input"}), 400

    user_data["id"] = str(uuid.uuid4())
    users_collection.insert_one(user_data)

    return jsonify({"message": "Login successful!", "user": user_data}), 200

if __name__ == "__main__":
    print("Flask server is running at http://127.0.0.1:5000/")
    app.run(debug=True)
