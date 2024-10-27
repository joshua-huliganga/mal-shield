from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
from sklearn import svm
from LoadData import load_data_URL, prepare_data_URL, process_data_EMAIL


# *************** FOR URL ***************


# # Load and preprocess URL data
# data_URL = load_data_URL()
# X_URL, y_URL, vectorizer_URL = prepare_data_URL(data_URL)

# # Split the dataset
# X_train_URL, X_test_URL, y_train_URL, y_test_URL = train_test_split(X_URL, y_URL, test_size=0.2, random_state=42)

# # Initialize and train the model
# model_URL = RandomForestClassifier(n_estimators=100, random_state=42)
# model_URL.fit(X_train_URL, y_train_URL)

# # Make predictions and evaluate the model
# predictions_URL = model_URL.predict(X_test_URL)
# print("Accuracy:", accuracy_score(y_test_URL, predictions_URL))
# print("Classification Report:\n", classification_report(y_test_URL, predictions_URL))

# # Save the model and vectorizer
# joblib.dump(model_URL, 'models/url_detector_model.pkl')
# joblib.dump(vectorizer_URL, 'models/vectorizer.pkl')


# *************** FOR EMAIL ***************


X_EMAIL, y_EMAIL, vectorizer_EMAIL = process_data_EMAIL()

# Split the dataset
X_train_EMAIL, X_test_EMAIL, y_train_EMAIL, y_test_EMAIL = train_test_split(X_EMAIL, y_EMAIL, test_size=0.2, random_state=42)

# Initialize and train the model
model_EMAIL = svm.SVC(kernel="linear")
model_EMAIL.fit(X_train_EMAIL, y_train_EMAIL)

# Make predictions and evaluate the model
predictions_EMAIL = model_EMAIL.predict(X_test_EMAIL)
print("Accuracy:", accuracy_score(y_test_EMAIL, predictions_EMAIL))
print("Classification Report:\n", classification_report(y_test_EMAIL, predictions_EMAIL))

# Save the model and vectorizer
joblib.dump(model_EMAIL, 'models/email_detector_model.pkl')
joblib.dump(vectorizer_EMAIL, 'models/vectorizer_email.pkl')