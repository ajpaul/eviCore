# Accounts
Provides a list of accounts tied to the user currently logged in. Accounts can be grouped.
When a specific account is selected, other widgets may listen for this event and update their view or options. Different accounts may offer different interaction and information options. An account can be a pension scheme, a complex savings product or a straightforward current on­demand account.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-accounts |  2.11.3 |  Banking |

## Dependencies

- base ^2.x
- core ^2.x
- ui ^2.x
- module-accounts ^2.x

## Dev Dependencies

- config ^2.x
- theme ^4.1.3
- angular-mocks ~1.2.28
- theme-default ^1.0.11
- requirejs ~2.1.20
- mock ^1.0.8

## Preferences

- **selectDefaultAccount**: Defines if a default or first account should be selected on widget init.
- **defaultAccountId**: Default Account Id


- **widgetLayout**: Widget layout
- **showGroupTotals**: Show Groups Total
- **showGroups**: Show Groups
- **groupByInternalExternal**: Group by internal and external


- **accountsDataSrc**: Accounts Data Source
- **defaultBalance**: Default balance
- **groupsDataSrc**: Groups Data Source
- **showAllFinances**: Show All Finances Option

Get widget preference `widget.getPreference(string)`


- **groupByInternalExternal**: Group by internal and external
- **showGroups**: Show/hide group names
- **showGroupTotals**: Show/hide group total balances
- **showAccountHolderName**: Show/hide name of the account holder
- **showAccountType**: Show/hide account type
- **showAccountHolderCategory**: Show/hide category of the account holder

Get preference inherited from widget's parents `widget.getPreferenceFromParents(string)`


- **preferredBalanceView**: Defines the default balance (current or available)

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad-retail.accountSelected** - Listens for selected accounts and highlights that account
- **lpDataFreshnessRefresh** - Refreshes the widget if data freshness status changes from `updating` to `actual`

The following is a list of pub/sub event which the widget publishes to:


- **launchpad-retail.portfolioSelected** - Emits the event when a portfolio is selected
- **launchpad-retail.openCardManagement** - Emits the event when a card is selected
- **launchpad-retail.cardSelected** - Emits the event when a card is selected
Arguments: `{account: account}`
- **launchpad-retail.accountSelected** - Emits the event when an account is selected
Arguments: `{accountId: account.id, originType: &amp;amp;amp;#39;accounts&amp;amp;amp;#39;}`
- **launchpad-retail.requestMoneyTransfer** - Emits the event when the button Transfer Money is selected

## Templates
Widget uses templates with the following keys:


- default.layout - Main widget layout template.
- tiles.layout - Accounts rendered as tiles.
- tree.layout - Tree-view layout template.
- alerts - Template for alert messages widget displays, like "loading", "failed to load", etc.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for default layout template create property `widgetTemplate_default.layout` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

