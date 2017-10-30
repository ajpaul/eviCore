# Accounts Dropdown
Implements a dropdown with all accounts as items and one special item 'All Accounts'

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-accounts-dropdown |  1.9.0 |  Banking |

## Dependencies

- base ^2.x
- core ^2.x
- ui ^2.x
- module-accounts ^2.x

## Dev Dependencies

- config ^2.x
- mock ^1.x
- angular-mocks ~1.2.28
- requirejs ~2.1.20
- theme-default ~1.0.12

## Preferences

- **showAllAccountsItem**: Show 'All Accounts' item


- **accountsDataSrc**: Accounts Data Source
- **initialAccountId**: Default Account


- **showAllAccountsItem**: Show 'All Accounts' item

Get widget preference `lpWidget.getPreference(string)`


- **accountsDataSrc**: Endpoint to list of accounts
- **initialAccountId**: Account to be pre-selected (default --> '', means "All Accounts" will be selected)

Get preference inherited from widget's parents `lpWidget.getPreferenceFromParents(string)`

## Events
The following is a list of pub/sub event which the widget publishes to:


- **lpAccounts.loaded** - Emits the event when a list of accounts loaded
Arguments: `accounts list`
- **lpAccounts.failed** - Emits the event when a list of accounts failed to load
- **launchpad-retail.accountSelected** - Emits the event when an account is selected
Arguments: `{accountId: account.id}`

## Test
```bash
$ bblp start
```
with watch flag

```bash
bblp test -w
```
## Build
```bash
$ bblp build
```
