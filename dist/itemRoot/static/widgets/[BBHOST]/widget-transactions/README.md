# Transactions
Displays transaction information for any selected account, in 3 views (transaction list, balance, split view). Selecting a transaction will display further details of that transaction. The Smart Suggest functionality allows for very fast searches.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-transactions |  3.11.5 |  Banking |

## Dependencies

- base 2.x
- core 2.x
- module-accounts ^2.3.0
- module-charts 1.x
- module-contacts 1.x
- module-freshness 2.x
- module-tags 2.x
- module-transactions ^3.0.5
- module-users ^2.7.0
- ui 2.x

## Dev Dependencies

- angular-mocks ~1.2.28
- theme-default ^1.0.8
- requirejs ~2.1.20
- mock ^1.0.5
- config ^3.2.2

## Preferences

- **showExportButton**: Show Export Button
- **showScrollbar**: Show Scrollbar
- **transactionsChartDataSrc**: Transactions Chart Data Source
- **stickyHeader**: Stick widget header to the top
- **hideFooter**: Hide footer
- **accountHolds**: Funds on Hold
- **accountsDataSrc**: The endpoint URL to retrieve account data
- **transactionsDataSrc**: The endpoint URL to retrieve transactions data
- **categoryDataSrc**: The endpoint URL to retrieve category data
- **transactionDetailsDataSrc**: The endpoint URL to retrieve transaction details data
- **contactsDataSrc**: The endpoint URL to retrieve contacts data
- **accountBalanceChartDataSrc**: The endpoint URL to retrieve balance chart data
- **transactionsPageSize**: Defines the number of transactions to be loaded at each iteration
- **showTransactionIcons**: Shows/hides transaction icons
- **showCharts**: Shows/hides charts
- **showAccountSelect**: Shows/hides account selection option
- **preferenceService**: The endpoint URL to
- **categorySpendingDataSrc**: The endpoint URL to retrieve category spending chart data
- **categoriesDataSrc**: The endpoint URL to retrieve transaction categories data
- **hideTransactionDetails**: Hide transaction details when expanded
- **showDatesAllTransactions**: To show transaction date in each row

Get widget preference `widget.getPreference(string)`

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad-retail.accountSelected** - When this message is received, the selected account dropdown will be updated and will reload related transactions
- **launchpad-retail.cardSelected** - When this message is received,  the selected card dropdown will be updated and will reload related transactions
- **lpDataFreshnessRefresh** - When this message is received, the account/card dropdown will be reloaded and the widget will be reinitialized
- **launchpad-retail.transactions.applyFilter** - When this message is received, the transactions list will be reloaded with the supplied filters
- **launchpad-retail.transactions.newTransferSubmitted** - When this message is received, the transactions list will be reloaded
- **launchpad-retail.donutCategoryChartSelection** - When this message is received, the category supplied will be selected and the transactions reloaded
- **launchpad-retail.accountsLoaded** - When this message is received, the user accounts data will be reloaded
- **launchpad-retail.transactionsDateSearch** - When this message is received, the transactions list will be filtered by the date range supplied

The following is a list of pub/sub event which the widget publishes to:


- **lpDataFreshnessChanged** - Notifies when the accounts have been loaded after attending **lpDataFreshnessRefresh** event
- **launchpad-retail.accountSelected** - The account in the dropdown has changed. Arguments: `{accountId: $scope.accountsModel.selected.id, originType: &amp;amp;#39;transactions&amp;amp;#39;, _noBehavior: true}`
- **launchpad-retail.requestMoneyTransfer** - Published when the button Transfer Money is selected
- **launchpad-retail.transactionsDateSearch** - Notifies a date range change in the filter component. Arguments: `{fromDate: filters.fromDate, toDate: filters.toDate}`
- **launchpad-retail.transactionsCategorySearch** - Notifies a category change in the filter component. Arguments: `currentSuggestion.category`
- **launchpad-retail.spendingDataUpdated** - Triggered after loading the spendings by category data. Arguments: `{spendings: result.spendings, categories: result.categories}`

## Templates
Widget uses templates with the following keys:


- transactions - Main widget template.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for main template create property `widgetTemplate_transactions` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

