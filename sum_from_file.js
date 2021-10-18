const fs = require('fs');

function sum_from_file(file_name){
    if(typeof file_name != "string" || file_name == null){
        throw new Exception("Input must be a string.");
    }

    var text_to_append = "\n";

    fs.readFile((file_name), (err, data) => {
        if(err) throw new Exception(err.toString());

        var lines = data.toString().split("\n");
        var sum = 0;

        lines.forEach(line => {
            try{
                sum += parseInt(line);
            } catch (e) {
                // test floats, characters, new lines, nothing, etc.
                throw new Exception("Failed to parse a value into integer type");
            }
        });

        text_to_append += sum.toString();

        fs.appendFile(file_name, text_to_append, (err) => {
            if(err) throw err;
        });
    });
}

module.exports = sum_from_file;