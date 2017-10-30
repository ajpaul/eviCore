# Advanced Navbar
Offers an integrated navigation pattern, when combined with the Launcher container.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-navbar-advanced |  3.3.0 |  Universal |

## Dependencies

- base 2.x.x
- core 2.x.x
- ui ^2.11.0
- module-users ^2.14.1

## Dev Dependencies

- angular-mocks ~1.2.28
- mock ^1.0.0
- theme-default ~1.0.11
- config ~2.0.9

## Preferences

- **containerType**: Container type selector (options: fixed or fluid)
- **launcherIcon**: Icon for Launcher menu.
- **logoURL**: The URL for the logo.
- **mobileLogoURL**: The URL for the mobile logo.
- **navDepth**: Defines how many levels of nested links to resolve.
- **showParent**: Show navigation root.
- **navRoot**: The portal root to display the nav links from.
- **navShow**: Show or hide the navbar.
- **navSticky**: Set the navbar sticky.
- **navigationIconAnimationHook**: Navigation menu icon animation hook.
- **scrollSetting**: Page scroll settings.
- **showNotificationsBadge**: Show notifications badges inside the launcher toggle.
- **showPageTitle**: Show page title.
- **navTemplate**: Template.
- **showProfileInfo**: Show or hide logged in used profile image and along with sign out button..
- **preferenceService**: The end-point URL to save the user preferences.
- **profileImgBg**: Background color of the default profile image.
- **signinLink**: Sign in URL. If not empty, there will be Sign-in button in the navbar for not-authenticated user.

Get widget preference `widget.getPreference(string)`

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad-retail.activeContextChanged** - When this message is received, the widget updates the active context

The following is a list of pub/sub event which the widget publishes to:


- **launchpad-retail.stickyNavBar** - Published if preference `navSticky` was selected
- **launchpad-retail.offsetTopCorrection** - Published the size of the widget is updated
Arguments: `{ isStatic: isStatic, offsetTopCorrection: $scope.elementHeight }`
- **launchpad-retail.toggleLauncherMenu** - Published when the launcher menu is toggled (open or close)

## Templates
Widget uses templates with the following keys:


- profile-info - Profile information navigation item template. Includes username, profile link and sign-out button.

To redefine template create preference with this format: widgetTemplate_{templateKey}.

For example, for default layout template create property `widgetTemplate_profile-info` with the value equal to a path to load template from. The path can either be local relative path or external absolute path (http:// and https:// protocols).

