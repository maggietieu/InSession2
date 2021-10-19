const sum_from_file = require('./sum_from_file');
const fs = require('fs');

describe("sum_from_file function adds up integers from text file", () => {
    // #mock #spy #stub
    it('calls sum_from_file() function once with correct input', async () => {
        const sum_from_file = jest.fn();
        const file_name = 'fileName.txt';
        await sum_from_file(file_name);
        expect(sum_from_file.mock.calls.length).toBe(1);
        expect(sum_from_file.mock.calls[0][0]).toBe(file_name);
    });

    // #mock #stub
    it('correctly append sum of the integers in the file', async () => {
        const fileName = './stubbed_txt_files/textFile1.txt';
        const expectedRes = '1\n2\n3\n6';
        await sum_from_file(fileName);
        fs.readFileSync((fileName), (err, data) => {
            expect(data).toBe(expectedRes);
        });
    });
    
    // #stub
    it('should reject a non-string fileName', async () => {
        const fileName = 1;
        expect(() => {sum_from_file(fileName)}).toThrow();
    });

    // #stub
    it('should reject a null fileName', async () => {
        const fileName = null;
        expect(() => {sum_from_file(fileName)}).toThrow();
    });

    // #stub #dummy
    it('should reject a non-existent fileName', async () => {
        const fileName = 'non_existent.txt';
        expect(() => {sum_from_file(fileName)}).toThrow();
    });

    // #stub
    it('should reject files with floating-point values', async () => {
        const fileName = './stubbed_txt_files/textFile2.txt';
        expect(() => {sum_from_file(fileName)}).toThrow();
    });

    // #stub
    it('should reject files with non-numeric values', async () => {
        const fileName = './stubbed_txt_files/textFile3.txt';
        expect(() => {sum_from_file(fileName)}).toThrow();
    });
});