const expect = require('chai').expect;
const fs = require('fs').promises;
const nock = require('nock');
const sinon = require('sinon');

const path = require('path');
const Mocha = require('mocha');

// @see This link to explanation of root suite
// https://blog.logrocket.com/a-quick-and-complete-guide-to-mocha-testing-d0e0ea09f09d/

const testDir = process.env.TEST_DIR;

Mocha.run(failures => {
    process.exitCode = failures ? 1 : 0;
});

window.checkFn = () => {};

const { equal } = require('assert');
const index = require('../lib');

// From mocha
describe('Programmatic usage suite', () => {
    describe('#index', () => {
        it('should return expected string', () => {
            equal(index(), 'programmatic example');
        });
    });
});

describe('long action', function() {
    this.timeout(5000);

    beforeAll('some long setup', function(done) {
        // set a hook-level timeout
        this.timeout(2500);

        setTimeout(done, 2250);
    })

    it('should take less than 200ms', function(done) {
        // set a test-level timeout
        this.timeout(200);

        setTimeout(done, 150);
    })

})

describe('Test window behaviour', () => {
    describe('window special check fn', () => {
        const {checkFn} = window;
        expect(checkFn).is.a('function');
    });

    describe('Simple sum', () => {
        [
            {input: 0, output: 0},
            {input: 2, output: 4},
            {input: 32, output: 64}
        ].forEach(({input, output}) => {
            it(`description with input and output`, () => {
                expect((input) => input * 2).equals(output);
            })
        });

        // [99.99, 'abc', -100].forEach(input => {
        //     it(`formatCurrency(${input}) should throw 'Invalid number: ${input}'`, () => {
        //         expect(() => input).to.throw(`Invalid number: ${input}`); //need to use arrow fn to work
        //     })
        // });
    });
});