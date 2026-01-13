// import { drizzle } from "drizzle-orm/mysql2";
// export const db = drizzle(process.env.DATABASE_URL);


import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Hraj18199@",
  database: "node_auth_mysql",
});

export const db = drizzle(pool);

// //.env file not needed as of now since we are hardcoding the values here.

