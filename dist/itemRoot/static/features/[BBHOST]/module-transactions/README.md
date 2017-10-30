# module-transactions
The purpose of this module is to be able to work with transactions in any widget. It
also allows you to use P2P transactions. It contains filters and directives to display
categories of every transaction.

# Information
|  name |  version |  bundle |
|--|:--:|--:|
|  module-transactions |  3.1.0 |  launchpad |

## Dependencies

- base 2.x
- core 2.x
- ui ^2.10.1
- module-tags 2.x
- module-charts 1.x
- module-contacts 1.x
- d3 3.4.13

## Table of Contents

- [Provider](#provider)
- [Components](#components)

<a name="provider"></a>

## Provider
###### Initial Setup
The provider `lpTransactions` has to be configured in the `run` method of the widget
that includes it. Allows to customize:


- **transactionsEndpoint** : url used to retrieve the transactions of a certain account, the account is
specified by the placeholder `$(accountId)`.
- **transactionDetailsEndpoint** : url used to fetch the transaction details pointed by `$(transactionId)`.
- **pageSize** : number of rows to return in every request.
- **from** : index of the first row to retrive (1 is the first).
- **sort** : a label indicating the field that will be used to sort the returned rows. If `-` sign is prepended it will return the results in descending order. Possible values are:
 - bookingDateTime
 - transactionAmount

### Configuring module
Widget which uses module-transaction should configure it with required endpoints:

```javascript
// @ngInject
function run(lpWidget, lpTransactions) {
    lpTransactions.setConfig({

        'transactionsEndpoint': lpWidget.getPreference('transactionsDataSrc'),

        // used by lpTransactionsList directive
        'transactionDetailsEndpoint': lpWidget.getPreference('transactionDetailsDataSrc'),

        // used by lpCategoriesSpendings directive
        'categoriesEndpoint': lpWidget.getPreference('categoriesDataSrc'),
        'categorySpendingEndpoint': lpWidget.getPreference('categorySpendingDataSrc'),

        // used by lpTransactionsCharts[Horizontal] directives
        'accountsChartEndpoint': lpWidget.getPreference('accountBalanceChartDataSrc'),
        'transactionsChartEndpoint': lpWidget.getPreference('transactionsChartDataSrc'),

        // optional endpoints for displaying lpTransactionsCharts[Horizontal] directives for all accounts
        'allAccountsChartEndpoint': lpWidget.getPreference('allAccountsBalanceChartDataSrc'),
        'allTransactionsChartEndpoint': lpWidget.getPreference('allTransactionsChartDataSrc'),

        // used by lpTransactionsAuthorizationsList directive
        'accountHoldsEndpoint': lpWidget.getPreference('accountHolds'),

        // used by lpTransactionsList directive
        'customTemplateSrc': lpWidget.getPreference('customTemplateSrc'),
        'groupTransactionsByDate': lpCoreUtils.parseBoolean(lpWidget.getPreference('groupTransactionsByDate')),

        'pageSize': 20,
        'from': 1,
        'sort': '-bookingDateTime'
    });
}
```
###### Usage
Once the provider has been configured it can be injected, to start using it call the method api, it
will return a fresh instance of transactions model with all the public methods available.

```javascript
...
$scope.transactions = lpTransactions.api();
...
```
<a name="components"></a>

### Components

- **transactions-categories
- **transactions-charts
- **transactions-currency
- **transactions-list
- **transactions-list-authorizations
- **transactions-p2p
- **transactions-search
- **transactions-spendings

#### Transactions Categories
##### Provider

- `lpTransactionsCategory`

##### Filters

- `categoryList`
- `selectedCategory`
- `markedCategory`

##### Directives

- `lpCategoryDisplay`
- `lpCategoryItem`
- `lpCategorySelect`

#### Transactions Currency
##### Provider

- `lpTransactionsCurrency`

#### Transactions List
Template `templates/list` is used by default to render a transaction list.
A property `customTemplateSrc` can be used with a lpTemplate contract to specify a custom template.

##### Example 1 - Use local widget template
Add property `customTemplateSrc:templates/test.html` to widget-transactions.
Add template `test.html` to `widget-transactions\templates`.

##### Example 2 - Use other widget template
Add property `customTemplateSrc:templates/test.html` to widget-transactions.
Add property `widgetTemplate_test:http://localhost:7777/portalserver/static/features/[BBHOST]/module-transactions/scripts/components/transactions-list/templates/test.html` to widget-transactions.
Add template `test.html` to module-transactions by specified path.

#### Transactions P2P
##### Provider

- `lpP2PTransactions`

