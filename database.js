/**
 * Created by Dheerain on 22-07-2017.
 */
var mongo=require('mongodb');

var url="mongodb://localhost:27017/todolist"

var obj="";


function connectServer(run_server)
{
    mongo.MongoClient.connect(url,function (err,db) {

        console.log("Hey mongo ran now run your coustom server");
        obj=db;
        run_server();
    });
}

function insertOneItem(task,callback){

    obj.collection("todolist").insertOne({task},function (err,result) {
        callback(result);
    });

}

function insertMany(task,callback){
    obj.collection('inventory').insertMany([
        { item: "journal",
            instock: [
                { warehouse: "A", qty: 5 },
                { warehouse: "C", qty: 15 }]},
        { item: "notebook",
            instock: [
                { warehouse: "C", qty: 5 }]},
        { item: "paper",
            instock: [
                { warehouse: "A", qty: 60 },
                { warehouse: "B", qty: 15 }]},
        { item: "planner",
            instock: [
                { warehouse: "A", qty: 40 },
                { warehouse: "B", qty: 5 }]},
        { item: "postcard",
            instock: [
                { warehouse: "B", qty: 15 },
                { warehouse: "C", qty: 35 }]}
    ])
        .then(function(result) {
            // process result
            callback(result);
        })
}

function selectAll(callback){
obj.collection("todolist").find({}).toArray(function (err,reasult){
 if(err) throw err;
 callback(reasult);
});}

function queryInventory(callback){
    var cursor = obj.collection('inventory').find({
        "instock": {$elementmatch :{ qty:{$gt: 10, $lte: 20 }}}
    });
    cursor.toArray(function (err,result) {

        callback(result);
    });
}


module.exports={
    connectServer,
   insertOneItem,
    selectAll,
    insertMany,
    queryInventory
}


