const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

app.use('/static', express.static('public'));

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.get('/', (req, res) => {
	res.render('index.html');
});

app.listen(3000, () => {console.log('app listening on port 3000')});