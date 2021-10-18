function sum_from_file(){
    const fs = require('fs');
    const file_name = 'nums.txt';

    fs.readFile(file_name, (err, data) => {
        if(err) throw err;

        var lines = data.toString().split("\n");
        var sum = 0;

        lines.forEach(line => {
            try{
                sum += parseInt(line);
            }
            catch(e){
                // test floats, characters, new lines, nothing, etc.
                throw e("Failed to parse a value into integer type");
            }
        });

        const text_to_append = "\n" + sum.toString();

        fs.appendFile(file_name, text_to_append, (err) => {
            if(err) throw err;
            console.log("Sum appended to text file!");
        });
    });
}

sum_from_file();

module.exports = sum_from_file;