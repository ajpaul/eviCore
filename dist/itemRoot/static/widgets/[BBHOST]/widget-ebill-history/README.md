# E-bill History
Provides the ability to show a list of past bill payments containing information about the payment date, and payment status.

## Information
|  name |  version |  bundle | 
|--|:--:|--:|
|  widget-ebill-history |  2.1.7 |  Ebilling | 

## Dependencies

- base
- core
- ui
- module-ebilling

## Dev Dependencies

- angular-mocks ~1.2.28
- config

## Preferences
Get widget preference `widget.getPreference(string)`


- **debitOrdersSrc**: The URL endpoint for the debit orders
- **mandatesSrc**: The URL endpoint for the mandates
- **locale*8: Locale settings

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **lp.widget.e-bill-inbox:sync** - When this message is received, the widget fetches new bills

## Templates
Widget uses templates with the following keys:


- **ebill-history** - Main widget template.
- **details** - Bill details information template.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for main template create property `widgetTemplate_history` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

The following is a list of pub/sub event which the widget publishes to:

*This widget does not publish any events.*

