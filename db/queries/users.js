const db = require('../connection');

const getUserWithEmail = (email) => {
  return db.
  query(
    `SELECT * FROM users WHERE users.email = $1`,
    [email.toLowerCase()])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const addUser = (user) => {
  return db.
  query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [user.name, user.email, user.password])
  .then(() => {
    return "Add new user successfully";
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getUserWithId = (id) => {
  return db.
  query(
    `SELECT * FROM users WHERE users.id = $1`,
    [Number(id)])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = {
  getUserWithEmail,
  addUser,
  getUserWithId
};
