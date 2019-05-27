const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 9090;
const router = express.Router();

app.use(express.static(path.resolve('./dist/static')));

app.engine('.html', require('ejs').renderFile);

app.set('views', path.resolve('./dist'));

router.get('/*', (req, res, next) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.use('/', router);

app.listen(port);
console.log('App running on port', port);
