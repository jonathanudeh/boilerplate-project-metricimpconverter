const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("10L get request to /api/convert", done => {
        chai
        .request(server)
        .get("/api/convert")
        .query({input: "10L"})
        .end((req, res) => {
            assert.equal(res.status,200);
            assert.equal(res.body.initNum,10);
            assert.equal(res.body.initUnit,"L");
            assert.approximately(res.body.returnNum,2.64172,0.00001);
            assert.equal(res.body.returnUnit,"gal");
            assert.equal(res.body.string,"10 liters converts to 2.64172 gallons");
            done();
        });
    });

    test("32g get request to /api/convert", done => {
        chai
            .request(server)
            .get("/api/convert")
            .query({input: "32g"})
            .end((req, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '"invalid unit"');
                done();
            });
    });

    test("3/7.2/4kg get request to /api/convert", done => {
        chai
            .request(server)
            .get("/api/convert")
            .query({input: "3/7.2/4kg"})
            .end((req, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '"invalid number"');
                done();
            });
    });

    test("3/7.2/4kilomegagram get request to /api/convert", done => {
        chai
            .request(server)
            .get("/api/convert")
            .query({input: "3/7.2/4kilomegagram"})
            .end((req, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '"invalid number and unit"');
                done();
            });
    });

    test("kg - get request to /api/convert", done => {
        chai
            .request(server)
            .get("/api/convert")
            .query({input: "kg"})
            .end((req, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, "kg");
                assert.approximately(res.body.returnNum, 2.20462, 0.00001);
                assert.equal(res.body.returnUnit, "lbs");
                assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds");
                done();
            })
    })
});
