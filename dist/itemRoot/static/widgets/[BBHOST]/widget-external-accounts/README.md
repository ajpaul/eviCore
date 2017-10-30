# External Accounts
Provides the ability of adding external accounts to the online banking solution.
The widget displays a list of accounts and their groups. Different accounts may offer different interaction and information options. An account can be a pension scheme, a complex savings product or a straightforward current on-demand account.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-external-accounts |  2.1.11 |  Banking |

## Dependencies

- base ^2.x
- core ^2.x
- ui ^2.x
- module-accounts ^2.6.1

## Dev Dependencies

- config ^3.2.5
- angular-mocks ~1.2.28
- theme ^4.1.3
- theme-default ^1.0.11
- requirejs ~2.1.20
- mock ^1.0.8

## Preferences

- **amountToLoad**: Amount of Financial Institutes to Load
- **financialInstitutionsSrc**: Data endpoint for list of financial institutions
- **membershipRequestsSrc**: Data endpoint for FI membership Requests
- **navRoot**: The portal root to display the nav links from


- **navRoot**: The portal root to display the nav links from

Get widget preference `widget.getPreference(string)`


- **financialInstitutionsSrc**: The URL endpoint to retrieve the list of financial institutions
- **membershipRequestsSrc**: The URL endpoint to retrieve membership requests
- **amountToLoad**: Amount of financial institutions to be loaded at each increment of the lazy loading mechanism

## Events
The following is a list of pub/sub event which the widget subscribes to:

*This widget does not subscribe to any events.*

The following is a list of pub/sub event which the widget publishes to:


- **launchpad-retail.closeActivePanel** - Published when the active panel is closed

