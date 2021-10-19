const fs = require('fs');

function sum_from_file(file_name){
    if(typeof file_name != "string" || file_name == null){
        throw new Exception("Input must be a string.");
    } else if (!fs.existsSync(file_name)) {
        throw new Exception("File does not exist.");
    }
    
    var sum = 0;
    var data = fs.readFileSync(file_name);
    var lines = data.toString().split("\n");

    lines.forEach(line => {
        if(isNaN(parseInt(line)) || parseInt(line) != line){
            throw new Exception("Failed to parse a value into integer type");
        }
        sum += parseInt(line);
    });

    var text_to_append = "\n" + sum.toString();

    fs.appendFileSync(file_name, text_to_append, (err) => {
        if(err) throw err;
    });
}

module.exports = sum_from_file;