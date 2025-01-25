from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
import uuid

app = Flask(__name__)

# Enable CORS to allow cross-origin requests
CORS(app)

# Configure the database (SQLite for simplicity)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cases.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Case model for the database
class Case(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    title = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Case {self.title}>'

# Create the database
with app.app_context():
    db.create_all()

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
        # Add a new case
        title = request.json.get("title")
        location = request.json.get("location")

        if not title or not location:
            return jsonify({"message": "Invalid input"}), 400

        new_case = Case(title=title, location=location)
        db.session.add(new_case)
        db.session.commit()

        return jsonify({"message": "Case added successfully!", "case": {
            "id": new_case.id,
            "title": new_case.title,
            "location": new_case.location
        }}), 201

    # Get all cases
    cases = Case.query.all()
    case_list = [{"id": case.id, "title": case.title, "location": case.location} for case in cases]
    return jsonify(case_list)

@app.route("/reports", methods=["POST"])
def handle_reports():
    case_id = request.json.get("case_id")
    content = request.json.get("content")

    if not case_id or not content:
        return jsonify({"message": "Invalid input"}), 400

    # Log the report (replace with DB or further processing in production)
    print(f"New report submitted for case {case_id}: {content}")
    return jsonify({"message": "Report submitted successfully!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
