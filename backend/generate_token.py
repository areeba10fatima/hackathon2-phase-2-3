import os
import sys
import hashlib
import hmac
import json
from datetime import datetime, timedelta
from typing import Dict, Optional
import base64

def generate_jwt_payload(user_id: str, email: str) -> str:
    """Generate a JWT payload for the user"""
    # Create payload
    payload = {
        "sub": user_id,
        "email": email,
        "exp": int((datetime.now() + timedelta(hours=24)).timestamp()),
        "iat": int(datetime.now().timestamp())
    }

    # Encode payload to base64
    payload_json = json.dumps(payload, separators=(',', ':'))
    payload_encoded = base64.b64encode(payload_json.encode()).decode().rstrip('=')

    return payload_encoded

def get_user_from_db(email: str) -> Optional[Dict]:
    """Get user info from the database"""
    import sqlite3

    # Connect to the database
    conn = sqlite3.connect('todo.db')
    cursor = conn.cursor()

    # Query for the user
    cursor.execute(
        'SELECT id, email, first_name, last_name, password_hash FROM user WHERE email = ?',
        (email,)
    )
    row = cursor.fetchone()

    conn.close()

    if row:
        return {
            'id': row[0],
            'email': row[1],
            'first_name': row[2],
            'last_name': row[3],
            'password_hash': row[4]
        }
    return None

if __name__ == "__main__":
    # Get user from database
    email = "fatimaareeba477@gmail.com"
    user = get_user_from_db(email)

    if user:
        # Generate header
        header = {"alg": "HS256", "typ": "JWT"}
        header_json = json.dumps(header, separators=(',', ':'))
        header_encoded = base64.b64encode(header_json.encode()).decode().rstrip('=')

        # Generate payload
        payload_encoded = generate_jwt_payload(user['id'], user['email'])

        # Use the secret from environment or default
        secret_key = os.getenv('JWT_SECRET_KEY', 'supersecretkeyfordevelopment')

        # Create signature
        signature_input = f"{header_encoded}.{payload_encoded}"
        signature = hmac.new(
            secret_key.encode(),
            signature_input.encode(),
            hashlib.sha256
        ).digest()
        signature_encoded = base64.b64encode(signature).decode().rstrip('=')

        # Combine to form JWT
        jwt_token = f"{header_encoded}.{payload_encoded}.{signature_encoded}"

        print("Generated JWT Token:")
        print(jwt_token)
        print()
        print("User Information:")
        print(f"ID: {user['id']}")
        print(f"Email: {user['email']}")
        print(f"Name: {user['first_name']} {user['last_name']}")
    else:
        print(f"User with email {email} not found in database.")