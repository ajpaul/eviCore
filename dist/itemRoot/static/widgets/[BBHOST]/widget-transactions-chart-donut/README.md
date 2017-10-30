# Transactions Charts Donut
Implements a donut chart

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-transactions-chart-donut |  2.2.1 |  Banking |

## Dependencies

- base 2.x
- core 2.x
- ui 2.x
- module-accounts 2.x
- module-transactions ^3.0.0

## Dev Dependencies

- angular-mocks 1.2.28
- requirejs ~2.1.20
- theme-default ^1.0.9
- config ^3.0.0
- mock ^1.x

## Preferences

- **accountsDataSrc**: Accounts Data Source
- **categoriesDataSrc**: Transaction Categories Data Source
- **categorySpendingDataSrc**: Category Spendings Data Source

Get widget preference `lpWidget.getPreference(string)`  

Get preference inherited from widget's parents `lpWidget.getPreferenceFromParents(string)`


- animation: Time in milliseconds for the donut to animate.
- animation-direction: Set to 'anticlockwise' for donut to animation anti-clockwise (otherwise it will be clockwise).

## Events
The following is a list of pub/sub event which the widget subscribes to:


- The following is a list of pub/sub event which the widget publishes to:
- **launchpad-retail.accountSelected** - Emits the event when an account is selected

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
