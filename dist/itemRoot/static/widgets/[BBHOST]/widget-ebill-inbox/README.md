# E-Bill Inbox
Provides the ability to accept new e-Bill requests, view unpaid e-Bills, pay e-Bills and also decline. Moreover, it displays additional information about the selected e-Bill, such as Payee, Bill Reference Number, and Amount.

## Information
|  name |  version |  bundle | 
|--|:--:|--:|
|  widget-ebill-inbox |  2.2.3 |  Ebilling | 

## Dependencies

- base ^2.9.2
- core ^2.13.0
- ui ^2.8.0
- module-ebilling ^2.0.14
- module-payments ^2.3.0

## Dev Dependencies

- angular-mocks ~1.2.28
- config ^3.4.0

## Preferences

- **accountsDataSrc**: Accounts Data Source
- **debitOrdersSrc**: Debit-Orders Data Source
- **mandatesSrc**: Mandates Data Source

## Events
The following is a list of pub/sub event which the widget subscribes to:

*This widget does not subscribe to any events.*

The following is a list of pub/sub event which the widget publishes to:


- **lp.widget.e-bill-inbox:sync** - Published when the widget refreshes

## Templates
Widget uses templates with the following keys:


- **ebill-inbox** - Main widget template.
- **details** - Bill details template.
- **newbills-details** - New bills details.
- **payment** - Payment tab template.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for main template create property `widgetTemplate_ebill-inbox` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

