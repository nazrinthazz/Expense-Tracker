# Expense-Tracker
Expense Tracker is a serverless web app built with AWS Lambda, API Gateway, and DynamoDB. Users can add, view, and delete expenses, see totals in INR, and visualize daily, monthly, and category-wise expenses with interactive charts.
Project Overview

The Expense Tracker is a web-based application developed using AWS services that allows users to record, manage, and visualize their daily expenses. The system provides real-time expense tracking, summary statistics, and visual charts to help users analyze their spending habits efficiently.

Features
Add, edit, and delete expenses with categories, dates, and tags.
Maintain a history of all expenses for each user.
Generate interactive charts:
Daily, Monthly, and Category-wise visualization.
Line charts for time-series data and pie charts for category distribution.
Currency is fixed to INR.
Responsive and user-friendly interface.
Optional custom categories for personalized expense tracking.

Objectives
Provide a simple, intuitive interface for expense management.
Enable users to visualize spending patterns through interactive charts.
Maintain a persistent record of expenses using AWS DynamoDB.
Demonstrate practical usage of serverless architecture using AWS Lambda and API Gateway.

Architecture
The project uses a serverless architecture on AWS:
Frontend: HTML, CSS, JavaScript
Backend: AWS Lambda functions for adding, fetching, summarizing, and deleting expenses
API Layer: AWS API Gateway (HTTP API)
Database: AWS DynamoDB for persistent storage
Deployment: AWS CloudFront for static web hosting

Workflow
User adds a new expense through the web interface.
The frontend sends a request to the corresponding AWS Lambda function via API Gateway.
Lambda function processes the request and updates DynamoDB.
Expense data is fetched, summarized, and displayed in the UI.
Charts are dynamically generated based on user-selected filters (daily, monthly, category).

Tools & Technologies Used
Frontend: HTML, CSS, JavaScript, Chart.js
Backend & Serverless: AWS Lambda, AWS API Gateway
Database: AWS DynamoDB
Hosting: AWS CloudFront
Others: AWS IAM for permissions, REST API for data access

Challenges and Solutions
CORS Issues: Resolved by configuring CORS in API Gateway to allow cross-origin requests.
Real-time updates: Implemented immediate refresh of expense list after every operation.
Dynamic categories: Users can add custom categories which are automatically included in the dropdown.
Chart visualization: Fixed chronological sorting and dynamic chart generation using Chart.js.

AWS Service Roles
Lambda Functions: Handle CRUD operations for expenses.
API Gateway: Acts as the interface between frontend and Lambda.

DynamoDB: Persistent storage for all expense data.

CloudFront: Delivers static frontend content globally with low latency.
