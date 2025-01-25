from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory storage for demo purposes
cases = []
reports = []

# Routes for HTML pages
@app.route('/')
def home():
    return render_template('login.html')

@app.route('/police-dashboard')
def police_dashboard():
    return render_template('police_dashboard.html')

@app.route('/user-dashboard')
def user_dashboard():
    return render_template('user_dashboard.html')

# API for handling case submissions (Police)
@app.route('/api/file_case', methods=['POST'])
def file_case():
    data = request.json
    case = {
        "title": data['title'],
        "location": data['location'],
        "date": data['date'],
        "type": data['type']
    }
    cases.append(case)
    return jsonify({"message": "Case filed successfully", "case": case}), 201

# API for fetching all cases
@app.route('/api/cases', methods=['GET'])
def get_cases():
    return jsonify(cases), 200

# API for user reports
@app.route('/api/submit_report', methods=['POST'])
def submit_report():
    data = request.json
    report = {
        "case_id": data['case_id'],
        "content": data['content']
    }
    reports.append(report)
    return jsonify({"message": "Report submitted successfully", "report": report}), 201

# API for fetching reports
@app.route('/api/reports', methods=['GET'])
def get_reports():
    return jsonify(reports), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
