function ConvertHandler() {

  this.getNum = function(input) {
    let fracRegex = /^[\d]*[.\d]*[/][.\d]*$/;

    let result = input.split(/[a-zA-Z]+/).join('');
    
    if (fracRegex.test(result)) {
      result = result.split("/");
      let numerator = result[0];
      let denominator = result[1];

      if (numerator === "") numerator = 1;
      if (denominator === "") denominator = 1;

      result = Number(numerator) / Number(denominator);
    }

    if (result === "") result = 1;
    result = Number(result);

    if (isNaN(result)) {
      return result = "invalid number";
    } else { 
      return result; 
    }
  };

  this.getUnit = function(input) {
    let result;
   const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
   const unit = input.split(/^[^a-zA-Z]+/).join('')
  
   if (validUnits.includes(unit.toLowerCase())) {
     result = unit === "l" || unit === "L" ? "L" : unit.toLowerCase();
   } else {
     result = "invalid unit";
   }
   return result;
    
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    initUnit = initUnit.toLowerCase();
    switch(initUnit) {
      case "gal": result = "L"; break;
      case "l": result = "gal"; break;
      case "mi": result = "km"; break;
      case "km": result = "mi"; break;
      case "lbs": result = "kg"; break;
      case "kg": result = "lbs"; break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    let fullUnit = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms"
    };

    return result = fullUnit[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    let op;
    initUnit = initUnit.toLowerCase();
    
    if (initUnit === "gal" || initUnit === "l") op = galToL;
    if (initUnit === "lbs" || initUnit === "kg") op = lbsToKg;
    if (initUnit === "mi" || initUnit === "km") op = miToKm;

    if (initUnit === "gal" || initUnit === "lbs" || initUnit === "mi") {
      result = Math.round(100000 * initNum * op) / 100000;
    } else {
      result = Math.round(100000 * initNum / op) / 100000;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
   let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
