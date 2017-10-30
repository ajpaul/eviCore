# P2P Tab
Provides navigation tabs related with P2P Transfers. If the user is not enrolled in P2P, the option to access the P2P Enrollment widget is displayed. Otherwise, the options to access the P2P Transactions and P2P preferences are displayed.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-p2p-tab |  2.1.5 |  P2P |

## Dependencies

- base 2.x
- core 2.x
- ui 2.x
- module-p2p ^1.0.0

## Dev Dependencies

- config 2.x
- angular-mocks ~1.2.28

## Preferences

- **p2pEnrollmentEndpoint**: Enrollment Status Endpoint for P2P Service

Get widget preference `widget.getPreference(string)`

*This widget does not have any preference.*

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad-retail.p2pEnrollmentComplete** - When this message is received, the widget changes the options available from P2P Enrollment, to P2P Transactions and P2P Preferences

The following is a list of pub/sub event which the widget publishes to:


- **launchpad-retail.openP2PEnrollment** - Published when the user selects P2P Enrollment tab
- **launchpad-retail.openP2PTransactions** - Published when the user selects P2P Transactions tab
- **launchpad-retail.openP2PPreferences** - Published when the user selects P2P Preferences tab

