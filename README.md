# Extracto

A Text Extraction Service from Images Using Google Cloud Vision API

Extracto is a web application that allows users to easily extract text from images using the Google Cloud Vision API. The application requires no authentication to access and provides a simple interface to upload images and retrieve the extracted text. It utilizes a JavaScript frontend with ReactJS for user interaction and a NodeJS backend for handling the interaction with the Google Cloud Vision API. The backend is containerized using Docker and deployed on Google Cloud Run for a scalable, serverless hosting environment. Continuous integration and deployment are managed through GitHub Actions, ensuring automated deployment with every change to the backend code.

## Features

- Extracts text from images using Google Cloud Vision API.
- No authentication required to access the service.
- Serverless backend hosted on Google Cloud Run for scalable and reliable performance.
- Integrated Continuous Integration and Continuous Deployment (CI/CD) pipeline using GitHub Actions for automatic backend deployments.
- Containerized backend ensures consistent environment across all deployments.

## Frontend (ReactJS):

- Provides an intuitive interface for users to upload images.
- User uploads an image, and the frontend displays the extracted text.
- Frontend sends the image to the backend for processing with the Google Cloud Vision API.

## Backend (NodeJS with JavaScript):

- Receives the image from the frontend and processes it using the Google Cloud Vision API.
- The backend interacts with the Cloud Vision API to extract text from the image.
- Returns the extracted text back to the frontend.

## Docker & Google Cloud Run:

- The backend is containerized using Docker to ensure consistency across development and production environments.
- Deployed on Google Cloud Run for a fully serverless solution that scales automatically based on incoming requests.
- Supports seamless horizontal scaling, making it suitable for high-volume traffic.

## Continuous Integration and Delivery (CI/CD) with GitHub Actions:

- GitHub Actions automates the build and deployment process for the backend.
- Every change to the backend code triggers an automated pipeline, ensuring fast and reliable deployments.

## Source Control with GitHub:

- The project uses GitHub for version control, allowing for efficient collaboration and management of the codebase.
- Features branch management, pull requests, and code reviews to maintain quality throughout the development process.

## How It Works

1. **Frontend (ReactJS)**:
   - The user uploads an image to the frontend.
   - The frontend sends the image to the backend for processing using the Google Cloud Vision API.

2. **Backend (NodeJS with JavaScript)**:
   - The backend receives the image, processes it with the Google Cloud Vision API, and extracts the text from the image.
   - The extracted text is sent back to the frontend for display.

3. **Deployment (Google Cloud Run)**:
   - The backend is containerized using Docker and deployed on Google Cloud Run, ensuring seamless scalability and reliability.

## Possible Improvements

- **Multi-language Support**: Enhance the text extraction to support multiple languages.
- **Image Preprocessing**: Add functionality to preprocess images for better text recognition (e.g., image sharpening, resizing).
- **Bulk Extraction**: Implement functionality for batch processing of multiple images at once.
- **User Authentication**: Introduce user authentication and allow users to save and manage their extracted text history.
