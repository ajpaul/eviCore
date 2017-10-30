# P2P Enrollment
Provides a multi-step wizard that allows the current user to enroll and set initial configuration for Person-to-Person Transfers.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-p2p-enrollment |  2.2.5 |  P2P |

## Dependencies

- base ^2.9.0
- core ^2.12.4
- ui ^2.10.1
- module-users ^2.5.1
- module-accounts ^2.5.2
- module-p2p ^1.0.0

## Dev Dependencies

- config ^3.2.5
- angular-mocks ~1.2.28

## Preferences

- **accountsDataSrc**: Accounts Data Source
- **emailLimit**: Email Limit
- **p2pEnrollmentEndpoint**: Enrollment Status Endpoint for P2P Service
- **saveUrl**: Places Data Source

## Events
The following is a list of pub/sub event which the widget subscribes to:

*This widget does not subscribe to any events.*

The following is a list of pub/sub event which the widget publishes to:


- **launchpad-retail.p2pEnrollmentComplete** - Published on completion of the P2P enrollment
Arguments: `{verified: true}`
- **launchpad-retail.openP2PTransactions** - Published when the P2P enrollment is completed, opens the P2P Transactions widget

## Templates
Widget uses templates with the following keys:


- p2p-enrollment - Main widget template.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for main template create property `widgetTemplate_p2p-enrollment` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

