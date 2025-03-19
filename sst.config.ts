/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "projectsapi-poc",
      home: "aws",
      removal: input?.stage === "production" ? "retain" : "remove",
    };
  },
  async run() {
    // Dynamic imports with sst cli magic: https://github.com/sst/sst/issues/5102#issuecomment-2508709187
    const { api } = await import("./aws_infrastructure/api");
    const { db_postgres, vpc } = await import("./aws_infrastructure/storage");

    new sst.x.DevCommand("Studio", {
      link: [db_postgres],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });
    return {
      api: api.url,
      host: db_postgres.host,
      port: db_postgres.port,
      db_username: db_postgres.username,
      // db_password: db_postgres.password,
      db_database: db_postgres.database,
    };
  },
});
