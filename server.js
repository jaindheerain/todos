
var express=require('express');

var bodyParser = require('body-parser');

var database=require('./database');

var app=express();

var port=5000|| process.env.port;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/',express.static('views'));

app.get('/todos/getAll',function (req,res) {
   database.selectAll(function (data) {
       res.send(data);
   }) ;
});

app.post('/todos/insert',function (req,res) {

    database.insertOneItem(req.body.todo,function (data) {

        res.send(data);
    });

});
app.post('/todos/insertMany',function (req,res) {

    database.insertPrac(function (data) {
        res.send(data);
    })
    /*database.insertMany(req.body.todo,function (data) {

        res.send(data);
    });
*/
});

app.post('/todos/edit',function (req,res) {
        database.editthatshit(req.body.todo,function (data) {
            res.send(data);
        })
});

app.post('/todos/getAllInventory',function (req,res) {
    database.queryInventory(function (data) {
        res.send(data);
    }) ;
});
app.post('/todos/prac',function (req,res) {
    database.insertMongoPrac(function (data) {
        res.send(data);
    }) ;
});

var database=require('./database');
database.connectServer(ser);
/*here we cal a function to connect to the server
* here we then send the server app listen function as call back when the n=mongo db is connected then the
* call is called and coustom server is conectde */
function ser() {
    app.listen(port,function () {
        console.log("Hey youra node server is running");
    })
}
