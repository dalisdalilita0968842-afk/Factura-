require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "facturasdb",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    dialect: "postgres",
    logging: false,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    enabled: process.env.JWT_ENABLED === "true",
  },
};
