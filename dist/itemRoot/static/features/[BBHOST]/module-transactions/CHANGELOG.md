### `v3.1.0 - 07/09/2016`
* LF-1150: Remove theme styles from module css
* NGUSEOLB-2215: Add unit tests for lpTransactions#loadMoreTransactions
* Correct typo
* Remove another comment
* Remove comment
* Modify the transaction input size for smaller screen sizes

### `v3.0.9 - 05/04/2016`
* LF-949: Fixed margin-left for search panel

### `v3.0.8 - 25/02/2016`
* Clean up !important keywords.

### `v3.0.7 - 02/02/2016`
* NGUSEOLB-1507: Fix ofx format param url to download export file

### v3.0.6 - `26/01/2016, 4:26pm`
* NOJIRA: fix typo

### v3.0.5 - `20/01/2016, 11:08am`
* LF-792: Added showExportButton property to search directive

### v3.0.4 - `23/12/2015, 3:40pm`
* NOJIRA: add validation for undefined values in the transactions-charts directive  

### v3.0.3 - `18/12/2015, 3:50pm`
* NOJIRA: Use progress indicator in the transactions spendings directive  

### v3.0.2 - `16/12/2015, 3:34pm`
* LF-673: Specify version of ui on which useoptions depends on.  
* LF-673: Clean duplicate info in readme.  
* LF-673: Bump patch version.  
* LF-673: Modify dropdown-select to use 'options' instead of 'ng-options'.  

### v3.0.1 - `08/12/2015, 5:01pm`
* NGUSEOLB-998: Use progress indicator while loading transactions

### v3.0.0 - `08/12/2015, 1:27pm`
* NGUSEOLB-939: refactoring / cleanup lpModule usage in the module-transactions

### v2.10.1 - `01/12/2015, 2:47pm`
* NGUSEOLB-810: retrieve category from the list instead of endpoint

### v2.10.0 - `25/11/2015, 11:32am`
* NGUSEOLB-843: Add lpResponsiveCallback directive

### v2.9.1 - `23/11/2015, 2:23pm`
* NGUSEOLB-783: Add scope digest to fix view update

### v2.9.0 - `19/11/2015, 5:46pm`
* NGUSEOLB-783: move transactions categories toggle to the search component

### v2.8.10 - `30/10/2015, 2:35pm`
* NGUSEOLB-746: Use custom radio buttons

### v2.8.9 - `22/10/2015, 5:01pm`
* NGUSEOLB-713: fix button overflow issue on small screen

### v2.8.8 - `21/10/2015, 3:52pm`
* NGUSEOLB-712: fix accountHolds endpoint validation

### v2.8.7 - `20/10/2015, 3:02pm`
* NGUSEOLB-626: update search directive template and styling

### v2.8.6 - `20/10/2015, 2:21pm`
* NGUSEMB-594 Fix directive for ie8

### v2.8.5 - `15/10/2015, 2:16pm`
* Minify code.
* Remove unneeded jquery code to made the code run faster.
* Improve the code to do it less prone to fail in some cases.
* Improve the code to do it less prone to fail in some cases.
* Improve the detection of the height of sticky headers
* Improve performance of sticky headers.
* Add directive to add sticky titles for transactions when we want them to group the transactions by date.

### v2.8.4 - `14/10/2015, 3:59pm`
* Improve performance of sticky headers.
* Add directive to add sticky titles for transactions when we want them to group the transactions by date.

### v2.8.3 - `12/10/2015, 4:40pm`
* Add directive to add sticky titles for transactions when we want them to group the transactions by date.

### v2.8.2 - `09/10/2015, 12:18pm`
* NGUSEOLB-627: move format param to queryParams object
* NGUSEOLB-627: update transaction export link

### v2.8.1 - `08/10/2015, 5:25pm`
* NGUSEOLB-627: Fix replace all account ids
* NGUSEOLB-627: Fix export link for all accounts

### v2.8.0 - `23/09/2015, 4:00pm`
* NGUSEOLB-508: Fix styles
* NGUSEOLB-508: Refactor transactions query params. Method to download csv/oxf files
* NGUSEOLB-508: Show modal when clicking export button
* NGUSEOLB-508: Add modal export template
* NGUSEOLB-508: Add a button to export transactions in csv format

### v2.7.16 - `30/09/2015, 3:13pm`
* -fixing IE8 directives issue (transclude directive on svg elements not works)

### v2.7.15 - `31/08/2015, 3:45pm`
* NGUSEMB-440 Fix layout of transactions list on tablets


### v2.7.14 - `03/09/2015, 3:33pm`
* LF-132: Added resolvePath and templateUrl option in list template


### v2.7.13 - `26/08/2015, 3:07pm`
* LF-251  Added single watch for lpAccounts selected. Fixed donut chat first time rendering.


### v2.7.12 - `26/08/2015, 2:57pm`
#### add tag to info.json for styleguide filtering
* add tag to info.json for styleguide menu filtering


### v2.7.11 - `21/08/2015, 11:20am`
* LF-222 Fix transaction charts - first time select. Added single watch for lpAccounts.selected.


### v2.7.10 - `20/08/2015, 3:50pm`
* NGUSEOLB-350 Optimize element-resize using
* NGUSEOLB-349 Optimize transactions list performance


### v2.7.8 - `13/08/2015, 12:15pm`
* NGUSEMB-355 Fix category swipe on mobile


### v2.7.7 - `11/08/2015, 5:41pm`
#### Fix model.xml format.
* LF-211: Add model.xml for feature definition.


### v2.7.6 - `11/08/2015, 1:38pm`
#### Add model.xml for feature definition.


### v2.7.5 - `10/08/2015, 6:05pm`
#### Remove repository from bower.json


### v2.7.4 - `10/08/2015, 5:16pm`
* LF-162: Add missing ngInject.


### v2.7.3 - `07/08/2015, 3:17pm`
* NGUSEMB-304 Fix auto-scrolling to submit button when a user selects a category

### v2.7.2 - `06/08/2015, 12:35pm`
* Add distribution file.
* Add Transactions currency

### v2.7.1 - `06/08/2015, 10:42am`
* bugfix/LPMAINT-2-clone-transaction-widget-the-allow - missed errorCode property cleanup is added

### v2.7.0 - `06/08/2015, 1:19pm`
#### Include module-transactions CSS in JS.

### v2.6.1 - `31/07/2015, 11:38am`
* NGUSEOLB-129: Change the transactions details layout
* NGUSEOLB-129: Add spinner while loading transaction details

### v2.6.0 - `30/07/2015, 4:46pm`
#### Rename bower component to module-transactions.

## [2.5.3]
* Added additional css class names into html for styling

### v2.5.2 - `23/07/2015, 5:05pm`
* NGUSEOLB-33: fix eslint errors
* NGUSEOLB-33: update ui after create/delete a category

### v2.5.1
* NGUSEMB-261: Fix date duplicates

### v2.5.0
* Add `showCategoriesToggle` attribute for transactions-list component

### v2.4.0
* Improve transactions search UX in sort component

### v2.3.8
* Fix show transaction icons
* Fix spendings chart when more than one instance in the same page

### v2.3.6
* NGUSEOLB-183: Fix turnovers withdraw attribute check

### v1.0.0
* Initial release
