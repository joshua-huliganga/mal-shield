# MalShield

MalShield is a machine-learning-powered tool designed to help users identify potentially malicious URLs or email content. By leveraging trained models on various online datasets, MalShield provides an assessment of whether the provided input is likely to be malicious. Additionally, the app integrates the Google Gemini API to generate a brief commentary based on the results, providing more context for users.

## Features

- **URL and Email Analysis**: Takes user input of either a URL or an email body text and evaluates its potential risk.
- **Machine Learning Models**: Uses pre-trained models on curated online datasets for accurate classification.
- **Google Gemini API Integration**: Generates a brief commentary to explain the classification results to the user.
- **React and Flask**: Built with a React frontend and a Flask backend to provide a seamless user experience.

## How It Works

1. User Input: Users provide a URL or email text.

2. Classification: The input is analyzed using machine learning models trained on extensive datasets, returning a classification result.

3. Commentary: The Google Gemini API generates a brief commentary explaining the model's assessment.

4. Output: Both the classification result and commentary are displayed to the user.

## Technologies Used

#### Frontend: React
#### Backend: Flask
#### Machine Learning: Custom models for URL and email classification
#### API: Google Gemini for commentary generation

## Setup

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install

3. Start the frontend client:
   ```bash
   npm run dev
   
### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend

2. Install dependencies:
   ```bash
   pip install -r requirements.txt

3. Start the backend server:
   ```bash
   python app.py