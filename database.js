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

function editthatshit(task,callback)
{
    var cursor=obj.collection("inventory").updateMany({ $or:[{"instock.qty" :{$gte:10}} ,{item: "postcard"}]},{$set:{
item:"hell"
    }}).then(function (result) {
        callback(result);
    });

}
function queryInventory(callback){
    var cursor = obj.collection('inventory').find({});/*obj.collection('inventory').find({
        "instock.qty": 5, "instock.warehouse": "A"
    });*/
    cursor.toArray(function (err,result) {

        callback(result);
    });
}

function insertMongoPrac(callback)
{
    obj.collection('mongoPrac').insertMany([{"title":"Event Horizon","year":1997,"director":"Paul W. S. Anderson","cast":"Laurence Fishburne, Sam Neill, Kathleen Quinlan, Joely Richardson, Richard T. Jones, Jack Noseworthy, Jason Isaacs, Sean Pertwee","genre":"Science fiction","notes":"Paramount"},{"title":"The Ex","year":1997,"director":"Mark L. Lester","cast":"Yancy Butler, Suzy Amis","genre":"Suspense","notes":null},{"title":"Excess Baggage","year":1997,"director":"Marco Brambilla","cast":"Alicia Silverstone, Benicio del Toro, Christopher Walken, Harry Connick, Jr.","genre":"Comedy","notes":null},{"title":"Face/Off","year":1997,"director":"John Woo","cast":"John Travolta, Nicolas Cage, Joan Allen, Alessandro Nivola, Gina Gershon, Dominique Swain","genre":"Action","notes":"won 2 Saturn Awards"},{"title":"FairyTale: A True Story","year":1997,"director":"Charles Sturridge","cast":"Peter O'Toole, Harvey Keitel","genre":"Fantasy","notes":null},{"title":"Fakin' Da Funk","year":1997,"director":"Tim Chey","cast":"Pam Grier, Duane Martin","genre":"Comedy","notes":null},{"title":"Fast, Cheap and Out of Control","year":1997,"director":"Errol Morris","cast":"profile of 4 unusual occupations","genre":"Documentary","notes":null},{"title":"Fathers' Day","year":1997,"director":"Ivan Reitman","cast":"Robin Williams, Billy Crystal, Julia Louis-Dreyfus, Nastassja Kinski","genre":"Comedy","notes":"remake of Les Comperes"},{"title":"Favorite Son","year":1997,"director":null,"cast":null,"genre":null,"notes":null},{"title":"Fierce Creatures","year":1997,"director":"Fred Schepisi","cast":"John Cleese, Jamie Lee Curtis, Kevin Kline, Michael Palin","genre":"Comedy","notes":"with A Fish Called Wanda cast"},{"title":"The Fifth Element","year":1997,"director":"Luc Besson","cast":"Bruce Willis, Gary Oldman, Milla Jovovich, Chris Tucker, Ian Holm, Luke Perry","genre":"Science fiction","notes":"Gaumont Film Company"},{"title":"Fire Down Below","year":1997,"director":"Félix Enríquez Alcalá","cast":"Steven Seagal, Marg Helgenberger, Kris Kristofferson, Harry Dean Stanton, Stephen Lang","genre":"Action","notes":"Warner Bros.; 4 Razzie nominations"},{"title":"Firehouse","year":1997,"director":"\"Alan Smithee\"","cast":"Richard Dean Anderson, Edie Falco","genre":"Drama","notes":"Rysher Entertainment"},{"title":"Firelight","year":1997,"director":"William Nicholson","cast":"Sophie Marceau","genre":"Drama","notes":"Nicholson's only film"},{"title":"First Time Felon","year":1997,"director":"Charles S. Dutton","cast":"Omar Epps, Delroy Lindo","genre":"Crime drama","notes":null},{"title":"Flash","year":1997,"director":null,"cast":"Lucas Black, Ellen Burstyn","genre":"Family","notes":"Made for TV"},{"title":"Flubber","year":1997,"director":"Les Mayfield","cast":"Robin Williams","genre":"Comedy, Fantasy","notes":"Absent-Minded Professor remake"},{"title":"Flying Saucer Rock'n'Roll","year":1997,"director":null,"cast":null,"genre":"Short subject","notes":"12 minutes"},{"title":"Free Willy 3: The Rescue","year":1997,"director":"Sam Pillsbury","cast":"Jason James Richter","genre":"Family","notes":"2nd Free Willy sequel"},{"title":"Fools Rush In","year":1997,"director":"Andy Tennant","cast":"Matthew Perry, Salma Hayek","genre":"Rom com","notes":"Columbia"},{"title":"For Richer or Poorer","year":1997,"director":"Bryan Spicer","cast":"Tim Allen, Kirstie Alley","genre":"Comedy","notes":"Universal"},{"title":"Full Tilt Boogie","year":1997,"director":"Sarah Kelly","cast":null,"genre":"Documentary","notes":null},{"title":"Future War","year":1997,"director":"Anthony Doublin","cast":"Daniel Bernhardt","genre":"Science fiction","notes":null},{"title":"G.I. Jane","year":1997,"director":"Ridley Scott","cast":"Demi Moore, Viggo Mortensen, Anne Bancroft","genre":"Action","notes":"Razzie award for Moore"}]).then(function (result) {
        callback(result);
    })
}

function insertPrac(callback) {
    obj.collection('hasrh').find({$and:[{"address.geo.lat.sw":"3.9509"}]})
        .toArray(function (err,result) {
            callback(result);
        })
}

module.exports={
    connectServer,
   insertOneItem,
    selectAll,
    insertMany,
    queryInventory,
    editthatshit,
    insertPrac,
    insertMongoPrac
}


