# Profile Summary
Displays information about the currently logged in user. Additionally, it can also provide the ability to navigate to the profile details view and to logout.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-profile-summary |  2.4.9 |  Universal |

## Dependencies

- base ^2.9.2
- core ^2.13.0
- ui ^2.9.1
- module-users ^2.8.2

## Dev Dependencies

- angular-mocks ~1.2.28
- theme ^4.1.1
- theme-default ^1.0.10
- requirejs ~2.1.20
- mock ^1.0.5
- config ^3.5.0

## Preferences

- **profileLink**: The URL for the user profile
- **preferenceService**: The end-point URL to save the user preferences
- **lastLoginDateTimeShow**: Show/hide last login datetime
- **lastLoginDateTimeHideAfter**: Hide last login datetime after n seconds, if 0 it will show always
- **profileImgSize**: Size of the profile image
- **profileImgBg**: Background color of the default profile image

## Events
*This widget does not subscribe/publish to any events.*

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
