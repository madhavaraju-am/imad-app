var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function (req,res) {
    res.send('Article ONE is requested and served from here');
});

var articles = {
    articleone: {
    title: 'Article ONE',
    head: 'Article ONE ONE',
    date: '25 Aug 2017',
    content: `
        <p>
        This is Para 1 of Article ONE
        </p>
        <p>
        This is Para 2 of Article ONE
        </p>
        <p>
        This is Para 3 of Article ONE
        </p>`
},
    articletwo: {    
    title: 'Article TWO',
    head: 'Article TWO TWO',
    date: '15 Sep 2017',
    content: `
        <p>
        This is Para 1 of Article TWO
        </p>
        <p>
        This is Para 2 of Article TWO
        </p>
        <p>
        This is Para 3 of Article TWO
        </p>`},
    articlethree: {
            title: 'Article THREE',
    head: 'Article THREE THREE THREE',
    date: '25 Sep 2017',
    content: `
        <p>
        This is Para 1 of Article THREE
        </p>
        <p>
        This is Para 2 of Article THREE
        </p>
        <p>
        This is Para 3 of Article THREE
        </p>`
    }
};

function htmlTemplate(data) {
var title = data.title;
var head = data.head;
var content = data.content;
var date = data.date;
var htmlTemplate= `
<html>
<head>
    <title>
        ${title}
    </title>
    <meta name="viewport" width="device-width, initial-scale=1"/>
    <link href="/ui/style.css" rel="stylesheet" />
  </head>

  <body>
     <div class="container">
        <a href="/">HOME</a>
        
        <h2>
          ${head}
        </h2>
            <div> ${date} </div>
            ${content}
      </div>
    </body>

</html>

`;
}
app.get('/ui/article-one.html', function (req,res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/ui/article-two.html', function (req,res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/ui/article-three.html', function (req,res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/article-two', function (req,res) {
    res.send('Article TWO is requested and served from here');
});

app.get('/article-three', function (req,res) {
    res.send('Article THREE is requested and served from here');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
