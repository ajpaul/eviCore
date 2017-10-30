### `v2.13.5 - 06/09/2016`
* LF-1150: Remove theme styles from widget css

### `v2.13.4 - 24/02/2016`
* LF-805: Cleanup !important keyword.

### `v2.13.3 - 28/01/2016`
* NGUSEOLB-1137: Add method to update single account data

### v2.13.2 - `14/01/2016, 11:10am`
* NGUSEOLB-1224: recompile dist with embeded css

### v2.13.1 - `13/01/2016, 2:59pm`
* NGUSEOLB-1191: Fix unit tests

### v2.13.0 - `11/01/2016, 6:24pm`
* NGUSEOLB-1218: add reused lpAccountsModel for handling selected account by accounts and transactions widgets
* LF-603 tagged as launchpad-feature

### v2.12.0 - `22/12/2015, 1:33pm`
* NGUSEOLB-939: refactoring of module-accounts - move api to the separate file  

### v2.11.3 - `16/12/2015, 2:24pm`
* LF-671: Specify version of ui on which useoptions depends on.  
* LF-671: Clean duplicate info inreadme.  
* LP-671: Correct changelog.  
* LF-671: Modify from 'ng-options' to 'options' and bump minor.  

### v2.11.2 - `15/12/2015, 10:21am`
* NGUSEOLB-1039: add validation for preconfigured accountsEndpoint

### v2.11.1 - `02/12/2015, 11:12am`
* NGUSEOLB-935: Expose util isExternal method
* NGUSEOLB-935: Extract normaliser method to its own file

### v2.11.0 - `19/11/2015, 12:52pm`
* NGUSEOLB-820: Fix simple account select arrow behaviour
* NGUSEOLB-736: Add heading to the list in simple account select
* NGUSEOLB-291: Add custom event to simple account select (onSelect)

### v2.10.0 - `11/11/2015, 2:01pm`
* NGUSEOLB-733: Add more information to display in account selector

### v2.9.0 - `04/11/2015, 12:33pm`
* NGUSEOLB-747: Use custom checkbox ui component

### v2.8.2 - `03/11/2015, 8:44am`
* NGUSEOLB-457: Update component to support data returned by new endpoints

### v2.8.1 - `02/11/2015, 11:41am`
* NGUSEOLB-746: Use custom radio in credentail input component
* fix build issue

### v2.8.0 - `22/10/2015, 6:24pm`
* NGUSEOLB-479: Add currency and amount formatting directives
* NGUSEOLB-479: cleanup
* NGUSEOLB-479: add unit tests
* NGUSEOLB-479: Update demo page
* NGUSEOLB-479: adjust styles, add caret
* NGUSEOLB-479: add dropdown directive, fix desktop behaviour
* NGUSEOLB-479: Add simple-account-select component

### v2.7.1 - `19/10/2015, 5:11pm`
* Update ui dependency version

### v2.7.0 - `07/10/2015, 4:55pm`
#### NGUSEOLB-587: add read account details call

### v2.6.3 - `06/10/2015, 12:01pm`
* LF-385: moved financial institute model to deprecated

### v2.6.2 - `06/10/2015, 10:22am`
* LF-386: Moved format-amount directive to module's components

### v2.6.1 - `06/10/2015, 9:55am`
* LF-384: Moved dynamic-credential-input directive to components

### v2.6.0 - `25/08/2015, 12:31pm`
* NGUSEOLB-19: Add TODO comments to unimplemented methods in service
* NGUSEOLB-19: Fix semver ^ in bower
* NGUSEOLB-19: Add account service to change the alias

### v2.5.5 - `01/10/2015, 12:18pm`
* LF-382 deprecate cards model
* LF-383 remove demo html/js

### v2.5.4 - `30/09/2015, 4:13pm`
* LF-381 deprecate assetsModel

### v2.5.3 - `30/09/2015, 2:19pm`
* LF-380 remove accounts-chart-model
* NGUSEOLB-329 Fix code review issues
* NGUSEOLB-329 Improve filtering
* NGUSEOLB-329 Change break to continue
* NGUSEOLB-329 Check visibility flag for the account

### v2.5.2 - `26/08/2015, 2:57pm`
#### add tag to info.json for styleguide filtering
* add tag to info.json for styleguide menu filtering
>>>>>>> origin/master

### v2.5.2 - `26/08/2015, 2:57pm`
#### add tag to info.json for styleguide filtering
* add tag to info.json for styleguide menu filtering

### v2.5.1 - `21/08/2015, 2:42pm`
* LF-240: Fixed default locale for accounts id - added localeMap check


### v2.5.0 - `12/08/2015, 4:42pm`
* NGUSEOLB-231: Update unit tests
* NGUSEOLB-231: Add payee (credit) account select component


### v2.4.3 - `11/08/2015, 5:41pm`
#### Fix model.xml format.
* LF-211: Add model.xml for feature definition.


### v2.4.2 - `11/08/2015, 1:38pm`
#### Add model.xml for feature definition.


### v2.4.1 - `10/08/2015, 6:05pm`
#### Remove repository from bower.json


## [2.4.0]
 - Added possibility to select an account programmatically

## [2.3.1]
 - Added span wrapper around decimals in the amount for styling

## [2.3.0]
 - Added new preference to account select: customFields (previously pulled from widget preference).
 - Made compatible with sourcejs.

## [2.0.0] - 2015-05-12 (note: generated from git logs)

 - LPES-3670: locale BBAN en-US
 - LPES-3637: get page preference
 - LPES-3637: bubbling properties getter
 - LPES-3637: account masking in dropdown
 - LPES-3556: added the dist.
 - LPES-3556: Fixes a potential bug with assets load function being resolved too quickly.
