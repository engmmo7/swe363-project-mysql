const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = require('./database');

const app = express();

// configure the app to use ejs templates
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// configure the app to parse url-encoded forms and use method override
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// handle GET requests to the index page
app.get('/', function(req, res, next) {
    Promise.all([
      db.getAllAcademics(),
      db.getAllMatches(),
      db.getAllTournaments(),
      db.getAllStadiums()
    ])
    .then(function([academics, matches, tournaments, stadiums ]) {
      res.render('index', { academics: academics, matches: matches, tournaments: tournaments, stadiums: stadiums});
    })
    .catch(function(error) {
      next(error);
    });
  });

  app.get('/login-user', (req, res,) => {
    res.render('login-user');
  });

  app.get('/payment', (req, res,) => {
    res.render('payment');
  });

  app.get('/login-admin', (req, res,) => {
    res.render('login-admin');
  });

  app.get('/add-stadiums', (req, res,) => {
    res.render('add-stadiums');
  });

// handle GET requests to the tournaments page

  app.get('/tournaments', function(req, res, next) {
    db.getAllTournaments()
      .then(function(tournaments) {
        res.render('tournaments', { tournaments: tournaments });
      })
      .catch(function(error) {
        next(error);
      });
  });

// handle GET requests to the academics page
app.get('/academics', function(req, res, next) {
    db.getAllAcademics()
      .then(function(academics) {
        res.render('academics', { academics: academics });
      })
      .catch(function(error) {
        next(error);
      });
  });

// handle GET requests to the matches page
app.get('/matches', function(req, res, next) {
    db.getAllMatches()
      .then(function(matches) {
        res.render('matches', { matches: matches });
      })
      .catch(function(error) {
        next(error);
      });
  });

// handle GET requests to the stadiums page
  app.get('/stadiums', function(req, res, next) {
    db.getAllStadiums()
      .then(function(stadiums) {
        res.render('stadiums', { stadiums: stadiums });
      })
      .catch(function(error) {
        next(error);
      });
  });

// handle GET requests to the matches/:id page
app.get('/matches/:id', function(req, res, next) {
    const id = req.params.id;
    db.getMatchById(id)
      .then(function(match) {
        res.render('match_details', { match: match });
      })
      .catch(function(error) {
        next(error);
      });
  });

// handle POST requests to the matches page
app.post('/matches', function(req, res, next) {
    const match = {
      match_date: req.body.match_date,
      match_time: req.body.match_time,
      tournament_name: req.body.tournament_name,
      tournament_id: req.body.tournament_id,
      team1_name: req.body.team1_id,
      team2_name: req.body.team2_id,
      score: req.body.score
    };
    db.addMatch(match)
      .then(function(insertId) {
        res.redirect('/matches/' + insertId);
      })
      .catch(function(error) {
        next(error);
      });
  });

// handle PUT requests to the matches/:id page
app.put('/matches/:id', function(req, res, next) {
    const id = req.params.id;
    const match = {
      match_date: req.body.match_date,
      match_time: req.body.match_time,
      tournament_name: req.body.tournament_name,
      tournament_id: req.body.tournament_id,
      team1_name: req.body.team1_id,
      team2_name: req.body.team2_id,
      score: req.body.score
    };
    db.updateMatch(id, match)
      .then(function(affectedRows) {
        res.redirect('/matches/' + id);
      })
      .catch(function(error) {
        next(error);
      });
  });

// handle DELETE requests to the matches/:id page
app.delete('/matches/:id', function(req, res, next) {
    const id = req.params.id;
    db.deleteMatch(id)
      .then(function(affectedRows) {
        res.redirect('/matches');
      })
      .catch(function(error) {
        next(error);
      });
  });

// start the server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});