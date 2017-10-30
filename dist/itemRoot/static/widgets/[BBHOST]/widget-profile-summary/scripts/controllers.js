define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.profileSummaryController = function($scope, lpWidget, lpPortal, lpUsersAuthentication, lpUsersPreference, lpCoreUtils, lpCoreBus, PROFILE_SUMMARY_DEFAULTS) {
        //aliases
        var bus = lpCoreBus;
        var utils = lpCoreUtils;

        $scope.model = {
            username: 'Admin'
        };

        // Expose widget preferences
        $scope.lastLoginDateTimeShow = utils.parseBoolean(lpWidget.getResolvedPreference('lastLoginDateTimeShow'));
        $scope.lastLoginDateTimeHideAfter = lpWidget.getResolvedPreference('lastLoginDateTimeHideAfter');
        $scope.profileImgSize = parseInt(lpWidget.getPreference('profileImgSize'), 10) || PROFILE_SUMMARY_DEFAULTS.PROFILE_IMG_SIZE;
        $scope.profileImgBg = lpWidget.getPreference('profileImgBg') || PROFILE_SUMMARY_DEFAULTS.PROFILE_IMG_BG;

        //gets the link to the profile from a preference (if any)
        var profileLink = lpWidget.getResolvedPreference('profileLink');

        $scope.profileLink = profileLink || null;

        var username = lpPortal.userId || 'Anonymous';

        utils.extend($scope.model, {
            username: username
        });

        lpUsersPreference.get()
        .then(function(response) {
            var preferences = response.data;

            $scope.model.preferredName = preferences.preferredName || utils.capitalize(preferences.firstName) || utils.capitalize($scope.model.username);
            $scope.model.photo = preferences.photoData || (preferences.photoUrl ? decodeURIComponent(preferences.photoUrl) : null);
            $scope.model.lastLoginDateTime = preferences.details && preferences.details.lastLoginDateTime;
        })
        ['catch'](function() {
            $scope.model.preferredName = utils.capitalize($scope.model.username);
        });

        $scope.logout = function() {
            lpUsersAuthentication.logOut();
        };

        $scope.responsiveRules = [
            { min: 0, max: 110, size: 'xs' },
            { min: 101, size: 'small' },
            { min: 201, size: 'medium' }
        ];

        $scope.onSizeChange = function(size) {
            $scope.responsive = size;
        };

        $scope.viewProfile = function () {
            bus.publish('launchpad-retail.viewProfile', {
                originType: 'profileSummary'
            }, true);
        };
    };

});
