const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';
MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
    assert.equal(err, null);
    console.log("Connected correctly to the Server");
    const db = client.db(dbname),
        collection = db.collection("dishes");

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
    )
}
);
