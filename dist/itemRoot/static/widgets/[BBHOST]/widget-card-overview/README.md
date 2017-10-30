# Card Overview
Widget provides consumers an instant overview of their card: status (eg on schedule with payments), 
and important card information (card image, balance, credit limit status, next payment) 

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-card-overview |  2.1.11 |  Launchpad |

## Dependencies

- base ^2.4.0
- core ^2.9.0
- ui ^2.4.0
- module-cards ^1.0.0

## Dev Dependencies

- config ^3.2.0
- angular-mocks ~1.2.28
- mock ~1.0.5

## Preferences
Get widget preference `widget.getPreference(string)`


- **title**: Widget title
- **thumbnailUrl**: Url to the widget's icon
- **cardDataSrc**: Data source for cards data
- **accountsDataSrc**: Accounts Data Source

## Events
The following is a list of pub/sub event which the widget publishes/subscribes to:


- **launchpad-retail.cardSelected**

## Templates
Widget uses templates with the following keys:


- card-overview - Main widget template.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for main template create property `widgetTemplate_card-overview` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

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
