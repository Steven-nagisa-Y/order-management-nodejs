module.exports = {
  database: {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
  },
  manager: {
    [`${process.env.ADMIN}`]: {
      passwd: process.env.ADMIN_PASSWD, //456123
    },
  },
};
