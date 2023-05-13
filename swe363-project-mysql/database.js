const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'dammam_sport_center_app',
  user: 'root',
  password: ''
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log('MySQL Database is connected Successfully');
  }
});

// Get all tournaments
function getAllTournaments() {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM Tournaments JOIN Stadiums ON Tournaments.stadium_id = Stadiums.id JOIN Images ON Tournaments.image_id = Images.id', function(error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Delete a tournament by ID
  function deleteTournament(id) {
    return new Promise(function(resolve, reject) {
        connection.query('DELETE FROM Tournaments WHERE id = ?', [id], function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
  
  // Update a tournament by ID
  function updateTournament(id, data) {
    return new Promise(function(resolve, reject) {
        connection.query('UPDATE Tournaments SET ? WHERE id = ?', [data, id], function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
  
  // Create a new tournament
  function createTournament(data) {
    return new Promise(function(resolve, reject) {
        connection.query('INSERT INTO Tournaments SET ?', data, function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }


  
  function getAllMatches() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT *
      FROM Matches
      JOIN Tournaments ON Matches.tournament_id = Tournaments.id
      JOIN Images ON Matches.image_id = Images.id
      `;
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  function getMatchById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Matches WHERE id = ?`;
      connection.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  
  function addMatch(match) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Matches (match_date, match_time, tournament_id, team1_id, team2_id, score) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [match.match_date, match.match_time, match.tournament_name, match.tournament_id, match.team1_id, match.team2_id, match.score];
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }
  
  function updateMatch(id, match) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE Matches SET match_date = ?, match_time = ?, tournament_id = ?, team1_id = ?, team2_id = ?, score = ? WHERE id = ?`;
      const values = [match.match_date, match.match_time, match.tournament_name, match.tournament_id, match.team1_id, match.team2_id, match.score, id];
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
      });
    });
  }
  
  function deleteMatch(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Matches WHERE id = ?`;
      connection.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
      });
    });
  }
  

function addAcademy(academy) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Academies (type, price, imageUrl) VALUES (?, ?, ?)`;
    const values = [academy.type, academy.price, academy.imageUrl];
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
}

function getAllAcademics() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Academics JOIN Images ON Academics.image_id = Images.id`;
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function deleteAcademy(id) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM Academics WHERE id = ?`;
    connection.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
  });
}

function updateAcademy(id, academy) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Academics SET type = ?, price = ?, imageUrl = ? WHERE id = ?`;
    const values = [academy.type, academy.price, academy.imageUrl, id];
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
  });
}

function getAcademyByName(name) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Academics WHERE type = ?`;
    connection.query(query, [name], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

// Get all stadiums
function getAllStadiums() {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM Stadiums JOIN Images ON Stadiums.image_id = Images.id', function(error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  
  // Delete a stadium by ID
  function deleteStadium(id) {
    return new Promise(function(resolve, reject) {
        connection.query('DELETE FROM Stadiums WHERE id = ?', [id], function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
  
  // Update a stadium by ID
  function updateStadium(id, data) {
    return new Promise(function(resolve, reject) {
        connection.query('UPDATE Stadiums SET ? WHERE id = ?', [data, id], function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
  
  // Create a new stadium
  function createStadium(data) {
    return new Promise(function(resolve, reject) {
        connection.query('INSERT INTO Stadiums SET ?', data, function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }
module.exports = {
  getAllTournaments, 
  deleteTournament,
  updateTournament,
  createTournament,
  getAllMatches,
  getMatchById, 
  addMatch,
  updateMatch,
  deleteMatch,
  addAcademy,
  getAllAcademics,
  deleteAcademy,
  updateAcademy,
  getAcademyByName,
  getAllStadiums,
  deleteStadium,
  updateStadium,
  createStadium
};
