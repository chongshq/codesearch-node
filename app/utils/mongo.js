var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var conn = "mongodb://120.27.120.60:27017/data_db";
// var  server  = new mongodb.Server('120.27.120.60', 27017, {auto_reconnect:true});
// var  db = new mongodb.Db('data_db', server);
exports.fetchFromSOF = function(table, keyword, callback) {

    var table_name = "sof_data_collection_" + table;
    MongoClient.connect(conn, function(err, db) {
        console.log("db connected");
        if (err) {
            console.log(err);
        } else {
            // var tmp1 = {title:'hello'};
            //    var tmp2 = {title:'world'};
            //    collection.insert([tmp1,tmp2],{safe:true},function(err,result){
            //    console.log(result);
            //    }); 
            console.log("searching " + keyword + " in " + table_name);
            db.collection(table_name).find({
                    $text: { $search: keyword, $caseSensitive: true }
                }, {
                    score: { $meta: "textScore" }
                })
                .limit(5)
                .sort({ score: { $meta: "textScore" } })
                .toArray(function(err, docs) {
                    console.log('find');
                    console.log(err);
                    callback(err, docs);
                    db.close();
                });
            //    collection.findOne(function(err,doc){
            //     console.log('findOne');
            //       console.log(doc);
            //    }); 
        }

    });

}
exports.fetchFromAPIDOC = function(table, keyword, callback) {

    var table_name = "apidoc_data_collection_" + table;
    MongoClient.connect(conn, function(err, db) {
        console.log("db connected");
        if (err) {
            console.log(err);
        } else {
            // var tmp1 = {title:'hello'};
            //    var tmp2 = {title:'world'};
            //    collection.insert([tmp1,tmp2],{safe:true},function(err,result){
            //    console.log(result);
            //    }); 
            console.log("searching " + keyword + " in " + table_name);
            db.collection(table_name).find({
                    $text: { $search: keyword, $caseSensitive: true }
                }, {
                    score: { $meta: "textScore" }
                })
                .sort({ score: { $meta: "textScore" } })
                .limit(5)
                .toArray(function(err, docs) {
                    console.log('find');
                    console.log(err);
                    callback(err, docs);
                    db.close();
                });
            //    collection.findOne(function(err,doc){
            //     console.log('findOne');
            //       console.log(doc);
            //    }); 
        }

    });

}

exports.fetchLibList = function(language, callback) {

    var table_name = "lib_collection";
    MongoClient.connect(conn, function(err, db) {
        console.log("db connected");
        if (err) {
            console.log(err);
        } else {
            // var tmp1 = {title:'hello'};
            //    var tmp2 = {title:'world'};
            //    collection.insert([tmp1,tmp2],{safe:true},function(err,result){
            //    console.log(result);
            //    }); 
            console.log(language);
            db.collection(table_name).find({ "language": language })
                .toArray(function(err, docs) {
                    console.log('find');
                    var nameList = []
                    for (var i = 0; i < docs.length; i++) {
                        name = docs[i]['name']
                        nameList.push(name);
                    }
                    callback(err, nameList);
                    db.close();
                });
            //    collection.findOne(function(err,doc){
            //     console.log('findOne');
            //       console.log(doc);
            //    }); 
        }

    });

}

exports.insertData = function(data, callback) {
    var table_name = "lib_collection";
    MongoClient.connect(conn, function(err, db) {
        console.log("db connected");
        if (err) {
            console.log(err);
        } else {
            // var tmp1 = {title:'hello'};
            //    var tmp2 = {title:'world'};
            //    collection.insert([tmp1,tmp2],{safe:true},function(err,result){
            //    console.log(result);
            //    }); 
            console.log(language);
            db.collection(table_name).insert(data, function(err, result) {
                if (err) {

                } else {
                    callback(err, result)
                }
            })

        }

    });
}