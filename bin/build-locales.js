var gsjson = require('./sheet');
var jsonfile = require('jsonfile');
var mkdirp = require('mkdirp');

function getLocales() {
    return gsjson.get('')
    .catch(function(err) {
        console.log(err.message);
        console.log(err.stack);
    });
}

function formatLocale(localeName, data, rows) {
    var res = {};
    res[localeName] = { translation:{}};
    return rows.reduce((result, e, index) => {
        result[localeName].translation[e] = data[index] || e;
        return result;
    }, res);
}

function toFile(file, data) {
    return new Promise((res, rej) => {
        jsonfile.writeFile(file, data, { spaces: 2 }, function(err) {
            if (err)
                rej(err)
            else
                res(data);
        });
    });
}

function reformatJsonOutput(arr) {
    return arr.reduce((res, item, index)=> {
        item.forEach((j, index) => {
            var arr = res[index] || [];
            arr.push(j);
            res[index] = arr;
        });

        return res;
    }, []);
}

getLocales()
    .then((response)=> {
        var column = reformatJsonOutput(response);

        // remove label
        column[0].splice(0, 1);
        return column.map((e, index)=> {
            if (index !== 0){
                var label = e[0];
                // remove label
                e.splice(0, 1);
                return formatLocale(label, e, column[0]);
            }
            else
                return null;
        })
    })
    .then(arr => {
        arr.forEach(e=> {
            if (e) {
                var key = Object.keys(e)[0];
                var dir = './src/locales/' + key;

                mkdirp(dir, function(){
                    toFile(dir + '/translation.json', e[key].translation);
                });
            }
        });
    });
