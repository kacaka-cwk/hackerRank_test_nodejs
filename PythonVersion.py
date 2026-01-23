import requests

def analyze_transactions(user_id):
    try:
        res = requests.get(f"https://api.example.com/transactions?userId={user_id}")
        transactions = res.json()

        high_value = [t for t in transactions if t["amount"] > 100]
        total_amount = sum(t["amount"] for t in transactions)

        return {
            "count": len(transactions),
            "totalAmount": total_amount,
            "highValueTransactions": high_value
        }

    except Exception as e:
        print("API error:", e)
        return None



