const mongoose = require("mongoose");
const sql = require("mssql");

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
}

connectMongoDB();

const connectionString =
  "workstation id=voyagevista-db-sql.mssql.somee.com;packet size=4096;user id=leon2020_SQLLogin_1;pwd=5jqt2u8zlu;data source=voyagevista-db-sql.mssql.somee.com;persist security info=False;initial catalog=voyagevista-db-sql;encrypt=true;trustServerCertificate=true";

const poolPromise = sql.connect(connectionString)
  .then(pool => {
    console.log("SQL Server Connected");
    return pool;
  })
  .catch(err => {
    console.error("SQL Server Connection Failed", err);
    process.exit(1);
  });

module.exports = {
  connectMongoDB, 
  poolPromise 
};
