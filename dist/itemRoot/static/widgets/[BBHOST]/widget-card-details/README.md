# Card Details
Widget that allows to see important information about the selected credit card. 
The information and actions are defined by the services available per card.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-card-details |  2.1.7 |  Launchpad |

## Dependencies

- base
- core
- ui
- module-accounts

## Dev Dependencies

- angular-mocks ~1.2.28
- config

## Preferences
Get widget preference `widget.getPreference(string)`


- **title**: Widget title
- **thumbnailUrl**: Url to the widget's icon
- **cardDataSrc**: Data source for Cards data

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad-retail.cardSelected**

## Templates
Widget uses templates with the following keys:


- card-details - Main widget template.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for main template create property `widgetTemplate_card-details` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

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
## References
