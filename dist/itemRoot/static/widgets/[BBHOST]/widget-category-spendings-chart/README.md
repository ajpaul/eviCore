# Category Spendings Chart
# Category Spendings Chart
Provides an overview of the last month spendings based on the transactions categories as a donut chart.

## Information
|  name |  version |  bundle | 
|--|:--:|--:|
|  widget-category-spendings-chart |  2.1.6 |  PFM | 

## Dependencies

- base
- core
- ui

## Dev Dependencies

- angular-mocks ~1.2.28
- config

## Preferences
Get widget preference `widget.getPreference(string)`


- **categorySpendingDataSrc**: The URL endpoint to retrieve spendings data
- **categoriesDataSrc**: The URL endpoint to retrieve the transactions categories data

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad-retail.accountSelected** - When this message is received, the widget udpates the current data based on the selected account
- **launchpad-retail.accountsLoaded** - When this message is received, the widget updates its data for all accounts
- **launchpad-retail.transactionsDateSearch** - When this message is received, the widget updates its data according to the date range selected

The following is a list of pub/sub event which the widget publishes to:


- **launchpad-retail.spendingDataUpdated** - Publishes when the widget data is updated
Arguments: `{spendings: result.spendings, categories: result.categories}`

