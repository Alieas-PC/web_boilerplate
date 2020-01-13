module.exports = {
  host: process.env.WEBSITE_DB_HOST,
  port: 3306,
  database: process.env.WEBSITE_DB_NAME,
  username: process.env.WEBSITE_DB_USERNAME,
  password: process.env.WEBSITE_DB_PASSWORD,
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
