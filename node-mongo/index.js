const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require("./operations");
const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {
    console.log("Connected correctly to the Server");
    const db = client.db(dbname);
    dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes")
        .then((result) => {
            console.log("Insert Document\n", result.ops);
            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);
            return dboper.updateDocument(db, { name: "Vadonut" }, { description: "Update test" }, "dishes");
        })
        .then((result) => {
            console.log("Update documents\n", result.result);
            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found updated documents\n", docs);
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped collection", result)
            client.close();
        })
        .catch((err) => console.log(err));



})
    .catch((err) => console.log(err));



/* MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
    assert.equal(err, null);
    console.log("Connected correctly to the Server");
    const db = client.db(dbname);
    dboper.insertDocument(db, {name:"Vadonut", description:"Test"}, "dishes", (result)=>{
        console.log("Insert Document\n", result.ops);
        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);
            dboper.updateDocument(db,{name:"Vadonut"}, {description:"Update test"}, "dishes", (result)=>{
                console.log("Update documents\n", result.result);
                dboper.findDocuments(db, "dishes", (docs)=>{
                    console.log("Found updated documents\n", docs);
                    db.dropCollection("dishes", (result)=>{
                        console.log("Dropped collection", result)
                        client.close();
                    })
                })

            })


        })
    } )
}
); */
