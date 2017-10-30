 /* globals define */

/**
 * Controllers
 * @module controllers
 */
define(function(require, exports) {

    'use strict';

    var _ = require('base').utils;
    var wizard = {};

    /**
     * MainCtrl description.
     */

    // @ngInject
    exports.MainCtrl = function(bpService, bpModel) {
        this.wizard = wizard;
        this.bpService = bpService;
        this.bpModel = bpModel;
    };

    /**
     * FindPayeeCtrl description.
     */

    // @ngInject
    exports.FindPayeeCtrl = function($scope, lpWidget, lpCoreUtils, bpService, bpModel) {
        var ctrl = this;

        ctrl.searchValue = '';

        ctrl.pay = function () {
            wizard.goToStep(4);
        };

        ctrl.loadVendors = function() {
            bpService.getTopVendors()
                .then(function(vendors) {
                    ctrl.topVendors = vendors;
                    ctrl.listGroup = vendors;
                });
        };

        ctrl.selectBiller = function(option) {
            bpModel.currentBiller = _.clone(option);
            bpModel.currentBiller.paymentMethod = bpModel.paymentMethods.ELECTRONIC;
            bpModel.currentBiller.address = {};
            bpModel.currentBiller.addresses = [];

            wizard.nextStep();
        };

        ctrl.createBiller = function(name) {
            bpModel.currentBiller = {
                paymentMethod: bpModel.paymentMethods.CHECK,
                name: name,
                address: {}
            };
            wizard.nextStep();
        };

        function search() {
            if (ctrl.searchValue) {
                bpService.searchVendors({
                    name: ctrl.searchValue
                }).then(function(billers) {
                    ctrl.listGroup = billers;
                });
            } else {
                // If there is no search value -- load top vendors instead
                ctrl.loadVendors();
            }
        }

        var lazySearch = lpCoreUtils.debounce(search, 500);

        ctrl.search = function() {
            ctrl.searching = Boolean(ctrl.searchValue);
            lazySearch();
        };

        ctrl.clearSearch = function() {
            bpService.cancelSearch();
            ctrl.searchValue = '';
            ctrl.listGroup = ctrl.topVendors;
            ctrl.searching = false;
        };

        // init calls
        ctrl.loadVendors();
    };

    // @ngInject
    exports.ConnectPayeeCtrl = function(lpCoreUtils, bpService, bpModel, lpCoreBus) {
        var ctrl = this;

        ctrl.back = function(element) {
            element.ConnectForm.$setPristine();
            element.ConnectForm.submitted = false;

            bpModel.currentBiller = null;
            bpService.errors = null;

            wizard.goToStep(1);
        };

        ctrl.connect = function() {
            bpService.addPayee(bpModel.currentBiller).then(function(biller) {
                if (bpService.errors === null) {
                    bpModel.currentBiller = biller;
                    bpModel.currentBiller.connected = true;
                    lpCoreBus.publish('lp-retail:eBill:Payees:load');

                    if (bpModel.currentBiller.eBillsStatus === 'ELIGIBLE') {
                        bpService.setupEBills(bpModel.currentBiller)
                            .then(function() {
                                bpModel.currentBiller.setupEBills = true;
                                wizard.nextStep();
                            });
                    } else {
                        wizard.nextStep();
                    }
                }
                if (biller) {
                  bpModel.currentBiller.addresses = biller.addresses;
                }
            });
        };

        ctrl.setAccountConfirmationStatus = function(status) {
            ctrl.isAccountConfirmed = status;
        };

    };

    // @ngInject
    exports.SetupEBillsCtrl = function(bpService, bpModel) {
        var ctrl = this;
        ctrl.errors = [];

        ctrl.logErrors = function(errs) {
            ctrl.errors = errs;
        };

        ctrl.exitEBillSetup = function() {
            ctrl.errors = [];
            bpModel.currentBiller.setupEBills = false;
        };
    };

    // @ngInject
    exports.PayeeAddedCtrl = function(bpService, bpModel, lpCoreBus) {

        this.eBillsEnabled = function() {
            return _.get(bpModel, 'currentBiller.eBillsStatus') === 'ACTIVE';
        };

        this.addNewPayee = function() {
            bpModel.currentBiller = null;
            bpModel.payment = null;
            bpService.errors = null;

            wizard.goToStep(1);
        };

        this.openDashboard = function() {
            lpCoreBus.publish('launchpad-retail.openEBillDashboard');
        };

        this.createPayment = function() {
            bpModel.payment = bpModel.paymentModel.createPaymentTemplate();
            wizard.goToStep(4);
        };
    };

    // @ngInject
    exports.PayCtrl = function(bpService, bpModel, lpCoreI18n, calendarService, $filter, $scope, $q) {

        var ctrl = this;

        var formatDate = function(date) {
            return $filter('date')(date, 'yyyy-MM-dd');
        };

        var translate = function(entry){
            entry.value = lpCoreI18n.instant(entry.id);
            return entry;
        };

        ctrl.frequencies = _.map(bpModel.paymentModel.frequencies, translate);
        ctrl.endOptions = _.map(bpModel.paymentModel.endOptions, translate);
        ctrl.isConnecting = true;

        $scope.payment = bpModel.payment;

        var updateDeliveryDate = function(startDate) {
            if (startDate) {
                var daysToDeliver = $scope.payment.urgentTransfer ? 1 : bpModel.currentBiller.businessDaysToDeliver;
                var date = formatDate(startDate);
                calendarService.getBusinessDay(date, daysToDeliver)
                    .then(function(result) {
                        $scope.payment.estDeliveryDate = result;
                    });
            }
        };

        $scope.$watch('payment.urgentTransfer', function() {
            updateDeliveryDate($scope.payment.scheduleDate);
        });

        $scope.$watch('payment.scheduleDate', function(startDate) {
            updateDeliveryDate(startDate);
        });

        this.showUrgentTransfer = function() {
            return bpModel.currentBiller.canExpeditePayments && bpModel.currentBiller.paymentMethod === bpModel.paymentMethods.CHECK;
        };

        var isValidPayment = function(payment) {
            ctrl.warnings = [];
            if (!payment.account) { ctrl.warnings.push({ code: 'ERROR_SELECT_ACCOUNT' }); }
            if (!payment.scheduleDate) { ctrl.warnings.push({ code: 'ERROR_ENTER_PROCESSING_DATE' }); }
            if (!payment.amount) { ctrl.warnings.push({ code: 'ERROR_ENTER_AMOUNT' }); }

            if (payment.isScheduledTransfer) {
                if (!payment.scheduledTransfer.frequency) { ctrl.warnings.push({ code: 'ERROR_SELECT_FREQUENCY' }); }
                if (payment.scheduledTransfer.endOn === 'after' && !payment.scheduledTransfer.timesToRepeat) { ctrl.warnings.push({ code: 'ERROR_ENTER_TIMES_TO_REPEAT' }); }
            }

            if (ctrl.warnings.length > 0) { return false; }
            return true;
        };

        this.pay = function(payment) {
            if (isValidPayment(payment)) {
                var pay = bpModel.paymentModel.transformPayment(bpModel.currentBiller, payment);
                bpService.makeAPayment(pay).then(function() {
                    if (bpService.errors === null) {
                        payment.sent = true;
                    }
               });
            }
        };

        this.cancel = function() {
             wizard.goToStep(1);
        };

        // Load necessary resources
        var accounts = bpService.getAccounts();
        var payee = bpService.fetchPayee(bpModel.currentBiller);

        $q.all([ accounts, payee ]).then(function(results) {
            ctrl.accounts = results[0];
            ctrl.eBills = results[1].eBill;

            // Select first account as default
            $scope.payment.account = ctrl.accounts[0];

        }, function(errObj){
            // TODO: log to screen about data fetch problems
        })['finally'](function() {
            ctrl.isConnecting = false;
        });
    };

    // @ngInject
    exports.ConfigureCtrl = function(fiService) {
        var ctrl = this;
        ctrl.fiModel = fiService.fiModel;
        ctrl.goBack = wizard.previousStep;
    };

});
