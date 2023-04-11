const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT url FROM maps;')
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
};

const getPinsByMapId = (mapId) => {
  return db.query(
    `SELECT *
    FROM pins
    WHERE map_id = $1;`,
    [mapId]
  )
    .then((data) => {
      return data.rows;
    })
    .catch(err => console.log(err.message));
};

const getAvgLatLng = (mapId) => {
  return db.query(
    `SELECT avg(lat), avg(lng)
    FROM pins
    GROUP BY map_id
    WHERE map_id = $1;`,
    [mapId]
  )
    .then((data) => {
      return data.rows;
    })
    .catch(err => console.log(err.message));
};


module.exports = {
  getMaps,
  getPinsByMapId,
  getAvgLatLng,
};


