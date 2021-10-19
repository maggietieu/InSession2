// const sum_from_file = require('./sum_from_file');
const mock = require('mock-fs');
const sum_from_file = require('./sum_from_file');

var fs = require('fs');

// beforeAll(async () => {
//      mock({
//         'textFile1.txt': '1\n2\n3',
//         'textFile2.txt': '1.5',
//         'textFile3.txt': 'a',
//         'textFile4.txt': '',
//     });
// });

// afterAll(() => {
//     mock.restore();
// });

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
        const fileName = 'textFile1.txt';
        const expectedRes = '1\n2\n3\n6';
        await sum_from_file(fileName);
        fs.readFileSync((fileName), (err, data) => {
            expect(data).toBe(expectedRes);
        });
    });
    
    // #stub
    it('should reject a non-string fileName', async () => {
        expect(() => {sum_from_file(1)}).toThrow();
    });

    // #stub
    it('should reject a null fileName', async () => {
        expect(() => {sum_from_file(null)}).toThrow();
    });

    // #dummy
    it('should reject a non-existent fileName', async () => {
        expect(() => {sum_from_file('non_existent.txt')}).toThrow();
    });

    // #stub
    it('should reject files with floating-point values', async () => {
        const fileName = 'textFile2.txt';
        expect(() => {sum_from_file(fileName)}).toThrow();
    });

    // #stub
    it('should reject files with non-numeric values', async () => {
        const fileName = 'textFile3.txt';
        expect(() => {sum_from_file(fileName)}).toThrow();
    });

    // #stub
    it('should append 0 to empty files', async () => {
        const fileName = 'textFile4.txt';
        const expectedRes = '0';
        await sum_from_file(fileName);
        fs.readFileSync((fileName), (err, data) => {
            expect(data).toBe(expectedRes);
        });
    });
});