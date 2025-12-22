// import { drizzle } from "drizzle-orm/mysql2";
// export const db = drizzle(process.env.DATABASE_URL);

// config/db.js
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

// DEBUG LINE (do NOT remove yet)
console.log("mysql.createPool:", typeof mysql.createPool);

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Hraj18199@",
  database: "drizzle_yt_db",
});

// DEBUG LINE (do NOT remove yet)
console.log("pool:", pool);

export const db = drizzle(pool);

//.env file not needed as of now since we are hardcoding the values here.
