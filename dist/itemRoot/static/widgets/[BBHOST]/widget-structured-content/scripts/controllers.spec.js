/*global describe, require, it, expect, beforeEach, spyOn */

var controllers = require('./controllers');
var mock = require('../test/mock');

describe('Widget Structured Content', function() {
    'use strict';

    beforeEach(function () {
        this.Ctrl = controllers.MainCtrl;

        this.location = mock.dummies.$location();
        this.lpContentUtils = mock.dummies.lpContentUtils();
        this.lpWidget = mock.dummies.lpWidget();
        this.lpPortal = mock.dummies.lpPortal();

        this.createController = function () {
            return new this.Ctrl(
                this.location,
                this.lpContentUtils,
                this.lpWidget,
                this.lpPortal
            );
        };
    });

    describe('MainCtrl', function () {
        it('is a Constructor', function () {
            expect(controllers.MainCtrl).toBeFunction();
        });

        it('exposes the `contentRef` preference as `initContentRef`', function () {
            spyOn(this.lpWidget, 'getPreference');
            this.lpWidget.getPreference.and.callFake(function (pref) {
                return {
                    contentRef: 'TEST_REF'
                }[pref];
            });

            var ctrl = this.createController();

            expect(ctrl.initContentRef).toEqual('TEST_REF');
        });

        it('when `linkBase` preference is set, exposes the link URL', function () {
            spyOn(this.lpWidget, 'getPreference');
            this.lpWidget.getPreference.and.callFake(function (pref) {
                return {
                    linkBase: 'article-page',
                    contentRef: 'TEST_REF'
                }[pref];
            });

            var ctrl = this.createController();

            expect(ctrl.link).toEqual('TEST_ROOT/article-page#/TEST_REF');
        });

        it('when `linkBase` preference is not set, does not expose the link URL', function () {
            spyOn(this.lpWidget, 'getPreference');
            this.lpWidget.getPreference.and.callFake(function (pref) {
                return {
                    linkBase: 'article-page',
                    contentRef: 'TEST_REF'
                }[pref];
            });

            var ctrl = this.createController();

            expect(ctrl.link).toEqual('TEST_ROOT/article-page#/TEST_REF');
        });

        describe('when there is a contentRef in the URL hash', function () {
            beforeEach(function () {
                spyOn(this.location, 'url');
                this.location.url.and.callFake(function () {
                    return '/URL_REF';
                });
            });

            it('when the `contentRef` preference is different to the URL, exposes the URL contentRef as `asycContentRef`', function () {
                spyOn(this.lpWidget, 'getPreference');
                this.lpWidget.getPreference.and.callFake(function (pref) {
                    return {
                        contentRef: 'TEST_REF'
                    }[pref];
                });

                var ctrl = this.createController();

                expect(ctrl.asyncContentRef).toEqual('URL_REF');
            });

            it('when the `contentRef` preference is the same as the URL, does not expose the URL contentRef', function () {
                spyOn(this.lpWidget, 'getPreference');
                this.lpWidget.getPreference.and.callFake(function (pref) {
                    return {
                        contentRef: 'URL_REF'
                    }[pref];
                });

                var ctrl = this.createController();

                expect(ctrl.asyncContentRef).toBeUndefined();
            });
        });

        describe('when in design mode', function () {
            beforeEach(function () {
                spyOn(this.lpContentUtils, 'isEditable');
                this.lpContentUtils.isEditable.and.callFake(function () {
                    return true;
                });
            });

            it('exposes `saveContentRef` function', function () {
                var ctrl = this.createController();

                expect(ctrl.saveContentRef).toBeFunction();
            });

            it('`saveContentRef` updates the `contentRef` preference', function () {
                spyOn(this.lpWidget, 'setPreference');

                var ctrl = this.createController();
                ctrl.saveContentRef('TEST_REF');

                expect(this.lpWidget.setPreference).toHaveBeenCalledWith('contentRef', 'TEST_REF');
            });

            it('`saveContentRef` saves preferences', function () {
                spyOn(this.lpWidget.model, 'save').and.callThrough();

                var ctrl = this.createController();
                ctrl.saveContentRef('TEST_REF');

                expect(this.lpWidget.model.save).toHaveBeenCalled();
            });

            it('`saveContentRef` refreshes the widget', function () {
                spyOn(this.lpWidget, 'refreshHTML');

                var ctrl = this.createController();
                ctrl.saveContentRef('TEST_REF');

                expect(this.lpWidget.refreshHTML).toHaveBeenCalled();
            });
        });

    });
});
