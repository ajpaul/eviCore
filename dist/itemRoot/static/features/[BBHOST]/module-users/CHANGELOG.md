### `v2.14.3 - 10/02/2016`
* change href=# to class cursor-pointer

### `v2.14.2 - 29/01/2016`
* LF-814: Vertically align initials on the profile image.

### v2.14.1 - `22/01/2016, 2:29pm`
* LF-773 Changed the typo in details.js, now works with the party demo service and displays profile picture in widget-profile-details again

### v2.14.0 - `20/01/2016, 6:10pm`
* Removed throwing exception from sendOTP method
* Remove resendOTP method
* Add tests for authentication.js
* Move auth tests to authentication.spec.js
* Add unit tests lpUserSettings#sendRequest

### v2.13.1 - `18/01/2016, 5:32pm`
* Set delivery method before sending to server

### v2.13.0 - `15/01/2016, 5:26pm`
* NGUSEOLB-1279: Store delivery method to use after

### v2.12.2 - `15/01/2016, 12:13pm`
* NGUSEOLB-1188: Update signature of `initiate` method

### v2.12.1 - `14/01/2016, 6:16pm`
* NGUSEOLB-1188: Add sendOTP method

### v2.12.0 - `12/01/2016, 1:45pm`
* NGUSEOLB-1148: Fix send parameters in resendOTP method
* NGUSEOLB-1148: Add resendOTP method

### v2.11.1 - `11/01/2016, 4:42pm`
* Add `PasswordChangeRequired` status

### v2.11.0 - `06/01/2016, 5:11pm`
* NGUSEOLB-1188: Add channel-selector component

### v2.10.0 - `23/12/2015, 1:19pm`
* NGUSEOLB-1100: Add endpoints API for Forgot Password widget

### v2.9.5 - `04/12/2015, 4:48pm`
* LPMAINT-100 successView is now first priority instead of default landing page

### v2.9.4 - `25/11/2015, 10:57am`
* NGUSEMB-625: Display numeric keyboard when OTP field is selected implemented

### v2.9.3 - `23/11/2015, 2:34pm`
* NGUSEOLB-783: move subscribers to the uppes scope to fix cross widget communication

### v2.9.2 - `20/11/2015, 11:49am`
* NGUSEOLB-857: Hide not supported country in corelation

### v2.9.1 - `20/11/2015, 11:14am`
* NGUSEOLB-783: replace calling  as a constructor with deferred call

### v2.9.0 - `19/11/2015, 5:06pm`
* NGUSEOLB-783: add getPrefs() method with memoization being used instead of .get()

### v2.8.2 - `22/10/2015, 2:22pm`
* center text within canvas image

### v2.8.1 - `16/10/2015, 11:47am`
* Remove http interceptor, 400 error handled in core module

### v2.8.0 - `16/10/2015, 9:26am`
* NGUSEOLB-623: Add countries and us states data

### v2.7.0 - `14/10/2015, 12:29pm`
* NGUSEOLB-596: Add location addresses service

### v2.6.3 - `09/10/2015, 2:35pm`
* NGUSEOLB-305: Fix body params when changing password

### v2.6.2 - `08/10/2015, 2:41pm`
* NGUSEOLB-557: Fix save contacts method

### v2.6.1 - `07/10/2015, 5:50pm`
* NGUSEOLB-556: Fix locations service data sent
* NGUSEOLB-556: use default location url
* NGUSEOLB-556: Add locations service

### v2.6.0 - `06/10/2015, 4:20pm`
* NGUSEOLB-556: use default location url
* NGUSEOLB-556: Add locations service

### v2.5.2 - `05/10/2015, 12:36pm`
* Incorrect README merge fixed.
* Rebuild after merge.
* Update dependency versions.
* LF-358 New lpUsersPreference service (migrated from core).

### v2.5.1 - `29/09/2015, 3:36pm`
* LF-370: removed jquery.param to lpCoreUtils.buildQueryString
* LF-370: moved jquery param fn
* LF-370: Added put method with custom url as an argument

### v2.5.0 - `29/09/2015, 11:30am`
* NGUSEOLB-305: Add change password service

### v2.5.0 - `24/09/2015, 1:36pm`
#### New lpUsersPreference service.


### v2.4.2 - `23/09/2015, 9:27am`
* NOJIRA: Undo last commit, no need param in verifyOTP service

### v2.4.1 - `22/09/2015, 3:05pm`
* Add default deliveryMethod param to resendOTP endpoint

### v2.4.0 - `22/09/2015, 2:43pm`
* Add delivery method to resend OTP code

### v2.3.0 - `18/09/2015, 3:36pm`
* NGUSEOLB-503 Add error message for too many active sesions


### v2.2.8 - `26/08/2015, 2:57pm`
#### add tag to info.json for styleguide filtering
* add tag to info.json for styleguide menu filtering


### v2.2.7 - `24/08/2015, 11:24am`
* LF-183 fix a bug where the logout API call did a get but a POST is now required in CXP.


### v2.2.6 - `11/08/2015, 5:41pm`
#### Fix model.xml format.
* LF-211: Add model.xml for feature definition.


### v2.2.5 - `11/08/2015, 1:38pm`
#### Add model.xml for feature definition.


### v2.2.4 - `10/08/2015, 6:05pm`
#### Remove repository from bower.json


### v 1.0.0
* Initial release
## [2.0.0] - 2015-05-12 (note: generated from git logs)

 - LPES-3536: Remove unused locationProvider.
 - NOJIRA: add 403 error when security risk in otp login
 - LPES-3568: handle disconnections and show nice 500 error message
 - Added testing for isVerified on authentication API.
 - Change status check functions to be case insensitive.
 - remove console
 - use dist
 - add setConfig and getConfig in API
 - ignore .bower.json

## 2.2.2
- Make page reload optional
