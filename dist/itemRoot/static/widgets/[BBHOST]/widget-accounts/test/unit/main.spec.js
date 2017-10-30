/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var main = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;
var angular = window.angular;

var Widget = require('./widget.mock');
var ModelMock = require('./model.mock');

/*----------------------------------------------------------------*/
/* Widget unit tests
/*----------------------------------------------------------------*/
describe('Widget accounts ', function() {

    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
    /*----------------------------------------------------------------*/
    beforeEach(ngModule(main.name, function($provide) {
        $provide.value('lpWidget',  new Widget());
    }));

    /*----------------------------------------------------------------*/
    /* Main Module
    /*----------------------------------------------------------------*/
    describe('Module', function() {
        it('should be an object', function() {
            expect(main).toBeObject();
        });
    });

    /*----------------------------------------------------------------*/
    /* Tests for Controllers
    /*----------------------------------------------------------------*/
    describe('Controllers', function() {

        var createController,
            scope,
            rootElement,
            assetsModel;

        beforeEach(function() {
            /*----------------------------------------------------------------*/
            /* Mock dependencies
            /*----------------------------------------------------------------*/
            ngModule(function($provide) {
                $provide.value('AssetsModel', new ModelMock());
            });
        });

        beforeEach(inject(function($controller, $rootScope, _AssetsModel_) {
            scope = $rootScope.$new();
            rootElement = angular.element('<div></div>');
            assetsModel = _AssetsModel_;

            createController = function(ctrlName) {
                return $controller(ctrlName, {
                    $scope: scope,
                    $rootElement: rootElement
                });
            };
        }));

        // MainCtrl
        xdescribe('MainCtrl', function() {
            var ctrl;
            beforeEach(function(){
                ctrl = createController('MainCtrl');
            });

            it('should exists', function() {
                expect(ctrl).toBeObject();
            });

        });

    });

});

