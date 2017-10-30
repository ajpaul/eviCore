# Expense Planning
The Expense Planning widget displays all (approved) scheduled payments. Any data source can be added. Payments are plotted on a calendar with 4 views: Calendar list, Week, Month, Year. Additional sources can be plotted as well such as goals.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-expense-planning |  2.2.1 |  Banking |

## Dependencies

- base
- core
- ui
- module-expenses

## Dev Dependencies

- angular-mocks ~1.2.28
- config

## Preferences
Get widget preference `widget.getPreference(string)`


- **expensesDataSrc**: The URL endpoint to retrieve the expenses information
- **expensesDetailsDataSrc**: The URL endpoint to retrieve the expenses details information

## Events
*This widget does not subscribe or publish to any events.*

