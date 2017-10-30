# P2P Transactions
Provides an overview of all P2P transactions of a user, including related information such as Date, Beneficiary Name, Beneficiary E-mail or Phone Number, Amount and Status.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-p2p-transactions |  3.0.11 |  P2P |

## Dependencies

- base ^2.4.0
- core ^2.9.0
- ui ^2.4.8
- module-transactions ^3.0.0
- module-p2p ^1.0.0
- module-contacts ^1.1.0

## Dev Dependencies

- mock ^1.0.9
- config ^3.4.0
- theme-default ^1.0.12
- angular-mocks ~1.2.28
- requirejs ~2.1.20

## Preferences

- **p2pEnrollmentEndpoint**: Enrollment Status Endpoint for P2P Service
- **transactionsDataSrc**: Transactions Data Source
- **hideFooter**: Hide Footer

Get widget preference `widget.getPreference(string)`


- **transactionsDataSrc**: The end-point URL containing transactions data
- **locale**: Locale of the widget

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad-retail.p2pTransactions.newTransferSubmitted** - When this message is received, the transactions list is cleaned and more transactions are loaded

The following is a list of pub/sub event which the widget publishes to:


- **launchpad-retail.requestMoneyTransfer** - Published when the user selects the Transfer Money button, opens New Transfer widget
- **launchpad-retail.requestMoneyTransfer.setTab** - Published when the user selects the Transfer Money button, selects Email tab on New Transfer widget
Arguments: `{tab: &amp;amp;#39;P2P_EMAIL&amp;amp;#39;}`

