const fs = require('fs');

function sum_from_file(file_name){
    if(typeof file_name != "string" || file_name == null){
        throw new Exception("Input must be a string.");
    } else if (!fs.existsSync(file_name)) {
        throw new Exception("File does not exist.");
    }

    var text_to_append = "\n";

    fs.readFileSync((file_name), (err, data) => {
        if(err) throw new Exception(err.toString());

        var lines = data.toString().split("\n");
        var sum = 0;

        lines.forEach(line => {
            console.log(line);
            if(isNaN(parseInt(line))){
                throw new Exception("Failed to parse a value into integer type");
            }
            sum += parseInt(line);
        });

        if(isNaN(sum)){
            throw new Exception("");
        }

        text_to_append += sum.toString();

        fs.appendFileSync(file_name, text_to_append, (err) => {
            if(err) throw err;
        });
    });
}

module.exports = sum_from_file;