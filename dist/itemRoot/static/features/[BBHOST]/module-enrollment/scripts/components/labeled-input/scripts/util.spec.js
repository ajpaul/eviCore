/* global angular, inject */

/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : util.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

'use strict';

describe('labeled-input util', function() {
    var lpLabeledInputUtil;

    angular.module('lpLabeledInputUtilTest', [])
        .factory(require('./util'));

    beforeEach(function() {
        angular.mock.module('lpLabeledInputUtilTest');
    });

    beforeEach(inject(function(_lpLabeledInputUtil_) {
        lpLabeledInputUtil = _lpLabeledInputUtil_;
    }));

    it('should be an object', function() {
        expect(lpLabeledInputUtil).toBeObject();
    });

    it('Mirror field test', function() {
        var obj = [
            {
                id: '1',
                name: 'one'
            },
            {
                id: '2',
                name: 'two'
            },
            {
                id: '3',
                name: 'three',
                mirror: 'one'
            }
        ];
        lpLabeledInputUtil.updateByMirrors(obj);
        expect(obj[2].mirror).toBeObject();
        expect(obj[2].mirror.id).toBe('1');
    });

    it('Regexp escape test', function() {
        expect(lpLabeledInputUtil.escapeRegExp('.+') === '\\.\\+').toBeTrue();
    });
});
