/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : index.spec.js
 *  Description: credential-input test Spec
 *  ----------------------------------------------------------------
 */

'use strict';

// include the component
var main = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;

var directive = '<div lp-credential-input="credential"></div>';
var makeCredential = function () {
    return {
        text: {
            'id': 4,
            'inputFieldType': 'TEXT',
            'inputFieldLabel': 'User ID',
            'maxValueLength': 10,
            'options': []
        },
        password: {
            'id': 2,
            'inputFieldType':
            'PASSWORD',
            'inputFieldLabel': 'Password',
            'maxValueLength': 10,
            'options': []
        },
        radio: {
            'id': 6,
            'inputFieldType': 'RADIO',
            'inputFieldLabel': 'Favourite Color',
            'maxValueLength': null,
            'options': ['Red', 'Green.Blue']
        },
        unknown: {
            'id': 3,
            'inputFieldType': 'UNKNOWN',
            'inputFieldLabel': 'Favourite Color'
        }
    };
};

/*----------------------------------------------------------------*/
/* Module testing
/*----------------------------------------------------------------*/
describe('Credential Input Component', function () {
    var $compile, $rootScope;

    beforeEach(ngModule(main.name));

    beforeEach(ngInject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should export an object', function () {
        expect(main).toBeObject();
    });

    it('should create an text field by default', function () {
        var element,
            expectedElement;

        // Init.
        $rootScope.credential = makeCredential().unknown;
        element = $compile(directive)($rootScope);
        $rootScope.$digest();

        expectedElement = element[0].querySelectorAll('input[type="text"]');
        expect(expectedElement.length).toBe(1);
    });
});
