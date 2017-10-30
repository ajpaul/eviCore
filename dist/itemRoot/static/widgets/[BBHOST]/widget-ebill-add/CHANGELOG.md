### `v3.1.0 - 07/09/2016`
* LF-1150: Remove theme styles from widget css

### `v3.0.11 - 04/04/2016`
* NGUSEOLB-1566: Remove open dashboard buttton after payment

### `v3.0.10 - 04/04/2016`
* NGUSEOLB-1566: Remove open dashboard button

### `v3.0.9 - 31/03/2016`
* NGUSEOLB-2267: Remove account identifier from accounts list
* NGUSEOLB-2267: Fix account name in account dropdown
* NGUSEOLB-2267: Fix default selection for account dropdown

### `v3.0.8 - 31/03/2016`
* LF-906: adding collections tags

### `v3.0.7 - 30/03/2016`
* Notify a new payee added

### `v3.0.6 - 29/03/2016`
* Fix error messages view

### `v3.0.5 - 22/03/2016`
* Fix check for ebillsStatus when no biller is selected

### `v3.0.4 - 22/03/2016`
* Use top billers when no search value

### v3.0.3 - `19/02/2016, 10:12am`
* NGUSEOLB-1652 Use lp-i18n directive instead of filter  

### v3.0.2 - `18/02/2016, 4:48pm`
* NGUSEOLB-1652 Fix ebill error display  

### v3.0.1 - `17/02/2016, 2:01pm`
* NGUSEOLB-1654 Zip code can contain slashes  

### v3.0.0 - `29/01/2016, 2:16pm`
* NGUSEOLB-1439: Use v1/instant-payment-orders for payments  

### v2.3.5 - `20/01/2016, 12:24pm`
* LF-790: Clean up duplicated ngController directive.

### v2.3.4 - `28/12/2015, 2:22pm`
* NGUSEOLB-1090 Show error if list of billers fails to load

### v2.3.3 - `22/12/2015, 2:18pm`
* NGUSEOLB-284 adjust to lp-ebill-setup-view directive changes

### v2.3.2 - `16/12/2015, 2:19pm`
* LF-666: Update dropwodn-select fromn 'ng-options' to 'options'.

### v2.3.1 - `15/12/2015, 11:48pm`
* NGUSEOLB-86 Fix message display that ebills are enabled

### v2.3.0 - `15/12/2015, 1:56pm`
* NGUSEOLB-86 Change theme dependency to theme-default
* NGUSEOLB-86 Fix stylesheet link in index.dev.html
* NGUSEOLB-86 Repace EBill flow with lp-ebill-setup-view

### v2.2.0 - `18/11/2015, 1:38pm`
* NGUSEMB-630: display-numeric-keyboard-for-zip-code-field updated type to number

### v2.1.6 - `05/10/2015, 5:06pm`
* LF-384: Changed directive to lp-credential-input

### v2.1.5 - `30/09/2015, 3:05pm`
* LPMAINT-35: fix lp-template for ie8
* - lazy loaded Angular custom directives are broken in IE8
* Fix the index.dev.html. Fix a problem when there is no error that was breaking the widget. Change the styles to add space in the payment form between the description text-area and the buttons.

### v2.1.4 - `25/08/2015, 10:41pm`
#### add tag into info.json for styleguide filtering
* add tag for styleguide menu filtering


### v2.1.3 - `20/08/2015, 3:37pm`
* Add cxp.item.loaded event Build dist assets
* Add cxp.item.loaded event


### v2.1.2 - `10/08/2015, 5:59pm`
#### Remove repository from bower.json


### v2.1.1 - `29/07/2015, 6:29pm`
* Fix reference to chrome in model.xml
* LF-156: Clean up model.xml for 5.6 compatability.
* Add cxp.item.loaded pubsub event


### v2.1.0 - `29/07/2015, 5:39pm`
#### Update model.xml for CXP 5.6 compatibility
* LF-156: Clean up model.xml for 5.6 compatability.
* Add cxp.item.loaded pubsub event


### v 1.0.0
* Initial release
## [2.0.0] - 2015-05-12 (note: generated from git logs)

 - LPES-3657: i18n: added sk-SK
 - use lpWidget
 - EBANK-217 Fix styles for standalone widgets
 - EBANK-217 Update README with new config endpoints and dependencies
 - EBANK-217 Remove unexisting stylesheets
 - EBANK-231 Support scheduled transfer until cancelation - Move components to ebilling module - Show delivery date estimate - Add icon
 - EBANK-229 Add success processed payment screen - Merge urgent and normal payment functions - Add payment memo text field - Move add payee success screen to e-billing wizard step - Indentation fix
 - EBANK-234 Extend scheduled-transfer component to support custom frequency and end option lists
 - EBANK-218 Display estimated delivery date
 - EABNK-218 Urgent transfer improvements and add business days calendar endpoint
 - EBANK-227 Add Urgent transfer support
 - EBANK-230 Display errors returned by the payment service
 - EBANK-227 Use module-billing to display amount values.
 - EBANK-218 Create Payment box components. Add 4th wizard step to setup payments
 - EBANK-217 Fix for translation and api resources
 - EBANK-217 Initial incomplete pay component version
