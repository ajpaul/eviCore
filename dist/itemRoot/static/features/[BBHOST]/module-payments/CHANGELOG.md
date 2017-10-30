### `v2.6.10 - 11/01/2017`

### `v2.6.9 - 07/09/2016`
* LF-1150: Remove theme styles from module css
* Fix broken tests
* LF-1037: Fixed custom validation in email transfer

### `v2.6.8 - 12/07/2016`
* LF-1037: Fixed custom validation in email transfer

### `v2.6.7 - 22/02/2016`
* LF-801 - Change the title tag
* Fix the reference to the module components

### `v2.6.6 - 10/02/2016`
* NGUSEOLB-1465: Fix external validation handling in otp-check

### `v2.6.5 - 10/02/2016`
* NGUSEOLB-1465: Add new params to otp-check component

### v2.6.4 - `27/01/2016, 12:29pm`
* NGUSEOLB-1229: Propagate endOptions  

### v2.6.3 - `13/01/2016, 12:20pm`
* NGUSEOLB-1228 Allow to pass frequencies  

### v2.6.2 - `07/01/2016, 4:35pm`
#### Add field reset functionality  

### v2.6.1 - `07/01/2016, 1:52pm`
#### Use generic event names  
* NGUSEOLB-1166: Use generic event names

### v2.6.0 - `06/01/2016, 11:07am`
#### Move OTP component to module  
* NGUSEOLB-1166: moved component to module-payments 

### v2.5.1 - `16/12/2015, 3:29pm`
* LF-672: Specify version of ui on which useoptions depends on.  
* LF-672: Clean duplicate info from readme.  
* LF-672: Bump patch version.  
* LF-672: Modify dropdown-select to use options instead of 'ng-options'.  

### v2.5.0 - `15/12/2015, 10:43am`
#### Add OTP verification functionality
* NGUSEOLB-482: Add unit tests
* NGUSEOLB-482: decorate OTP check response
* NGUSEOLB-482: Add OTP channel selection endpoint handler

### v2.4.0 - `04/11/2015, 4:19pm`
* NGUSEOLB-747: Use custom checkbox

### v2.3.0 - `18/10/2015, 8:37pm`
* NGUSEOLB-469: Add lp-amount-input component

### v2.2.4 - `12/10/2015, 2:26pm`
* remove underscore from _deprecated and _migration

### v2.2.3 - `24/09/2015, 3:38pm`
* LF-363-use-migrated-lpuserdetails-in-module-payments

### v2.2.2 - `26/08/2015, 5:20pm`
* add tag to info.json for styleguide menu filtering
* bugfix/LF-241-new-transfer-widget-all-the-accounts: - window.lp.util is replaced by lpCoreUtils & lpUIUtils - ui dependency is added (for lpUIUtils)
* Revert "LF-225: Added module-users, ui dependences. Fixed counter-party-filter getProfileImageByName method."


### v2.2.1 - `26/08/2015, 2:57pm`
#### add tag to info.json for styleguide filtering
* add tag to info.json for styleguide menu filtering
* Revert "LF-225: Added module-users, ui dependences. Fixed counter-party-filter getProfileImageByName method."


### v2.2.0 - `18/08/2015, 11:24am`
* NGUSEOLB-343: Remove unused lp.util and disable linting in deprecated files
* NGUSEOLB-343: Move Scheduled Date Calculator unit tests to separate file
* NGUSEOLB-343: Refractor Scheduled Date Calculator factory
* NGUSEOLB-343: Move old ST directive to deprecated folder
* NGUSEOLB-343: Migrate ScheduledDateCalculator factory
* NGUSEOLB-343: Create Scheduled Transfer component


### v2.1.0 - `12/08/2015, 4:02pm`
* NGUSEOLB-326: add unit tests
* NGUSEOLB-326: create new payment provider and service


### v2.0.6 - `12/08/2015, 1:16pm`
#### Clean up window.lp.util usage.
* LF-211: Fix model.xml format.


### v2.0.5 - `11/08/2015, 5:41pm`
#### Fix model.xml format.
* LF-211: Add model.xml for feature definition.


### v2.0.4 - `11/08/2015, 1:38pm`
#### Add model.xml for feature definition.


### v2.0.3 - `10/08/2015, 6:05pm`
#### Remove repository from bower.json


## [2.0.0] - 2015-05-12 (note: generated from git logs)

 - LPES-3664: disable currency selection issue
 - Merge from master
 - LPES-3539: no IBAN issue
 - LPES-3539: revert data changes
 - LPES-3539: filling issue - 3
 - LPES-3539: filling issue - 2
 - LPES-3539: filling issue
 - Add setConfig & get Config to provider API
 - EBANK-217 Move EndOn under payment.scheduledTransfer
 - LPES-3539: del edit
 - EBANK-234 Add endOn field to paymentOrder to be able to use selected value
 - EBANK-234 Remove scope as it breaks existing component usages
 - EBANK-238 Remove unneeded comma
 - EBANK-234 Add ability to pass in custom frequency and end options lists to a component
