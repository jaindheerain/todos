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

function selectAll(callback){
obj.collection("todolist").find({}).toArray(function (err,reasult){
 if(err) throw err;
 callback(reasult);
});}



module.exports={
    connectServer,
   insertOneItem,
    selectAll
}


