const fs = require('fs');

module.exports.save = (data) => {
    dataForSave = JSON.stringify(data);
    console.log(dataForSave);
    fs.appendFile("data.json", dataForSave, function (err) {
        if (err) throw err;
        console.log('File saved!');
    });
}

module.exports.get = () => {
    fromJSONtoData = JSON.parse(fs.read('data.json'));
    return (fromJSONtoData);
}

module.exports.delete = (file) => {
    fs.unlink('data.json', function (err) {
        if (err) throw err;
        console.log('File deleted!');
      })
}