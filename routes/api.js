'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const spellOutUnit = convertHandler.spellOutUnit(initUnit);
    const spellOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
    const sentenceString = convertHandler.getString(initNum, spellOutUnit, returnNum, spellOutReturnUnit);
    
    let response = {};
    response["initNum"] = initNum;
    response["initUnit"] = initUnit;
    response["returnNum"] = returnNum;
    response["returnUnit"] = returnUnit;
    response["string"] = sentenceString;

    if (initNum === "invalid number") response = "invalid number";
    if (initUnit === "invalid unit") response = "invalid unit";
    if (initNum === "invalid number" && initUnit === "invalid unit") response = "invalid number and unit";


    
    

    res.json(response);
  })

};
