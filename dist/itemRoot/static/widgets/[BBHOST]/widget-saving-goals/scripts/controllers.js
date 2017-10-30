define(function(require, exports, module) {
    'use strict';

    var base = require('base');
    var _ = base.utils;
    var angular = base.ng;

    function savingGoalIconMap() {
        var names = [
            'car', 'college', 'computer', 'house', 'payoffloan',
            'pension', 'phone', 'rainyday', 'trip'
        ];

        return _.transform(names, function(result, name) {
            result[name] = 'icon-icons-goals_' + name;
        }, {});
    }

    function addMonthsToDate(inputDate, months) {
        var srcDate = new Date(inputDate);
        var futureDate = new Date().setMonth(srcDate.getMonth() + months);
        return new Date(futureDate);
    }

    function decorateGoalsCurrency(goals, accounts) {
        if (!_.isArray(goals)) {
            goals = [goals];
        }
        _.forEach(goals, function(goal) {
            var account = _.findWhere(accounts, { id: goal.accountId });
            if (account) {
                goal.currency = account.currency;
            }
        });
    }

    // @ngInject
    exports.SavingGoalAppCtrl = function(state) {
        var vm = this; // view model

        vm.state = state;
    };

    // @ngInject
    exports.SavingGoalListCtrl = function($q, state, SavingAccounts, SavingGoalService) {
        var vm = this; // view model

        vm.state = state;
        vm.iconMap = savingGoalIconMap();

        var fetchSavingAccounts = function() {
            return SavingAccounts.query(function(accounts) {
                vm.state.accountList = accounts;
                return accounts;
            });
        };

        var fetchSavingGoalList = function() {
            vm.loading = true;
            vm.error = false;

            return SavingGoalService.getAll()
            .then(function(savingGoals) {
                vm.state.savingGoals = vm.state.savingGoals.concat(savingGoals);
                return vm.state.savingGoals;
            }, function(reason) {
                vm.error = true;
            })
            ['finally'](function() {
                vm.loading = false;
            });
        };

        vm.addSavingGoal = function() {
            window.scroll(0, 0);
            vm.state.view = 'editor:create';
            vm.state.editorSavingGoal = {};
        };

        vm.updateSavingGoal = function(savingGoal) {
            window.scroll(0, 0);
            vm.state.view = 'editor:update';
            vm.state.editorSavingGoal = savingGoal;
        };

        vm.initializeSavingGoalsList = function() {
            $q.all({
                accounts: fetchSavingAccounts(),
                goals: fetchSavingGoalList()
            }).then(function(results) {
                decorateGoalsCurrency(results.goals, results.accounts);
            });
        };

        vm.initializeSavingGoalsList();
    };

    // @ngInject
    exports.SavingGoalEditorCtrl = function($scope, state, lpWidget, SavingGoalService) {
        var vm = this; // view model
        vm.state = state;
        vm.loading = false;
        vm.iconMap = savingGoalIconMap();
        vm.showAccountSelect = lpWidget.getPreference('showAccountSelect');
        vm.isRemoving = false;
        vm.removeConfirm = false;

        var cfgMinMonths = parseInt(lpWidget.getPreference('minMonths'), 10) || 1;
        var cfgMinTargetDate = addMonthsToDate(new Date(), cfgMinMonths);
        vm.showTargetDateCalendar = false;

        $scope.$watch(function() { return vm.state.editorSavingGoal; }, function(newVal, oldVar) {
            vm.savingGoal = angular.copy(newVal);

            if(vm.state.view === 'editor:create') {
                vm.minTargetDate = cfgMinTargetDate;
                vm.savingGoal.targetDate = vm.minTargetDate;
            } else {
                //HACK: angular-ui datepicker fails at comparing Unix time
                vm.savingGoal.targetDate = new Date(vm.savingGoal.targetDate);
                vm.minTargetDate = vm.savingGoal.targetDate;
            }
        });

        vm.create = function(savingGoal) {
            $scope.goalForm.title.$setValidity('duplicate', !_.isObject(
                _.find(vm.state.savingGoals, function(goal) {
                    return goal.title === savingGoal.title;
                })
            ));

            if($scope.goalForm.$invalid) {
                $scope.goalForm.$setDirty();
                return;
            }

            vm.loading = true;

            SavingGoalService.create(savingGoal).then(function(createdSavingGoal) {
                vm.loading = false;
                vm.state.savingGoals.push(createdSavingGoal);
                decorateGoalsCurrency(createdSavingGoal, vm.state.accountList);
                vm.state.view = 'list';
            }, function(reason) {
                vm.loading = false;
            });
        };

        vm.update = function(savingGoal) {
            SavingGoalService.update(savingGoal).then(function(updatedSavingGoal) {
                angular.copy(vm.savingGoal, vm.state.editorSavingGoal);
                decorateGoalsCurrency(updatedSavingGoal, vm.state.accountList);
            });

            $scope.goalForm.$setPristine();
            vm.state.view = 'list';
        };

        vm.remove = function(savingGoalId) {
            vm.isRemoving = true;
            SavingGoalService.remove(savingGoalId).then(function() {
                vm.hideConfirm();
                vm.state.savingGoals = _.without(vm.state.savingGoals, vm.state.editorSavingGoal);
                vm.state.view = 'list';
            })
            ['finally'](function() {
                vm.isRemoving = false;
            });

            $scope.goalForm.$setPristine();
        };

        vm.cancel = function() {
            $scope.goalForm.$setPristine();
            vm.state.view = 'list';
        };


        vm.openCalendar = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.showTargetDateCalendar = true;
        };

        vm.showConfirm = function() {
            vm.removeConfirm = true;
        };

        vm.hideConfirm = function() {
            vm.removeConfirm = false;
        };
    };
});
