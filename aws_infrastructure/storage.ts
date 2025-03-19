// Create a Virtual Private Cloud for our resources
export const vpc = new sst.aws.Vpc("MyVpc", { bastion: true, nat: "ec2" });
export const db_postgres = new sst.aws.Postgres("db_postgres", {
  vpc,
  proxy: true,
});

// Export S3 bucket for file uploads if needed
// export const bucket = new sst.Bucket("Uploads");
