from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import CORS for cross-origin requests
from pymongo import MongoClient  # Import MongoDB client
import uuid

app = Flask(__name__)

# Enable CORS for the app
CORS(app)

# MongoDB Atlas connection string (Replace <username>, <password>, and <database> with actual values)
MONGO_URI = "mongodb+srv://hrdyaah:12345@cluster0.1dzri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client['<database>']  # Replace with your database name
cases_collection = db['cases']  # MongoDB collection for storing cases

@app.route("/")
def home():
    return render_template("login.html")

@app.route("/lginwithgps")
def login_with_gps():
    return render_template("lginwithgps.html")

@app.route("/police-dashboard")
def police_dashboard():
    return render_template("police-dashboard.html")

@app.route("/user-dashboard")
def user_dashboard():
    return render_template("user-dashboard.html")

@app.route("/cases", methods=["GET", "POST"])
def handle_cases():
    if request.method == "POST":
        # Add a new case to MongoDB
        title = request.json.get("title")
        location = request.json.get("location")

        if not title or not location:
            return jsonify({"message": "Invalid input"}), 400

        new_case = {
            "_id": str(uuid.uuid4()),  # Generate unique ID for MongoDB
            "title": title,
            "location": location
        }

        cases_collection.insert_one(new_case)  # Insert into MongoDB

        return jsonify({"message": "Case added successfully!", "case": new_case}), 201

    # Get all cases from MongoDB
    cases = list(cases_collection.find({}, {"_id": 0}))  # Exclude MongoDB default _id field from response
    return jsonify(cases)

@app.route("/reports", methods=["POST"])
def handle_reports():
    case_id = request.json.get("case_id")
    content = request.json.get("content")

    if not case_id or not content:
        return jsonify({"message": "Invalid input"}), 400

    # Store report into MongoDB (you can create a new 'reports' collection if needed)
    report = {
        "case_id": case_id,
        "content": content
    }
    db.reports.insert_one(report)  # Insert report into MongoDB collection

    return jsonify({"message": "Report submitted successfully!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
