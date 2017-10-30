define(function(require, exports, module) {
    'use strict';

    module.exports = [
    '<div class="export-transactions-modal">',
        '<div class="panel-body">',
            '<div class="modal-header" lp-i18n="Export Results"></div>',
            '<div class="modal-body">',
                '<p lp-i18n="Select your chosen format bellow to export all transaction results currently displayed."></p>',
                '<form>',
                    '<ul>',
                        '<li>',
                            '<lp-custom-radio ng-model="exportOption" value="csv">',
                                '<span lp-i18n="CSV - integrates with Excel, Numbers, etc."></span>',
                            '</lp-custom-radio>',
                        '<li>',
                            '<lp-custom-radio ng-model="exportOption" value="ofx">',
                                '<span lp-i18n="OFX - integrates with Quicken."></span>',
                            '</lp-custom-radio>',
                        '</li>',
                    '</ul>',
                '</form>',
            '</div>',
            '<div class="modal-footer">',
                '<button type="button" ng-click="cancel()" class="btn btn-link" lp-i18n="Cancel"></button>',
                '<button type="button" ng-click="download(exportOption)" ng-disabled="!exportOption" class="btn btn-primary" lp-i18n="Export Format"></button>',
                '<p class="small">',
                    '<i class="lp-icon lp-icon-info-sign"></i><span lp-i18n="For best results narrow your search criteria to keep from downloading unnecesary transactions."></span>',
                '</p>',
            '</div>',
        '</div>',
    '</div>'
    ].join('');
});
