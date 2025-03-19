/**
 * 🛠️ CREATE A NEW COGNITO USER 🛠️
 *
 * 📌 Edit values below OR pass arguments when running:
 *    node scripts/create_user.ts --username="new_user" --password="SecurePass!"
 */

require("dotenv").config();

// Function to create a new Cognito user
export async function createUser(username: string, password: string) {
  const https = require("https");
  const region = process.env.REGION || "us-east-1";
  const appClientId = process.env.APP_CLIENT_ID || "your-app-client-id";
  const accessKeyId = process.env.ACCESS_KEY_ID || "your-access-key";
  const secretAccessKey = process.env.SECRET_ACCESS_KEY || "your-secret-key";

  const data = JSON.stringify({
    ClientId: appClientId,
    Username: username,
    Password: password,
  });

  const options = {
    hostname: `cognito-idp.${region}.amazonaws.com`,
    path: "/",
    method: "POST",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp",
      "X-Amz-Date": new Date().toISOString().replace(/[:-]|\.\d{3}/g, ""),
      Authorization: `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${region}/cognito-idp/aws4_request, SignedHeaders=content-type;host;x-amz-date;x-amz-target, Signature=${secretAccessKey}`,
    },
  };

  const req = https.request(options, (res: any) => {
    let body = "";
    res.on("data", (chunk: any) => (body += chunk));
    res.on("end", () => console.log(`✅ User "${username}" created:`, body));
  });

  req.on("error", (err: any) => console.error("❌ Error:", err));
  req.write(data);
  req.end();
}
