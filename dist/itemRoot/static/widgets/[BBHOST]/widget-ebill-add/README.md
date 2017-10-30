# Add Bill Payee
Provides a wizard where the user is guided through the flow of adding a new bill payee (both electronic and check payee), so that the user can subsequently schedule a bill. Additionally, if the payee is eligible for e-billing, it provides the possibility of enabling e-billing where the user is asked to provide credentials to login to the 3rd party system.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-ebill-add |  3.1.0 |  Ebilling |

## Dependencies

- base ^2.x
- core ^2.x
- ui ^2.10.1
- module-payments ^2.4.1
- module-accounts ^2.11.2
- module-ebilling ^2.3.6

## Dev Dependencies

- config 3.x
- angular-mocks ~1.2.28
- theme-default ^1.0.8

## Preferences

- **billPaymentsDataSrc**: Payee and E-Bills Data Source
- **instantPaymentOrdersDataSrc**: Instant payment orders Data Source
- **calendarDataSrc**: Business calendar Data Source

Get widget preference `widget.getPreference(string)`


- **billPaymentsDataSrc**: The URL endpoint for Bill Payment service
- **calendarDataSrc**: The URL endpoint for Business Calendar service

Get preference inherited from widget's parents `widget.getPreferenceFromParents(string)`


- **defaultAccount**: The default account

## Events
*This widget does not publish or subscribe to any events.*

