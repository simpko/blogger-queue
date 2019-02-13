const express = require('express');
const router = express.Router();

const Blog = require('./models/blog');

router.get('/blogs', (req, res) => {
	Blog.find({}).then((docs) => {
		// sort the blogs in chronological order, earliest first
		res.send(docs.sort(function(a, b) {
			if (a.month < b.month) return -1;
			else if (a.month > b.month) return 1;
			else if (a.day < b.day) return -1;
			else if (a.day > b.day) return 1;
			else return 0;
		}));
	});
});

router.post('/add', (req, res) => {
	const blog = req.body;
	Blog.create(blog).then((doc) => res.end());
})

router.post('/delete', (req, res) => {
	const blog = req.body;
	Blog.findOneAndDelete(blog).then((doc) => res.end());
})

module.exports = router;