// const sum_from_file = require('./sum_from_file');
// const mock = require('mock-fs');

// jest.mock('fs');

// describe("sum_from_file function adds up integers from text file", () => {
//     beforeAll(() => {
//         mock({
//             'textFile1.txt': '1\n2\n3'
//         });
//     });

//     afterAll(() => {
//         mock.restore();
//     });

//     it('assertion success', () => {
//         var fileName = 'testFile1.txt';
//         sum_from_file('testFile1.txt');
//         const data = fs.promises.readFile(fileName);
//         expect(String(data)).toBe('1\n2\n3\n6');
//     });
    
//     // it('should ', () => {
//     //     expect(() => {divide('A', 5.0)}).toThrow();
//     //     expect(() => {divide(5.0, 'B')}).toThrow();
//     // });
// });