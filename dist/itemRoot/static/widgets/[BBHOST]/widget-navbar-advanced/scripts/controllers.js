/*globals jQuery*/
/**
 * Controllers
 * @module controllers
 */
define(function (require, exports) {
    'use strict';

    var $ = require('jquery');

    // @ngInject
    exports.NavBarAdvancedController = function($scope, $timeout, lpWidget, lpPortal, lpCoreBus, lpCoreUtils, lpUsersPreference, lpUsersAuthentication) {

        var bus = lpCoreBus;
        var util = lpCoreUtils;

        var initialize = function () {

            //set up widget preferences
            //data sources
            //general nav preferences
            $scope.navSticky = lpWidget.getPreference('navSticky');
            $scope.containerType = lpWidget.getPreference('containerType');
            $scope.scrollSetting = 'lp-' + lpWidget.getPreference('scrollSetting') + '-scroll' || 'lp-normal-scroll';
            $scope.showPageTitle = util.parseBoolean(lpWidget.getPreference('showPageTitle'));

            //logo preferences
            $scope.logoUrl = util.resolvePortalPlaceholders(lpWidget.getPreference('logoURL')) || '';
            $scope.mobileLogoUrl = util.resolvePortalPlaceholders(lpWidget.getPreference('mobileLogoURL')) || '';
            $scope.launcherIcon = lpWidget.getPreference('launcherIcon') || 'arrow-left';

            //nav and launcher icon preferences
            $scope.animationHook = lpWidget.getPreference('navigationIconAnimationHook') || 'arrow';
            $scope.showNotificationsBadge = util.parseBoolean(lpWidget.getPreference('showNotificationsBadge'));

            // locales list for the switch
            $scope.locales = lpWidget.getPreference('locales');

            $scope.showMenu = true;
            //the current active page
            $scope.activePage = '';
            //the current active context
            $scope.activeContext = '';

            $scope.elementHeight = 0;

            //preset animation hooks
            $scope.animationPrepend = 'animation-';
            $scope.defaultAnimationClass = 'none';
            $scope.animationClass = $scope.animationPrepend + $scope.defaultAnimationClass;



            // Profile information
            $scope.showProfileInfo = lpCoreUtils.parseBoolean(lpWidget.getPreference('showProfileInfo'));

            if ($scope.showProfileInfo) {

                $scope.profileTitle = lpWidget.getPreference('profileTitle');
                $scope.profileTitleLink = lpWidget.getPreference('profileTitleLink');

                if (lpPortal.userId) {
                    $scope.profileInfo = {preferredName: lpPortal.userId};
                    $scope.profileInfo.profileImgBg = lpWidget.getPreference('profileImgBg') || '#CCC';

                    lpUsersPreference.get().then(function(response) {
                        var preferences = response.data;
                        util.assign($scope.profileInfo, preferences);
                        $scope.profileInfo.preferredName = preferences.preferredName || lpCoreUtils.capitalize(preferences.firstName || lpPortal.userId);
                    });
                }
                else {
                    $scope.signinLink = lpWidget.getPreference('signinLink');
                }
            }

            $scope.logout = function() {
                lpUsersAuthentication.logOut();
            };



            //button enum
            $scope.buttons = {
                logo: 'logo',
                icon: 'icon'
            };

            //scroll settings
            $scope.scrollSettingsEnum = {
                'normal': 'lp-normal-scroll',
                'transparency': 'lp-transparency-scroll',
                'hide-show': 'lp-hide-show-scroll'
            };

            bus.subscribe('launchpad-retail.activeContextChanged', function(data) {
                $timeout(function() {
                    $scope.activeContext = data.newActiveContext.length > 0 ?
                        data.newActiveContext : $scope.activePage;
                }, 25);
            });

            if($scope.navSticky) {
                //nav must be sticky1
                bus.publish('launchpad-retail.stickyNavBar');
            }

        };

        //toggle the menu open/closed by changing the $scope.animationClass variable
        $scope.toggleMenu = function () {

            $scope.showMenu = !$scope.showMenu;

            if($scope.animationHook.length > 0) {
                //apply animation
                if(!$scope.showMenu) {
                    //showing menu
                    $scope.animationClass = $scope.animationPrepend + $scope.animationHook;
                } else {
                    //hiding menu
                    $scope.animationClass = $scope.animationPrepend + $scope.defaultAnimationClass;
                }
            }
        };

        $scope.updateSize = function(data) {
            if ($scope.navSticky && ($scope.elementHeight !== data.height)) {
                $scope.elementHeight = data.height;

                // wrap with setTimeout to take a right position value
                setTimeout(function(){
                    var isStatic = ['absolute', 'fixed'].indexOf($('.navbar', lpWidget.body).css('position')) < 0;

                    bus.publish('launchpad-retail.offsetTopCorrection', {
                        isStatic: isStatic,
                        offsetTopCorrection: $scope.elementHeight
                    });
                }, 10);
            }
        };

        //toggle the launcher menu open or closed
        $scope.toggleLauncherMenu = function() {
            bus.publish('launchpad-retail.toggleLauncherMenu');
        };
        // remove when MAINT-3378 is fixed
        $(lpWidget.body).find('a[data-uuid="' + lpPortal.page.id + '"]').parents('li').addClass('active');

        initialize();
    };
});
