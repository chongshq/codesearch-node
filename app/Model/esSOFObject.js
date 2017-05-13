/**
 * Created by bennettqian on 16/04/2017.
 */

exports.getItem = function(object){
    var item = {};
    var tempObject = object['_source'];
    item['title'] = tempObject['title'].replace("\\n", "\n").replace(/\\r/g, "\\r");
    item['url'] = tempObject['url'].replace("\\n", "\n").replace(/\\r/g, "\\r");
    item['code'] = tempObject['code'].replace("\\n", "\n").replace(/\\r/g, "\\r");
    return item;
}