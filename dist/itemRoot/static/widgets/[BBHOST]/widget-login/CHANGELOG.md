### `v2.2.8 - 18/08/2016`
* LPMAINT-243: Add redirect param to widget; Add redirect param to login request if presents

### `v2.2.7 - 31/03/2016`
* LF-865 - Small tidy up across the widgets' README files
* LF-628: default theme is replaced

### v2.2.6 - `25/11/2015, 1:32pm`
* use template, fix standalone  

### v2.2.5 - `05/11/2015, 2:04pm`
* LPMAINT-60: fix simple login wiget  

### v2.2.4 - `25/08/2015, 10:41pm`
#### add tag into info.json for styleguide filtering  
* add tag for styleguide menu filtering  


### v2.2.3 - `10/08/2015, 5:59pm`
#### Remove repository from bower.json  


### v2.2.2 - `05/08/2015, 2:30pm`
* Changing the POST header content type back to url form encoded from JSON - not sure why it was changed because CXP manager is not expecting JSON and it always fails.  
* Pulling Master  
* Removing hard coded locale - I copied this from another widget but clearly this is wrong  
* Using i18n message bundle for wrong credentials error  
* Handling an error returned from the login service  


### v2.2.1 - `29/07/2015, 6:29pm`
* Fix reference to chrome in model.xml  
* LF-156: Clean up model.xml for 5.6 compatability.  
* LPES-3938: disable eslint camelcase.  
* LPES-3938 move login service  


### v2.2.0 - `29/07/2015, 5:39pm`
#### Update model.xml for CXP 5.6 compatibility  
* LF-156: Clean up model.xml for 5.6 compatability.  
* LPES-3938: disable eslint camelcase.  
* LPES-3938 move login service  


## [2.0.0] - 2015-05-12 (note: generated from git logs)

 - Update bower.json to be in-line with other widgets.
