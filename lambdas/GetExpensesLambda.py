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
                "Access-Control-Allow-Methods": "GET,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            "body": ""
        }

    user_id = event.get("queryStringParameters", {}).get("userId", "user123")

    resp = table.scan(
        FilterExpression="userId = :uid",
        ExpressionAttributeValues={":uid": user_id}
    )

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps(resp["Items"])
    }
