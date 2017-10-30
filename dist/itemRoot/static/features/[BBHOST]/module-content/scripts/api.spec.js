'use strict';

/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : api.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var API = require('./api');
var mock = require('../test/mock');


/*----------------------------------------------------------------*/
/* Provider service
/*----------------------------------------------------------------*/

describe('lpContent API', function() {

    var lpContent;

    beforeEach(function() {
        lpContent = new API({
            $http: mock.dummies.$http,
            uuid: '123-123-123-123-123',
            contextItemName: 'retail-banking'
        });
    });

    it('should be a Constructor', function() {
        expect(API).toBeFunction();
        expect(lpContent.constructor).toBeFunction();
    });

    it('should be an object', function() {
        expect(lpContent).toBeObject();
    });

    it('should be configurable', function() {
        expect(lpContent.setConfig).toBeDefined();

        lpContent.setConfig({test: 1});
        expect(lpContent.getConfig('test')).toBe(1);
    });


    describe('#get', function() {

        it('should be defined', function() {
            expect(lpContent.get).toBeFunction();
        });

        it('should call get method of http', function() {
            spyOn(mock.dummies.$http, 'get').and.callThrough();

            lpContent.get();
            expect(mock.dummies.$http.get).toHaveBeenCalled();
        });

        it('should return rendered content', function(done) {
            lpContent.get().then(function(content) {
                expect(content).toEqual(mock.stubs.content);
                done();
            });
        });



    });

});

