const express = require('express');
const app = express();
require('dotenv').config();
const bp = require('body-parser');
const db = require('./db');
const api = require('./api');
const passport = require('./passport');
const session = require('express-session');
const nunjucks = require('nunjucks');

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.use('/static', express.static('public'));

app.use(session({
  secret: 'session-secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);

app.get('/', (req, res) => {
	if (req.isAuthenticated()) res.render('queue.html');
	else res.redirect('/login');
});

app.get('/login', (req, res) => {
	if (req.isAuthenticated()) res.redirect('/');
	else res.render('login.html');
});

app.post('/auth/login',
	passport.authenticate('local'), (req, res, next) => {
		if (req.user) res.send({ redirect: "/" });
		else res.send({ redirect: "/login" });
	}
);

app.get('/logout', (req, res) => {
	req.session.destroy();
	req.logout();
	res.redirect('/login');
});

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.get('/', (req, res) => {
	res.render('queue.html');
});

app.listen(3000, () => {console.log('queue live on port 3000')});