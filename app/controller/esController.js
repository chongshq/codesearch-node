/**
 * Created by bennettqian on 15/04/2017.
 */

var http = require('http');
var esSOFObject = require('../Model/esSOFObject');
var db = require('../utils/mongo');

exports.searchES = function(req, res, next){
    var request = req.query;

    var keyword = request.keyword;
    console.log('searching....'+keyword);
    var options = {
        hostname: '104.199.179.100',
        port: 9200,
        path: '/data_db/sof_data_collection/_search?q=' + keyword,
        method: 'GET'
    };

    http.get('http://104.199.179.100:9200/data_db/sof_data_collection/_search?q='+keyword, function (response) {
        // if(err){
        //     console.log(err);
        //     res.end();
        // }
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        var result = '';
        response.setEncoding('utf8');
        response.on('data', function (chunk) {

            result = result + chunk;

        });
        response.on('end', function(){
            var JsonResult = JSON.parse(result);
            var list = [];
            var re = {};
            //console.log('BODY: ' + JSON.stringify(JsonResult['took']));
            var array = [];
            array = JsonResult.hits.hits;
            for (var i = 0; i<array.length; i++){
                //var url = object._source.url;
                list.push(esSOFObject.getItem(array[i]));
                //list.push(esSOFObject.getItem(object));
            }
            console.log(list);
            re['sof'] = list;
            res.json(re);
        });
    });
    //res.end();
}
exports.search = function(req, res, next){
    var request = req.query;
    var lib = request.lib;
    var keyword = request.keyword;
    console.log('searching in SoF...'+keyword);
    
    db.fetchFromSOF(lib,keyword, function(err, result){
        if(err){
            res.end();
            return;
        }
        //console.log(result);
        var list = [];
        var re = {};
        
        re['sof'] = result;
        res.json(re);
        res.end();
    })
 
}

exports.searchFromDoc = function(req, res, next){
    var request = req.query;
    var lib = request.lib;
    var keyword = request.keyword;
    console.log('searching in Doc....'+keyword);
    
    db.fetchFromAPIDOC(lib,keyword, function(err, result){
        if(err){
            res.end();
            return;
        }
        //console.log(result);
        var list = [];
        var re = {};
        
        re['doc'] = result;
        res.json(re);
        res.end();
    })
 
}

exports.getLib = function(req, res ,next){
    var request = req.query;
    var language = request.language;
    db.fetchLibList(language, function(err, result){
        if(err){
            res.end();
            return;
        }
        //console.log(result);
        var list = [];
        var re = {};
        
        re['lib'] = result;
        res.json(re);
        res.end();
    })
}