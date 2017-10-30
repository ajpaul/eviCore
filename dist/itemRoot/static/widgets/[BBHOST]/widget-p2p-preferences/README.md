# P2P Preferences
Settings for Person-to-person functionality allowing the user to select a deposit account and email.

## Information
|  name |  version |  bundle | 
|--|:--:|--:|
|  widget-p2p-preferences |  2.1.9 |  P2P | 

## Dependencies

- base 2.x
- core 2.x
- ui ^2.10.1
- module-accounts 2.x
- module-p2p ^1.0.0

## Dev Dependencies

- config 2.x
- angular-mocks ~1.2.28

## Preferences
Get widget preference `widget.getPreference(string)`


- **accountsDataSrc**: The end-point URL containing information about the user bank accounts
- **locale**: The locale information
- **allowMultipleEmails**: Allow multiple emails
- **emailLimit**: Email Limit
- **p2pEnrollmentEndpoint**: Enrollment Status Endpoint for P2P Service

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad-retail.userP2PEnrolled** - When this message is received, widget gets enrollment information

The following is a list of pub/sub event which the widget publishes to:


- **launchpad-retail.userP2PVerification.unverified** - Published when the user is the P2P preferences are not verified
- **launchpad-retail.openP2PEnrollment** - Published when the P2P enrollment is completed

## Templates
Widget uses templates with the following keys:


- p2p-preferences - Main widget template.
- verify-email - Verify email modal dialog template.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for main template create property `widgetTemplate_p2p-preferences` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

