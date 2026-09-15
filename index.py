from flask import Flask, jsonify

app = Flask(__name__)

# Real Full-Stack Data Warehouse mapping your actual completed internship items
COMPLETED_INTERNSHIP_TASKS = [
    {
        "name": "Password Strength Analyzer",
        "stack": "HTML5 • CSS3 • Vanilla JavaScript",
        "metrics": "100% Client-Side Computation Safe",
        "scope": "Developed an interactive web application that evaluates password entropy, character pools, and prevents credential reuse vulnerabilities via simulated database verification loops."
    },
    {
        "name": "Network Vulnerability Scanner",
        "stack": "Python • Sockets • Network Protocols",
        "metrics": "Automated Administrative Log Compilation",
        "scope": "Engineered a network penetration reconnaissance tool designed to probe transport layers, execute banner grabbing actions, and cross-reference legacy software profile leaks."
    },
    {
        "name": "Phishing Email Detection Model",
        "stack": "Python • Scikit-Learn • NLP",
        "metrics": "Achieved High-Precision Accuracy Metrics",
        "scope": "Trained an advanced text vectorization machine learning model using Multinomial Naive Bayes algorithms to parse string anomalies and classify malicious email communications."
    }
]

@app.route('/api/v1/portfolio/assets', methods=['GET'])
def retrieve_portfolio_assets():
    """Serverless REST API yielding real project data maps securely."""
    try:
        return jsonify({
            "success": True,
            "bio": "Cybersecurity & Full-Stack engineering intern specializing in security analytics, text-based machine learning, and secure cloud pipelines.",
            "data": COMPLETED_INTERNSHIP_TASKS
        }), 200
    except Exception as error:
        return jsonify({"success": False, "error": str(error)}), 500

if __name__ == '__main__':
    app.run()
