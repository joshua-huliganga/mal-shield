import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer


# *************** FOR URL ***************


# Load the dataset
def load_data_URL(filepath='urlset.csv'):
    data = pd.read_csv(filepath)
    data = data.dropna()  # Basic data cleaning
    return data

# Prepare data for training/testing
def prepare_data_URL(data):
    vectorizer = TfidfVectorizer(max_features=500)  # Adjust max_features as needed
    X = vectorizer.fit_transform(data['url']).toarray()  # Vectorize URLs
    y = data['label']  # Replace with your actual label column name (e.g., 'label')
    return X, y, vectorizer


# *************** FOR EMAIL ***************


# Load and process the dataset
def process_data_EMAIL(filepath='Phishing_Email.csv'):
    
    # load data and process it to make output 0 or 1
    data = pd.read_csv(filepath)
    mapping = {'Safe Email':0, 'Phishing Email':1}
    data['Email Type'] = data['Email Type'].replace(mapping)
    data.to_csv('Phishing_Email.csv', index=False)
    pd.set_option("future.no_silent_downcasting", True)

    # remove empty data    
    data.dropna(subset=['Email Text'], inplace=True)
   
    # update data
    X = data['Email Text']
    y = data['Email Type']
    
    # create vectorizer object and use it to vectorize inputs (X)
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(X)

    return X, y, vectorizer