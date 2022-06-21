const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();
const events = require("./user");

// establish db connection
async function main() {
  const connection = await mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    port: process.env.SQL_PORT,
  });
  connection.config.namedPlaceholders = true;

  // port 3000
  const ports = process.env.PORT || 3000;

  // connects to user.js
  const app = express().use(cors()).use(express.json()).use(events(connection));

  // run with npm run devStart
  app.listen(ports, () => console.log(`listening on port ${ports}`));
}

main();
