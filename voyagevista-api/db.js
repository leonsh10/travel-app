const mongoose = require("mongoose");
const sql = require("mssql");

// MongoDB connection
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

// Call the MongoDB connect function immediately
connectMongoDB();

// SQL Server connection string
const connectionString =
  "workstation id=voyagevista-db-sql.mssql.somee.com;packet size=4096;user id=leon2020_SQLLogin_1;pwd=5jqt2u8zlu;data source=voyagevista-db-sql.mssql.somee.com;persist security info=False;initial catalog=voyagevista-db-sql;encrypt=true;trustServerCertificate=true";

// SQL Server connection pool promise
const poolPromise = sql.connect(connectionString)
  .then(pool => {
    console.log("SQL Server Connected");
    return pool;
  })
  .catch(err => {
    console.error("SQL Server Connection Failed", err);
    process.exit(1);
  });

// Export the MongoDB connection function and SQL Server connection pool promise
module.exports = {
  connectMongoDB, // MongoDB connection function (renamed for clarity)
  poolPromise // SQL Server connection pool promise
};
