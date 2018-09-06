const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require("./operations");
const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';
MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
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




    
     /*    collection = db.collection("dishes");

    collection.insertOne({ "name": "Upma", "description": "made of wheat grail" },
        (err, result) => {
            assert.equal(err, null);
            console.log("After Insert:\n");
            console.log(result.ops);
            collection.find({}).toArray((err, docs) => {
                assert.equal(err,null);
                
                console.log("Found:\n");
                console.log(docs);
    
                db.dropCollection("dishes", (err, result) => {
                    assert.equal(err,null);
    
                    client.close();
                });
            });



        }
    ) */
}
);
