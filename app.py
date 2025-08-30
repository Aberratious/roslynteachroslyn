from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

# In-memory storage for requests (for demo purposes)
schedule_requests = []

@app.route('/api/schedule', methods=['POST'])
def schedule():
    data = request.json
    # Add student info if available (you can expand this)
    schedule_requests.append({
        'tutorEmail': data['tutorEmail'],
        'tutorName': data['tutorName'],
        # Add more fields as needed, e.g. student name, message, etc.
    })
    # Here you could send an email to the tutor using smtplib or a service
    return jsonify({'status': 'ok'})

@app.route('/api/requests', methods=['GET'])
def get_requests():
    return jsonify(schedule_requests)

if __name__ == '__main__':
    app.run(port=5000, debug=True)