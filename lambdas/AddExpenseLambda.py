import json
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("ExpenseTracker")

def lambda_handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "")

    # Handle CORS preflight
    if method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            "body": ""
        }

    body = json.loads(event.get("body", "{}"))
    expense_id = str(uuid.uuid4())
    
    item = {
        "expenseId": expense_id,
        "userId": body["userId"],
        "amount": body["amount"],
        "category": body["category"],
        "date": body["date"],
        "tags": body.get("tags", [])
    }

    table.put_item(Item=item)

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"message": "Expense added successfully", "expenseId": expense_id})
    }
