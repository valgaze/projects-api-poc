/**
 * 🛑 DELETE A COGNITO USER 🛑
 *
 * ⚠️ This will remove a user permanently.
 * 📌 Edit values below OR pass arguments when running:
 *    node scripts/delete_user.ts --username="user_to_delete"
 */

require("dotenv").config();

// Function to delete a Cognito user
export async function deleteUser(username: string) {
  const https = require("https");
  const region = process.env.REGION || "us-east-1";
  const userPoolId = process.env.USER_POOL_ID || "your-user-pool-id";
  const accessKeyId = process.env.ACCESS_KEY_ID || "your-access-key";
  const secretAccessKey = process.env.SECRET_ACCESS_KEY || "your-secret-key";

  const data = JSON.stringify({
    UserPoolId: userPoolId,
    Username: username,
  });

  const options = {
    hostname: `cognito-idp.${region}.amazonaws.com`,
    path: "/",
    method: "POST",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": "AWSCognitoIdentityProviderService.AdminDeleteUser",
      "X-Amz-Date": new Date().toISOString().replace(/[:-]| {3}/g, ""),
      Authorization: `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${region}/cognito-idp/aws4_request, SignedHeaders=content-type;host;x-amz-date;x-amz-target, Signature=${secretAccessKey}`,
    },
  };

  const req = https.request(options, (res: any) => {
    let body = "";
    res.on("data", (chunk: any) => (body += chunk));
    res.on("end", () => console.log(`✅ User "${username}" deleted:`, body));
  });

  req.on("error", (err: any) => console.error("❌ Error:", err));
  req.write(data);
  req.end();
}

// Example usage (can be removed later)
// deleteUser("exampleUser");
