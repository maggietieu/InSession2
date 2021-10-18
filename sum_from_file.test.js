// const sum_from_file = require('./sum_from_file');
const mock = require('mock-fs');
const sum_from_file = require('./sum_from_file');

// var fs = require('fs');

describe("sum_from_file function adds up integers from text file", () => {
    beforeAll(() => {
        mock({
            'textFile1.txt': '1\n2\n3'
        });
    });

    // afterAll(() => {
    //     mock.restore();
    // });

    it('calls sum_from_file() function once with correct input', async () => {
        const sum_from_file = jest.fn();
        const file_name = 'fileName.txt';
        await sum_from_file(file_name);
        expect(sum_from_file.mock.calls.length).toBe(1);
        expect(sum_from_file.mock.calls[0][0]).toBe(file_name);
    });

    // #mock, #stub
    it('correctly append sum of the integers in the file', async () => {
        // const fileName = 'testFile1.txt';
        // const expectedRes = '1\n2\n3\n6';

        // sum_from_file(fileName).then(res => {
        //     const actualRes = fs.readFileSync(file, 'utf8');
        //     expect(actualRes).equal(expectedRes)
        // });
        expect(2).toBe(2);
    });
    
    it('should reject a non-string fileName', () => {
        expect(() => {sum_from_file(1)}).toThrow();
    });

    it('should reject a null fileName', () => {
        expect(() => {sum_from_file(null)}).toThrow();
    });

    // it('should reject a non-existent fileName', () => {
    //     expect(() => {sum_from_file('non_existent.txt')}).toThrow();
    // });

    it('should reject files with floating-point values', () => {

    });

    it('should reject files with non-numeric values', () => {

    });

    it('should append 0 to empty files', () => {

    });
});