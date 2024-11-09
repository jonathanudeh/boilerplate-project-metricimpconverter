const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
let validUnits = ["L", "gal", "km", "mi", "kg", "lbs"];
let responseUnit = ["gal", "L", "mi", "km", "lbs", "kg"];
let spelledUnit = ["liters", "gallons", "kilometers", "miles", "kilograms", "pounds"];
let inputs = [
    ["l", "L"],
    ["gal", "GAL"],
    ["km", "KM"],
    ["mi", "MI"],
    ["kg", "KG"],
    ["lbs", "LBS"]
];

suite('Unit Tests', function(){
    //#1
    test("whole number input", done => {
        let input = "4gal";
        assert.equal(convertHandler.getNum(input), 4);
        done();
    });

    //#2
    test("decimal number input", done => {
        let input = "6.2mi";
        assert.equal(convertHandler.getNum(input), 6.2);
        done();
    });

    //#3
    test("fractional input", done => {
        let input = "6/2lbs";
        assert.equal(convertHandler.getNum(input), 6/2);
        done();
    });

    //#4
    test("fractional input with decimal", done => {
        let input = "6.2/2L";
        assert.equal(convertHandler.getNum(input), 6.2/2);
        done();
    });

    //#5
    test("Error on double fraction", done => {
        let input = "8/2/2kg";
        assert.equal(convertHandler.getNum(input), "invalid number");
        done();
    });

    //#6
    test("default null to 1 for unit with no digit", done => {
        let input = "gal";
        assert.equal(convertHandler.getNum(input), 1);
        done();
    });

    //#7
    test("read valid unit inputs", done => {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].forEach(unit => {
                assert.equal(convertHandler.getUnit(unit), validUnits[i]);
            });
        };
        done();
    });

    //#8
    test("Error for invalid input unit", done => {
        let input = "3.ashdh";
        assert.equal(convertHandler.getUnit(input), "invalid unit");
        done();
    });

    //#9
    test("correct return unit for each valid input unit", done => {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].forEach(unit => {
                assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit(unit)), responseUnit[i]);
            });
        };
        done();
    });

    //#10
    test("correctly spell out units", done => {
        for (let i = 0; i < inputs.length; i++) {
            assert.equal(convertHandler.spellOutUnit(validUnits[i]), spelledUnit[i]);
        }
        done();
    });

    //#11
    test("convert gal to L", done => {
        let initNumber = 5;
        let initialUnit = "gal";
        assert.approximately(convertHandler.convert(initNumber, initialUnit), 18.92705, 0.00001);
        done();
    });

    //#12
    test("convert L to gal", done => {
        let initNumber = 5;
        let initialUnit = "L";
        assert.approximately(convertHandler.convert(initNumber, initialUnit), 1.32086, 0.00001);
        done();
    });

    //#13
    test("convert mi to km", done => {
        let initNumber = 5;
        let initialUnit = "mi";
        assert.approximately(convertHandler.convert(initNumber, initialUnit), 8.04670, 0.00001);
        done();
    });

    //#14
    test("convert km to mi", done => {
        let initNumber = 5;
        let initialUnit = "km";
        assert.approximately(convertHandler.convert(initNumber, initialUnit), 3.10686, 0.00001);
        done();
    });

    //#15
    test("convert lbs to kg", done => {
        let initNumber = 5;
        let initialUnit = "lbs";
        assert.approximately(convertHandler.convert(initNumber, initialUnit), 2.26796, 0.00001);
        done();
    });

    //#16
    test("convert kg to lbs", done => {
        let initNumber = 5;
        let initialUnit = "kg";
        assert.approximately(convertHandler.convert(initNumber, initialUnit), 11.02312, 0.00001);
        done();
    });
});