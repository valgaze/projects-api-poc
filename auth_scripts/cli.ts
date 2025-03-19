import inquirer from "inquirer";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createUser } from "./create_user";
import { deleteUser } from "./delete_user";
import { listUsers } from "./list_users";

require("dotenv").config();

const argv = yargs(hideBin(process.argv))
  .command(
    "user:create",
    "Create a new user",
    {
      username: {
        description: "The username for the new user",
        alias: "u",
        type: "string",
      },
      password: {
        description: "The password for the new user",
        alias: "p",
        type: "string",
      },
    },
    async (argv) => {
      const username =
        argv.username ||
        (await inquirer
          .prompt({
            type: "input",
            name: "username",
            message: "Enter the username:",
          })
          .then((answers) => answers.username));

      const password =
        argv.password ||
        (await inquirer
          .prompt({
            type: "password",
            name: "password",
            message: "Enter the password:",
          })
          .then((answers) => answers.password));

      await createUser(username, password);
    }
  )
  .command(
    "api:call_as",
    "Call an API as a user",
    {
      api_url: {
        description: "The API URL to call",
        type: "string",
        demandOption: true,
      },
      username: {
        description: "The username for authentication",
        alias: "u",
        type: "string",
      },
      password: {
        description: "The password for authentication",
        alias: "p",
        type: "string",
      },
    },
    async (argv) => {
      const apiUrl = argv.api_url;
      const username =
        argv.username ||
        (await inquirer
          .prompt({
            type: "input",
            name: "username",
            message: "Enter the username:",
          })
          .then((answers) => answers.username));

      const password =
        argv.password ||
        (await inquirer
          .prompt({
            type: "password",
            name: "password",
            message: "Enter the password:",
          })
          .then((answers) => answers.password));

      // Call the API with the provided credentials
      console.log(`Calling API at ${argv.api_url} as ${username}`);
      // Implement the API call logic here
    }
  )
  .command(
    "user:delete",
    "Delete a user",
    {
      username: {
        description: "The username of the user to delete",
        alias: "u",
        type: "string",
      },
    },
    async (argv) => {
      const username =
        argv.username ||
        (await inquirer
          .prompt({
            type: "input",
            name: "username",
            message: "Enter the username to delete:",
          })
          .then((answers) => answers.username));

      await deleteUser(username);
    }
  )
  .command("user:list", "List all users", {}, async () => {
    await listUsers();
  })
  .help().argv;

// Additional functions for delete_user, list_users, etc. can be added here and imported into this script.
