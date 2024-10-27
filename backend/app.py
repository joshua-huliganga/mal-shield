from flask import Flask, request, jsonify
from predict import predict_url, predict_email

app = Flask(__name__)


# *************** POST REQUEST FOR URL ***************


@app.route('/predictURL', methods=['POST'])
def predictURL():
    data = request.get_json()
    # print("Received request data:", data)  # Debugging line to print incoming data

    if not data or 'url' not in data:
        return jsonify({"error": "No URL provided"}), 400  # Return an error if URL is missing
    url = data.get('url')
    prediction = predict_url(url)
    return jsonify({"url": url, "prediction": prediction})


# *************** POST REQUEST FOR EMAIL ***************


@app.route('/predictEMAIL', methods=['POST'])
def predictEMAIL():
    data = request.get_json()
    # print("Received request data:", data)  # Debugging line to print incoming data

    if not data or 'email_text' not in data:
        return jsonify({"error": "No email text provided"}), 400  # Return an error if email text is missing
    email = data.get('email_text')
    prediction = predict_email(email)
    return jsonify({"email": email, "prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)
