define(function(require, exports, module) {

    'use strict';

    // base utilities
    var _ = require('base').utils;

    /**
     * @ngInject
     * @constructor
     */
    var EBillPayService = function EBillPayService(lpCoreUtils) {
        function EBillPayModel () {
            var model = this;

            model.endOptionsEnum = {
                AFTER: 'after',
                ON_DATE: 'onDate',
                CANCEL: 'onCancel'
            };
            model.endOptions = [
                {id: model.endOptionsEnum.AFTER},
                {id: model.endOptionsEnum.CANCEL},
                {id: model.endOptionsEnum.ON_DATE}
            ];
            model.frequencies = [
                {
                    id: 'OneTime',
                    schedule: null
                },
                {
                    id: 'Weekly',
                    schedule: {
                        transferFrequency: 'WEEKLY',
                        every: 1
                    }
                },
                {
                    id: 'EveryTwoWeeks',
                    schedule: {
                        transferFrequency: 'WEEKLY',
                        every: 2
                    }
                },
                {
                    id: 'EveryFourWeeks',
                    schedule: {
                        transferFrequency: 'WEEKLY',
                        every: 4
                    }
                },
                {
                    id: 'Monthly',
                    schedule: {
                        transferFrequency: 'MONTHLY',
                        every: 1
                    }
                },
                {
                    id: 'EveryTwoMonths',
                    schedule: {
                        transferFrequency: 'MONTHLY',
                        every: 2
                    }
                },
                {
                    id: 'Quarterly',
                    schedule: {
                        transferFrequency: 'MONTHLY',
                        every: 3
                    }
                },
                {
                    id: 'EveryFourMonths',
                    schedule: {
                        transferFrequency: 'MONTHLY',
                        every: 4
                    }
                },
                {
                    id: 'BiAnnual',
                    schedule: {
                        transferFrequency: 'MONTHLY',
                        every: 6
                    }
                },
                {
                    id: 'Annually',
                    schedule: {
                        transferFrequency: 'YEARLY',
                        every: 1
                    }
                }
            ];

            var formatDate = function(date) {
                return lpCoreUtils.date(date).format('YYYY-MM-DD');
            };

            var getScheduleFromFrequency = function (frequencyId){
                return _(model.frequencies).find({id: frequencyId}).schedule;
            };

            var transformSchedule = function(scheduledTransfer) {
                var schedule = {
                    startDate: formatDate(scheduledTransfer.startDate),
                    on: 0
                };
                _.assign(schedule, getScheduleFromFrequency(scheduledTransfer.frequency));
                if (scheduledTransfer.endOn === model.endOptionsEnum.AFTER) {
                    schedule.repeat = scheduledTransfer.timesToRepeat;
                } else if (scheduledTransfer.endOn === model.endOptionsEnum.ON_DATE) {
                    schedule.endDate = formatDate(scheduledTransfer.endDate);
                }
                return schedule;
            };

            model.transformPayment = function(payee, payment) {
                var pay = {
                    instructedAmount: payment.amount,
                    instructedCurrency: 'USD',
                    debitAccount: {
                        id: payment.account.identifier || payment.account.id,
                        source: 'PRTYINTERNAL'
                    },
                    creditAccount: {
                        id: payee.payeeId,
                        source: 'EBILL'
                    },
                    additionalInfo: {
                        memo: payment.memo
                    }
                };
                var isOneTimeRecurringTransfer = payment.isScheduledTransfer && payment.scheduledTransfer && payment.scheduledTransfer.frequency === 'OneTime';
                if (payment.isScheduledTransfer && !isOneTimeRecurringTransfer) {
                    pay.paymentMode = 'RECURRING';
                    pay.schedule = transformSchedule(payment.scheduledTransfer);
                } else {
                    pay.paymentMode = 'SINGLE';
                    var executionDate = isOneTimeRecurringTransfer ? payment.scheduledTransfer.startDate : payment.scheduleDate;
                    pay.executionDateTime = formatDate(executionDate);
                    pay.urgentTransfer = payment.urgentTransfer;
                }
                return pay;
            };

            model.createPaymentTemplate = function() {
                return {
                    amount: 0,
                    scheduleDate: new Date(),
                    currencySym: '$', // TODO: Remove hardcoded currency
                    isScheduledTransfer: false,
                    scheduledTransfer: {
                        startDate: new Date(),
                        intervals: [],
                        timesToRepeat: 1
                    },
                    memo: ''
                };
            };
        }

        this.getModel = function (){
            return new EBillPayModel();
        };
    };

    // export service
    exports.lpEBillPayService = EBillPayService;

});
