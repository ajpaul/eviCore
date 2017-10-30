# Profile Preferences
Provides an easy way for user to update preferences related to the Portal experience and Internet Banking.


- **accountsDataSrc**: Accounts Service
- **balanceSelector**: Balance Selector
- **categorizationSelector**: Categorization Selector
- **localeSelector**: Locale Selector
- **preferenceService**: Preferences Service

## Information
|  name |  version |  bundle | 
|--|:--:|--:|
|  widget-profile-preferences |  2.3.5 |  Universal | 

## Dependencies

- base 2.x
- core 2.x
- module-accounts 2.x
- module-users ^2.5.2
- ui ^2.10.1

## Dev Dependencies

- config 2.x
- angular-mocks ~1.2.28

## Preferences

- **accountsDataSrc**: Accounts Service
- **preferenceService**: Preferences Service


- **balanceSelector**: Balance Selector
- **categorizationSelector**: Categorization Selector
- **localeSelector**: Locale Selector


- **preferenceService**: The end-point URL to store users preferences
- **accountsDataSrc**: The end-point URL to retrieve user accounts data

## Events
*This widget does not subscribe/publish to any events.*

## Templates
Widget uses templates with the following keys:


- profile-preferences - Main widget template.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for main template create property `widgetTemplate_profile-preferences` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

