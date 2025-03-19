/**
 * 📋 LIST ALL USERS IN COGNITO 📋
 *
 * 🏊‍♂️ This will fetch users from your Cognito User Pool.
 * 📌 Edit values below OR pass arguments when running:
 *    node scripts/list_users.ts
 */

import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider";

require("dotenv").config();

// Function to list all Cognito users
export async function listUsers() {
  const client = new CognitoIdentityProviderClient({
    region: process.env.REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID || "your-access-key",
      secretAccessKey: process.env.SECRET_ACCESS_KEY || "your-secret-key",
    },
  });

  const command = new ListUsersCommand({
    UserPoolId: process.env.USER_POOL_ID || "your-user-pool-id",
  });

  try {
    const response = await client.send(command);
    console.log("✅ Users listed successfully:", response.Users);
  } catch (error) {
    console.error("❌ Error listing users:", error);
  }
}

listUsers();
