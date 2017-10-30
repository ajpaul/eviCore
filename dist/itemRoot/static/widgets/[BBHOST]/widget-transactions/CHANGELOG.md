### `v3.11.5 - 03/08/2016`
* LF-1217: Fix enabling/disabling categories

### `v3.11.4 - 31/03/2016`
* LF-865 - Small tidy up across the widgets' README files
* Added element in config PO

### `v3.11.3 - 24/02/2016`
* LF-805: Cleanup !importan keyword.
* LF-628: default theme is replaced

### v3.11.2 - `20/01/2016, 11:11am`
* LF-792: Added showExportButton property to switch on/off export action in transactions search module directive

### v3.11.1 - `09/12/2015, 3:25pm`
* Updated template name in index.html  

### v3.11.0 - `08/12/2015, 3:54pm`
* NGUSEOLB-939: add configuration of the transactions module from the widget  

### v3.10.1 - `25/11/2015, 5:28pm`
* NGUSEOLB-843: make use of lpResponsiveCallback directive  

### v3.10.0 - `20/11/2015, 12:54pm`
* NGUSEOLB-783: update transaction widget to show categories toggle  
* Rename debit-accounts endpoint to accounts  
* remove module css  

### v3.9.2 - `20/10/2015, 12:15pm`
* NGUSEOLB-626: update transaction widget to fix search styling  

### v3.9.1 - `13/10/2015, 9:02am`
* Change sticky header property to false by default.  

### v3.9.0 - `07/10/2015, 4:03pm`
* NGUSEOLB-508: download export csv transactions on demand

### v3.8.2 - `06/10/2015, 3:10pm`
* NGUSEOLB-19: React on widget account details changes

### v3.8.0 - `24/09/2015, 2:48pm`
#### Use lpUsersPreference from module-users instead of PreferenceService.

### v3.7.4 - `30/09/2015, 6:09pm`
* Change showFooter by hideFooter to not break the previous behaviour on portal

### v3.7.3 - `30/09/2015, 5:49pm`

### v3.7.2 - `29/09/2015, 4:01pm`
* Show the tabs inside each transaction but without showing the tabs icon for mobile apps.
* Fix changes suggested in code review.
* Be able to remove the footer for mobile to use it from a native button Send the cxp.item.loaded event for mobile apps. Fix sticky header content styles. Change layout to put the search inside of the sticky header to be consistent with the behaviour.
* - lazy loaded Angular custom directives are broken in IE8

### v3.7.1 - `28/09/2015, 5:02pm`
* Be able to remove the footer for mobile to use it from a native button Send the cxp.item.loaded event for mobile apps. Fix sticky header content styles. Change layout to put the search inside of the sticky header to be consistent with the behaviour.

>>>>>>> origin/master
### v3.7.0 - `22/09/2015, 12:16pm`
#### LF-302: add stickyHeader preference to control fixed header
* LF-302: add stickyHeader preference to control fixed header, fix standalone version


### v3.6.7 - `04/09/2015, 11:00am`
Consistent name of the widget module (widget instead of widgets).

### v3.6.6 - `26/08/2015, 3:07pm`
* LF-251  Added single watch for lpAccounts selected. Fixed donut chat first time rendering.


### v3.6.5 - `25/08/2015, 10:42pm`
#### add tag into info.json for styleguide filtering
* add tag for styleguide menu filtering


>>>>>>> origin/master
### v3.6.4 - `20/08/2015, 4:40pm`
* LF-248:Fix model.xml to show charts bydefault

### v3.6.3 - `20/08/2015, 4:50pm`
* LF-249:Fix model.xml to show transaction icon bydefault

### v3.6.2 - `20/08/2015, 12:10pm`
* LF-235:Fix model.xml to show acc dropdown bydefault


### v3.6.1 - `10/08/2015, 5:59pm`
#### Remove repository from bower.json


### v3.6.0 - `06/08/2015, 10:15am`
* LF-162: Deprecate module-transactions-2.

### v3.5.1 - `06/08/2015, 10:15am`
* HOTFIX: Rebuild dist & bump.

### v3.5.0 - `30/07/2015, 4:21pm`

### v3.4.1 - `29/07/2015, 6:29pm`
* Fix reference to chrome in model.xml
* LF-156: Clean up model.xml for 5.6 compatability.

### v3.4.0 - `29/07/2015, 5:39pm`
#### Update model.xml for CXP 5.6 compatibility
* LF-156: Clean up model.xml for 5.6 compatability.

## [3.3.2]

 - Fix show transaction icons

## [2.0.0] - 2015-05-12 (note: generated from git logs)

 - LPES-3661: set latest transaction date as end date in charts
 - LPES-3657: i18n: added sk-SK
 - LPES-3653: fix transactions list responsive breakpoints
 - LPES-3650: Fallback for transaction row when name is empty
 - LPES-3649: make show categorization true by default
 - LPES-3644: update README
 - LPES-3638: update README
 - LPES-3638: show all dates preference - icons
 - LPES-3638: show all dates preference
 - LPES-3644_REMOVE_ICONS
 - LPES-3644: hide details preference
 - use lpWidget remove config, add media files in dist
 - NOJIRA: update README

## [1.0.0]

 - Initial release
