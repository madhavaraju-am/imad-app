var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'madhavarajuam',
    database: 'madhavarajuam',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



var articles = {
    'article-one': {
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
        </p> `
},
    'article-two': {    
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
        </p>
       `
   },
    'article-three': {
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

function createTemplate(data) {
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
return htmlTemplate;
}
/*app.get('/:articleName', function (req,res) {
   //articleName = article-one
   var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});*/

var pool = new Pool(config);
app.get('/testt', function (req, res) {
    //get the data from db and return the results
  pool.query('SELECT * FROM testt', function(err,result) {
      if(err){
            res.status(500).send(err.toString());
      }
      else {
        res.send(JSON.stringify(result.rows));
      }
  });
});

app.get('/articles/:articleName', function (req, res) {
    //get the data from db and return the results
    pool.query("SELECT * FROM article where title =" + req.params.articleName, function(err,result) {
          if(err){
                res.status(500).send(err.toString());
          }else {
              if (res.rows.length === 0) {
                res.status(404).send('Record not found');
            }
          else {
            var articleData= result.rows[0];
          }
        }
    });
    res.send(createTemplate(articleData));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
