# Login Multifactor
Provides the ability to login using both simple authentication or 2-step authentication. The second step of the authentication is based on TOTP. Optionally, it also allows the user to register the device where he/she is accessing the application.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-login-multifactor |  2.1.11 |  Universal |

## Dependencies

- base 2.x
- core 2.x
- ui 2.x
- module-users 2.x

## Dev Dependencies

- config 2.x
- theme 2.x
- angular-mocks ~1.2.28

## Preferences

- **initiateEndPoint**: Initiate Session URL
- **otpEndPoint**: OTP URL
- **prefixSessionUrl**: Prefix path for Session URL
- **reloadOnSuccess**: Reload page on success

## Events
*This widget does not publish or subscribe to any events.*

