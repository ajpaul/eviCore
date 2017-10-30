# Addressbook
Offer users single location to manage and interact with their (finance related) contacts.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-addressbook |  3.1.5 |  Launchpad |

## Dependencies

- base ^2.4.0
- core ^2.9.0
- ui ^2.4.8
- module-contacts ^1.1.0
- module-payments ^2.0.2
- module-transactions ^3.0.0
- module-accounts ^2.4.0
- module-tags ^2.0.0

## Dev Dependencies

- config ^3.0.0
- angular-mocks ~1.2.28
- mock ^1.0.5
- theme-default ^1.0.11

## Preferences

- **accountsDataSrc**: Accounts Data Source
- **transactionsEndpoint**: Transactions Data Source
- **title**: Widget title
- **thumbnailUrl**: Url to the widget's icon
- **paymentOrdersDataSrc**: The URL endpoint for the payment orders, passed to [module-payments](http://stash.backbase.com:7990/projects/lpm/repos/module-payments/browse/)
- **contactListDataSrc**: The URL endpoint to retrieve the list of contacts for the user
- **contactDataSrc**: The URL endpoint to retrieve an individual contact
- **contactDetailsDataSrc**: The URL endpoint to retrieve various details about the contact, including transaction history
- **messageSrc**: The URL endpoint to retrieve the different keywords used by the Addressbook widget
- **locale**: Locale settings
- **defaultAccount**: The default account

Get widget preference `widget.getPreference(string)`
Get preference inherited from widget's parents `widget.getPreferenceFromParents(string)`

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad.contacts.load** - When this message is received, the widget will reload its contacts model

The following is a list of pub/sub event which the widget publishes to:


- **launchpad-retail.transactions.applyFilter** - Publishes an applyFilter event to any interested parties.
Arguments: `{contactName: contact.name, filters: { contact: contact.account}}`
- **launchpad-retail.paymentOrderInitiated** - Published when a quick transfer is placed, opens the Review Transfers widget

## Templates
Widget uses templates with the following keys:


- **addressbook** - Main widget template.
- **contactsAdd** - Add new contact template.
- **contactsEdit** - Edit contact template.
- **contactsList** - List contacts template.
- **contactsNone** - Empty addressbook template.
- **contactsView** - View selected contact template.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for main template create property `widgetTemplate_addressbook` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

## Test
```bash
$ bb start
```
with watch flag

```bash
bb test -w
```
## Build
```bash
$ bb build
```
## TODO

- Move jquery/placeholder dependency to UI

