# Card Loyalty
Offers details and actions for the loyalty program related to the selected credit card.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-card-loyalty |  2.1.7 |  Launchpad |

## Dependencies

- [base][base-url]
- [core][core-url]
- [ui][ui-url]
- [module-accounts][module-accounts-url]

## Dev Dependencies

- [angular-mocks ~1.2.28][angular-mocks-url]
- [config][config-url]

## Preferences
Get widget preference `widget.getPreference(string)`


- **title**: Widget title
- **thumbnailUrl**: Url to the widget's icon
- **cardDataSrc**: Data source for cards data

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad-retail.cardSelected**

## Templates
Widget uses templates with the following keys:


- card-loyalty - Main widget template.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for main template create property `widgetTemplate_card-loyalty` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

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
