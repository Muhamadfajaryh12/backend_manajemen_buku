require("dotenv").config();

const mssql = require("mssql");

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  server: process.env.SERVER,
  port: Number(process.env.PORT),
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();
console.log("berhasil terhubung database");
pool.on("error", (err) => {
  console.log("Database Error :", err);
});

module.exports = {
  mssql,
  pool,
  poolConnect,
};
