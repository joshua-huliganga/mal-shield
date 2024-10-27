import joblib

# *************** FOR URL ***************


# Load the trained model and vectorizer for URL
model_URL = joblib.load('models/url_detector_model.pkl')
vectorizer_URL = joblib.load('models/vectorizer.pkl')

def predict_url(url):
    vectorized_url = vectorizer_URL.transform([url]).toarray()  # Vectorize the URL
    prediction = model_URL.predict(vectorized_url)[0]
    
    # Map predictions (assuming 0 = benign, 1 = malicious)
    label_map = {0: "benign", 1: "malicious"}
    return label_map.get(prediction, "unknown")


# *************** FOR EMAIL ***************


# Load the trained model and vectorizer for EMAIL
model_EMAIL = joblib.load('models/email_detector_model.pkl')
vectorizer_EMAIL = joblib.load('models/vectorizer_email.pkl')

def predict_email(email):
    vectorized_email = vectorizer_EMAIL.transform([email]).toarray()  # Vectorize the email
    prediction = model_EMAIL.predict(vectorized_email)[0]
    
    # Map predictions (assuming 0 = benign, 1 = malicious)
    label_map = {0: "benign", 1: "malicious"}
    return label_map.get(prediction, "unknown")