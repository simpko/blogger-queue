const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Blogger = require('./models/blogger');

passport.use(
	new LocalStrategy((username, password, done) => {
		Blogger.findOne({ username: username }, (err, user) => {
			if (err) return done(err);
			if (!user) return done(null, false);
			if (!user.verifyPassword(password)) return done(null, false);
			return done(null, user);
		});
	})
);

passport.serializeUser((user, done) => {
 	done(null, user._id);
});

passport.deserializeUser((_id, done) => {
	Blogger.findById(_id, (err, user) => {
		done(err, user);
	});
});

module.exports = passport;