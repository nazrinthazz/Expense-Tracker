import json
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("ExpenseTracker")

def lambda_handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "")

    if method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            "body": ""
        }

    expense_id = event.get("pathParameters", {}).get("expenseId")
    if not expense_id:
        return {"statusCode": 400, "body": "Missing expenseId"}

    table.delete_item(Key={"expenseId": expense_id})

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"message": "Expense deleted successfully"})
    }
