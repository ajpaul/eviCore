### `v2.11.3 - 31/05/2016`
* LF-1013: Added selectDefaultAccount preference to widget; Changed init select account behavior

### `v2.11.2 - 31/03/2016`

### `v2.11.1 - 22/03/2016`
* LF-832: Tiles are broken in Safari.
* LF-865 - Small tidy up across the widgets' README files
* Added element in config PO
* Update test
* Add test documentation
* add all finance button
* Fixed PO for e2e tests
* LF-628: default theme is replaced
* DA-115 Widget accounts test

### v2.11.0 - `26/01/2016, 3:05pm`
* NGUSEOLB-1428: Set first account as default

### v2.10.0 - `22/01/2016, 3:14pm`
* NGUSEOLB-1372: Open the group of the default account when login
* NGUSEOLB-1372: Remove empty accounts groups and open first group by default
* NGUSEOLB-1372: Set and store default account

### v2.9.2 - `19/01/2016, 3:37pm`
* LF-786: Corrected widget index.html structure to work properly in springboard.

### v2.9.1 - `15/01/2016, 10:52am`
* LF-763: Set show all finances false by default

### v2.9.0 - `13/01/2016, 2:58pm`
* NGUSEOLB-1191: Show last 4 digits of internal accounts

### v2.8.2 - `05/01/2016, 9:42am`
* LF-749: Accounts tiles layout made themable.  
* LF-749: Accounts tree layout made themable.  

### v2.8.1 - `28/12/2015, 5:33pm`
* NGUSEOLB-1106: Fix account select when grouped by internal/external Use minified built js file in index.html Readded removed hasExternalAccounts method to model Put again removed loading positioning styles  

### v2.8.0 - `21/12/2015, 11:41am`
#### Tiles and tree layouts added.  
* LF-632:
* Implementation of the tree view layout.
* Refactoring of the some parts of the widget.
* Added error handling.
* Implementation of the tiles view layout.
* Available and Booked label for accounts based on preference.
* Accessibility implemented for tree and tiles layouts.

### v2.7.3 - `09/12/2015, 9:45am`
* NGUSEOLB-998: Use progress indicator when loading accounts

### v2.7.2 - `04/12/2015, 2:17pm`
* NGUSEOLB-957: Hide external accounts group if empty

### v2.7.1 - `30/11/2015, 4:56pm`
* NGUSEOLB-925: Use accordion component when grouping by internal and external accounts  

### v2.7.0 - `30/11/2015, 11:01am`
* NGUSEOLB-873: Add all finances button  

### v2.6.0 - `26/11/2015, 11:49am`
* NGUSEOLB-872: Split accounts into internal and external  
* NGUSEOLB-872: Split main template into directives  

### v2.5.3 - `25/11/2015, 9:31am`
* NGUSEOLB-194: Iterate over objects with forOwn method  
* NGUSEOLB-194: Refactor controller  
* NGUSEOLB-194: Fix tests  

### v2.5.2 - `10/11/2015, 5:01pm`
* NGUSEOLB-780: Fix selected account  

### v2.5.1 - `29/10/2015, 2:45pm`
* NGUSEOLB-745: Fix standalone dev  

### v2.5.0 - `25/08/2015, 12:20pm`
* NGUSEOLB-19: Use utils.safeApply in async callbacks to update angular scope
* NGUSEOLB-19: Listen to account details update in other widgets

### v2.4.8 - `30/09/2015, 5:29pm`
* LF-381 migrate assetsModel

### v2.4.7 - `30/09/2015, 3:05pm`
* - lazy loaded Angular custom directives are broken in IE8

### v2.4.6 - `25/08/2015, 10:41pm`
#### add tag into info.json for styleguide filtering
* add tag for styleguide menu filtering


### v2.4.5 - `21/08/2015, 3:48pm`
* LF-237:Fix model.xml to show acc two separate panel bydefault


### v2.4.4 - `20/08/2015, 3:37pm`
* add theme as dev dependency
* Add less file and build dist assets
* Build dist assets
* Put back cxp.item.loaded in run method.
* Put back cxp.item.loaded in run method.
* Put back cxp.item.loaded in run method.


### v2.4.3 - `10/08/2015, 5:59pm`
#### Remove repository from bower.json


### v2.4.2 - `07/08/2015, 2:46pm`
#### Remove dependency on module-transactions as it's not needed.


### v2.4.1 - `29/07/2015, 6:28pm`
* Fix reference to chrome in model.xml
* LF-156: Clean up model.xml for 5.6 compatability.
* Add index dev page to develop the widget with data from api...


### v2.4.0 - `29/07/2015, 5:39pm`
#### Update model.xml for CXP 5.6 compatibility
* LF-156: Clean up model.xml for 5.6 compatability.
* Add index dev page to develop the widget with data from api...


### v 1.0.0
* Initial release

## [2.0.0] - 2015-05-12 (note: generated from git logs)

 - LPES-3657: i18n: added sk-SK
 - widget-instance replace
 - LPES-0000: nonexistent-account-groups

## [2.2.0] - 2015-07-24

 - Added `cxp.item.loaded` event

## [2.3.0] - 2015-07-24

 - Added `preferredBalanceView` preference
