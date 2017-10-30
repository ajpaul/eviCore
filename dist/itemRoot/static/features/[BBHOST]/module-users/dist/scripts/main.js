/* Build with bb-lp-cli @ v1.6.0 */
!function(e,a){"object"==typeof exports&&"object"==typeof module?module.exports=a(require("base"),require("core")):"function"==typeof define&&define.amd?define(["base","core"],a):"object"==typeof exports?exports["module-users"]=a(require("base"),require("core")):e["module-users"]=a(e.base,e.core)}(this,function(e,a){return function(e){function a(o){if(n[o])return n[o].exports;var t=n[o]={exports:{},id:o,loaded:!1};return e[o].call(t.exports,t,t.exports,a),t.loaded=!0,t.exports}var n={};return a.m=e,a.c=n,a.p="",a(0)}([function(e,exports,a){var n;(function(e){n=function(require,exports,e){"use strict";e.name="module-user";var n=a(2),o=a(3),t=a(4),r=a(6),i=[o.name,t.name,r.name];e.exports=n.createModule(e.name,i).provider(a(8)).factory(a(9)).factory(a(12)).factory(a(13)).factory(a(14)).factory(a(15)).service(a(16)).directive(a(17))}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))}).call(exports,a(1)(e))},function(e,exports){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(a,exports){a.exports=e},function(e,exports){e.exports=a},function(e,exports,a){var n;(function(e){n=function(require,exports,e){"use strict";e.name="component.user-reset-password";var n=a(2),o=a(3),t=[o.name];e.exports=n.createModule(e.name,t).directive(a(5))}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))}).call(exports,a(1)(e))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";exports.lpResetPasswordLink=function(e){function a(a,n,o){var t=e(o.ngClick||"");a.fireOnClick=function(e){e.preventDefault(),e.stopPropagation(),t(a,{$event:e})}}function n(){return a}var o=['<a class="cursor-pointer" ng-click="fireOnClick($event)">','<small lp-i18n="Having trouble accessing your account?"></small>',"</a>"].join("");return{restricted:"A",template:o,compile:n}},exports.lpResetPasswordLink.$inject=["$parse"]}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;(function(e){n=function(require,exports,e){"use strict";var n=a(2);e.name="channel-selector",e.exports=n.createModule(e.name,[]).directive(a(7))}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))}).call(exports,a(1)(e))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";exports.lpUsersChannelSelector=function(e){return e.put("lpUsersChannelSelector.html",['<div class="channel-selector row">','    <div class="cell col-xs-12 col-sm-12 col-md-12 col-lg-12">','        <div lp-custom-radio="" class="custom-radio custom-radio-lg" ng-model="model" value="phone" name="numbers">','            <div class="radio-label">','                <div class="radio-label-main" lp-i18n="Use my mobile phone"></div>','                <div class="radio-label-small" lp-i18n="{{ phone }}"></div>',"            </div>","        </div>",'        <div lp-custom-radio="" class="custom-radio custom-radio-lg" ng-model="model" value="email" name="numbers">','            <div class="radio-label">','                <div class="radio-label-main" lp-i18n="Use my email"></div>','                <div class="radio-label-small" lp-i18n="{{ email }}"></div>',"            </div>","        </div>","    </div>","</div>"].join("")),{restrict:"EA",scope:{email:"@",model:"=ngModel",phone:"@"},template:e.get("lpUsersChannelSelector.html")}},exports.lpUsersChannelSelector.$inject=["$templateCache"]}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";var a=window,n={MISSING_USERNAME:"Please fill in your username",MISSING_PASSWORD:"Please fill in your password",MISSING_OTP:"You must provide otp code",CANNOT_AUTHENTICATE:"Sorry, we could not authenticate you with these credentials",MAX_ATTEMPTS_EXCEEDED:"Number of login attempts exceeded",ACCOUNT_BLOCKED:"Your account has been blocked",NOT_FOUND:"Resource not found",UNKNOWN_ERROR:"There was an error processing your request. Contact your administrator",DISCONNECTED:"Unable to connect. Please check your connection",FORBIDDEN:"Access has been denied due to security reasons",BAD_GATEWAY:"Bad gateway. Contact your administrator",SESSIONS_LIMIT_REACHED:"You already have an active session. Please close it before starting a new session"},o={UNKNOWN_ERROR:"UNKNOWN_ERROR",NOT_FOUND:"NOT_FOUND",BAD_REQUEST:"BAD_REQUEST",CANNOT_AUTHENTICATE:"CANNOT_AUTHENTICATE",MAX_ATTEMPTS_EXCEEDED:"MAX_ATTEMPTS_EXCEEDED",DISCONNECTED:"DISCONNECTED",FORBIDDEN:"FORBIDDEN",BAD_GATEWAY:"BAD_GATEWAY",SESSIONS_LIMIT_REACHED:"SESSIONS_LIMIT_REACHED"},t={INITIATED:"Initiated",PASSWORD_CHANGE_REQUIRED:"PasswordChangeRequired",VERIFIED:"Verified"},r={PHONE:"phone",EMAIL:"email"},i=r.PHONE;exports.lpUsersAuthentication=function(e){var c={},d=function(a){return!(e.isString(a)&&e.trim(a).length)},s=function(a){return!(e.isNumber(a)&&a)},m=function(a){if(!e.isObject(a))throw new Error("Argument `options` should be an object instead "+typeof a)},l=function(a){return function(n){e.extend(c,n.session),a.resolve(n)}},u={code:o.UNKNOWN_ERROR,message:n[o.UNKNOWN_ERROR]},p=function(e){var a,n,t=e.errors;return t&&t.length&&(a=t[0].code,a!==o.UNKNOWN_ERROR&&(n=t[0].message)),{code:a||u.code,message:n||u.message}},A=function(e){return function(a,t){var r;switch(t){case 0:r={code:o.DISCONNECTED,message:n[o.DISCONNECTED]};break;case 400:r={code:o.BAD_REQUEST,message:a.message};break;case 401:r={code:o.CANNOT_AUTHENTICATE,message:n[o.CANNOT_AUTHENTICATE]};break;case 403:r=a&&a[0]&&"OLB-403001"===a[0].code?{code:o.SESSIONS_LIMIT_REACHED,message:n[o.SESSIONS_LIMIT_REACHED]}:{code:o.FORBIDDEN,message:n[o.FORBIDDEN]};break;case 404:r={code:o.NOT_FOUND,message:n[o.NOT_FOUND]};break;case 502:r={code:o.BAD_GATEWAY,message:n[o.BAD_GATEWAY]};break;default:r=p(a)}e.reject(r)}},f={Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"};this.$get=function(u,h,S,M,I){var E=I.createException("lpUsersAuthenticationError"),g={ERROR_CODE:o},N={initiateEndPoint:"",sendOtpEndPoint:"",otpEndPoint:"",serverRootPath:"",portalName:"",pageName:"",reloadOnSuccess:!0};return g.getConfig=function(){return N},g.setConfig=function(a){return N=e(a).chain().mapValues(e.resolvePortalPlaceholders).defaults(N).value(),this},g.isInitiated=function(){return c.status&&c.status.toLowerCase()===t.INITIATED.toLowerCase()},g.isPasswordChangeRequired=function(){return c.status&&c.status.toLowerCase()===t.PASSWORD_CHANGE_REQUIRED.toLowerCase()},g.isVerified=function(){return c.status&&c.status.toLowerCase()===t.VERIFIED.toLowerCase()},g.initiate=function(a,o){var t,r=h.defer();return m(a),d(a.username)?t=n.MISSING_USERNAME:d(a.password)&&(t=n.MISSING_PASSWORD),t?r.reject(new Error(t)):u({method:"POST",url:N.initiateEndPoint,params:o,data:e.buildQueryString(a),headers:f}).success(l(r)).error(A(r)),r.promise},g.securityCheck=function(){var a=h.defer(),n={j_username:c.username,j_password:c.id,portal_name:N.portalName,page_name:N.pageName};return u({method:"POST",url:N.serverRootPath+"/j_spring_security_check?rd="+(new Date).getTime(),data:e.buildQueryString(n),headers:f}).success(l(a)).error(A(a)),a.promise},g.setDeliveryMethod=function(a){if(!e.includes(r,a)){var n=new E("Bad argument: `"+a+"`. It only accepts `email` or `phone`.");I.throwException(n)}i=a},g.sendOTP=function(){var a=h.defer();return u({method:"POST",url:N.sendOtpEndPoint.replace(":id",c.id),data:e.buildQueryString({deliveryMethod:i}),headers:f}).then(function(e){a.resolve(e.data)},function(e){401===e.status?a.reject({status:e.status,code:e.data.errors[0].code,message:e.data.errors[0].message}):A(a)(e,e.status)}),a.promise},g.verifyOTP=function(a){var o=h.defer();return m(a),s(a.otpCode)?o.reject(new Error(n.MISSING_OTP)):u({method:"POST",url:N.otpEndPoint.replace("{id}",c.id),data:e.buildQueryString({otp_code:a.otpCode}),headers:f}).success(l(o)).error(A(o)),o.promise},g.handleVerifiedResponse=function(a){var n=e.getPortalProperty("defaultLandingPage");if(0===S.location.protocol.indexOf("file:")&&(a.successView=null,n=null),e.isString(a.successView))S.location.replace(N.serverRootPath+a.successView);else{if(e.isString(n))return"/"!==n.charAt(0)&&(n="/"+n),void S.location.replace(N.serverRootPath+n);var o;o=0===S.location.protocol.indexOf("file:")?S.location.pathname.split("//")[0]+S.location.search+S.location.hash:S.location.href,N.reloadOnSuccess&&S.location.replace(o)}},g.logOut=function(){var e=M.root+"/j_spring_security_logout?portalName="+M.name,n=M.root+a.b$.portal.config.defaultLandingPage;return S.sessionStorage.clear(),u({method:"POST",url:e,headers:f}).then(function(e){var a=parseInt(e.status,10);if(a>=200&&300>a||304===a)S.location.replace(n);else{var o=new E(p(e).message);I.throwException(o)}})},g.MOCKABLE={session:c},g},this.$get.$inject=["$http","$q","$window","lpPortal","lpCoreError"]},exports.lpUsersAuthentication.$inject=["lpCoreUtils"]}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";var n=a(10),o=a(11);exports.lpUserPlaces=function(){return{regions:o,countries:n}}}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";return{AF:{code:"AF",name:"Afghanistan"},AX:{code:"AX",name:"Aland Islands"},AL:{code:"AL",name:"Albania"},DZ:{code:"DZ",name:"Algeria"},AS:{code:"AS",name:"American Samoa"},AD:{code:"AD",name:"Andorra"},AO:{code:"AO",name:"Angola"},AI:{code:"AI",name:"Anguilla"},AQ:{code:"AQ",name:"Antarctica"},AG:{code:"AG",name:"Antigua and Barbuda"},AR:{code:"AR",name:"Argentina"},AM:{code:"AM",name:"Armenia"},AW:{code:"AW",name:"Aruba"},AU:{code:"AU",name:"Australia"},AT:{code:"AT",name:"Austria"},AZ:{code:"AZ",name:"Azerbaijan"},BS:{code:"BS",name:"Bahamas"},BH:{code:"BH",name:"Bahrain"},BD:{code:"BD",name:"Bangladesh"},BB:{code:"BB",name:"Barbados"},BY:{code:"BY",name:"Belarus"},BE:{code:"BE",name:"Belgium"},BZ:{code:"BZ",name:"Belize"},BJ:{code:"BJ",name:"Benin"},BM:{code:"BM",name:"Bermuda"},BT:{code:"BT",name:"Bhutan"},BO:{code:"BO",name:"Bolivia, Plurinational State of"},BQ:{code:"BQ",name:"Bonaire, Saint Eustatius and Saba"},BA:{code:"BA",name:"Bosnia and Herzegovina"},BW:{code:"BW",name:"Botswana"},BV:{code:"BV",name:"Bouvet Island"},BR:{code:"BR",name:"Brazil"},IO:{code:"IO",name:"British Indian Ocean Territory"},BN:{code:"BN",name:"Brunei Darussalam"},BG:{code:"BG",name:"Bulgaria"},BF:{code:"BF",name:"Burkina Faso"},BI:{code:"BI",name:"Burundi"},KH:{code:"KH",name:"Cambodia"},CM:{code:"CM",name:"Cameroon"},CA:{code:"CA",name:"Canada"},CV:{code:"CV",name:"Cape Verde"},KY:{code:"KY",name:"Cayman Islands"},CF:{code:"CF",name:"Central African Republic"},TD:{code:"TD",name:"Chad"},CL:{code:"CL",name:"Chile"},CN:{code:"CN",name:"China"},CX:{code:"CX",name:"Christmas Island"},CC:{code:"CC",name:"Cocos (Keeling) Islands"},CO:{code:"CO",name:"Colombia"},KM:{code:"KM",name:"Comoros"},CG:{code:"CG",name:"Congo"},CD:{code:"CD",name:"Congo, The Democratic Republic of the"},CK:{code:"CK",name:"Cook Islands"},CR:{code:"CR",name:"Costa Rica"},CI:{code:"CI",name:"Cote d'Ivoire"},HR:{code:"HR",name:"Croatia"},CU:{code:"CU",name:"Cuba"},CW:{code:"CW",name:"Curacao"},CY:{code:"CY",name:"Cyprus"},CZ:{code:"CZ",name:"Czech Republic"},DK:{code:"DK",name:"Denmark"},DJ:{code:"DJ",name:"Djibouti"},DM:{code:"DM",name:"Dominica"},DO:{code:"DO",name:"Dominican Republic"},EC:{code:"EC",name:"Ecuador"},EG:{code:"EG",name:"Egypt"},SV:{code:"SV",name:"El Salvador"},GQ:{code:"GQ",name:"Equatorial Guinea"},ER:{code:"ER",name:"Eritrea"},EE:{code:"EE",name:"Estonia"},ET:{code:"ET",name:"Ethiopia"},FK:{code:"FK",name:"Falkland Islands (Malvinas)"},FO:{code:"FO",name:"Faroe Islands"},FJ:{code:"FJ",name:"Fiji"},FI:{code:"FI",name:"Finland"},FR:{code:"FR",name:"France"},GF:{code:"GF",name:"French Guiana"},PF:{code:"PF",name:"French Polynesia"},TF:{code:"TF",name:"French Southern Territories"},GA:{code:"GA",name:"Gabon"},GM:{code:"GM",name:"Gambia"},GE:{code:"GE",name:"Georgia"},DE:{code:"DE",name:"Germany"},GH:{code:"GH",name:"Ghana"},GI:{code:"GI",name:"Gibraltar"},GR:{code:"GR",name:"Greece"},GL:{code:"GL",name:"Greenland"},GD:{code:"GD",name:"Grenada"},GP:{code:"GP",name:"Guadeloupe"},GU:{code:"GU",name:"Guam"},GT:{code:"GT",name:"Guatemala"},GG:{code:"GG",name:"Guernsey"},GN:{code:"GN",name:"Guinea"},GW:{code:"GW",name:"Guinea-Bissau"},GY:{code:"GY",name:"Guyana"},HT:{code:"HT",name:"Haiti"},HM:{code:"HM",name:"Heard Island and McDonald Islands"},VA:{code:"VA",name:"Holy See (Vatican City State)"},HN:{code:"HN",name:"Honduras"},HK:{code:"HK",name:"Hong Kong"},HU:{code:"HU",name:"Hungary"},IS:{code:"IS",name:"Iceland"},IN:{code:"IN",name:"India"},ID:{code:"ID",name:"Indonesia"},IR:{code:"IR",name:"Iran, Islamic Republic of"},IQ:{code:"IQ",name:"Iraq"},IE:{code:"IE",name:"Ireland"},IM:{code:"IM",name:"Isle of Man"},IL:{code:"IL",name:"Israel"},IT:{code:"IT",name:"Italy"},JM:{code:"JM",name:"Jamaica"},JP:{code:"JP",name:"Japan"},JE:{code:"JE",name:"Jersey"},JO:{code:"JO",name:"Jordan"},KZ:{code:"KZ",name:"Kazakhstan"},KE:{code:"KE",name:"Kenya"},KI:{code:"KI",name:"Kiribati"},KP:{code:"KP",name:"Korea, Democratic People's Republic of"},KR:{code:"KR",name:"Korea, Republic of"},KW:{code:"KW",name:"Kuwait"},KG:{code:"KG",name:"Kyrgyzstan"},LA:{code:"LA",name:"Lao People's Democratic Republic"},LV:{code:"LV",name:"Latvia"},LB:{code:"LB",name:"Lebanon"},LS:{code:"LS",name:"Lesotho"},LR:{code:"LR",name:"Liberia"},LY:{code:"LY",name:"Libyan Arab Jamahiriya"},LI:{code:"LI",name:"Liechtenstein"},LT:{code:"LT",name:"Lithuania"},LU:{code:"LU",name:"Luxembourg"},MO:{code:"MO",name:"Macao"},MK:{code:"MK",name:"Macedonia, The Former Yugoslav Republic of"},MG:{code:"MG",name:"Madagascar"},MW:{code:"MW",name:"Malawi"},MY:{code:"MY",name:"Malaysia"},MV:{code:"MV",name:"Maldives"},ML:{code:"ML",name:"Mali"},MT:{code:"MT",name:"Malta"},MH:{code:"MH",name:"Marshall Islands"},MQ:{code:"MQ",name:"Martinique"},MR:{code:"MR",name:"Mauritania"},MU:{code:"MU",name:"Mauritius"},YT:{code:"YT",name:"Mayotte"},MX:{code:"MX",name:"Mexico"},FM:{code:"FM",name:"Micronesia, Federated States of"},MD:{code:"MD",name:"Moldova, Republic of"},MC:{code:"MC",name:"Monaco"},MN:{code:"MN",name:"Mongolia"},ME:{code:"ME",name:"Montenegro"},MS:{code:"MS",name:"Montserrat"},MA:{code:"MA",name:"Morocco"},MZ:{code:"MZ",name:"Mozambique"},MM:{code:"MM",name:"Myanmar"},NA:{code:"NA",name:"Namibia"},NR:{code:"NR",name:"Nauru"},NP:{code:"NP",name:"Nepal"},NL:{code:"NL",name:"Netherlands"},NC:{code:"NC",name:"New Caledonia"},NZ:{code:"NZ",name:"New Zealand"},NI:{code:"NI",name:"Nicaragua"},NE:{code:"NE",name:"Niger"},NG:{code:"NG",name:"Nigeria"},NU:{code:"NU",name:"Niue"},NF:{code:"NF",name:"Norfolk Island"},MP:{code:"MP",name:"Northern Mariana Islands"},NO:{code:"NO",name:"Norway"},PS:{code:"PS",name:"Occupied Palestinian Territory"},OM:{code:"OM",name:"Oman"},PK:{code:"PK",name:"Pakistan"},PW:{code:"PW",name:"Palau"},PA:{code:"PA",name:"Panama"},PG:{code:"PG",name:"Papua New Guinea"},PY:{code:"PY",name:"Paraguay"},PE:{code:"PE",name:"Peru"},PH:{code:"PH",name:"Philippines"},PN:{code:"PN",name:"Pitcairn"},PL:{code:"PL",name:"Poland"},PT:{code:"PT",name:"Portugal"},PR:{code:"PR",name:"Puerto Rico"},QA:{code:"QA",name:"Qatar"},RE:{code:"RE",name:"Reunion"},RO:{code:"RO",name:"Romania"},RU:{code:"RU",name:"Russian Federation"},RW:{code:"RW",name:"Rwanda"},BL:{code:"BL",name:"Saint Barthelemy"},SH:{code:"SH",name:"Saint Helena, Ascension and Tristan da Cunha"},KN:{code:"KN",name:"Saint Kitts and Nevis"},LC:{code:"LC",name:"Saint Lucia"},MF:{code:"MF",name:"Saint Martin (French part)"},PM:{code:"PM",name:"Saint Pierre and Miquelon"},VC:{code:"VC",name:"Saint Vincent and The Grenadines"},WS:{code:"WS",name:"Samoa"},SM:{code:"SM",name:"San Marino"},ST:{code:"ST",name:"Sao Tome and Principe"},SA:{code:"SA",name:"Saudi Arabia"},SN:{code:"SN",name:"Senegal"},RS:{code:"RS",name:"Serbia"},SC:{code:"SC",name:"Seychelles"},SL:{code:"SL",name:"Sierra Leone"},SG:{code:"SG",name:"Singapore"},SX:{code:"SX",name:"Sint Maarten (Dutch part)"},SK:{code:"SK",name:"Slovakia"},SI:{code:"SI",name:"Slovenia"},SB:{code:"SB",name:"Solomon Islands"},SO:{code:"SO",name:"Somalia"},ZA:{code:"ZA",name:"South Africa"},GS:{code:"GS",name:"South Georgia and the South Sandwich Islands"},ES:{code:"ES",name:"Spain"},LK:{code:"LK",name:"Sri Lanka"},SD:{code:"SD",name:"Sudan"},SR:{code:"SR",name:"Suriname"},SJ:{code:"SJ",name:"Svalbard and Jan Mayen"},SZ:{code:"SZ",name:"Swaziland"},SE:{code:"SE",name:"Sweden"},CH:{code:"CH",name:"Switzerland"},SY:{code:"SY",name:"Syrian Arab Republic"},TW:{code:"TW",name:"Taiwan, Province of China"},TJ:{code:"TJ",name:"Tajikistan"},TZ:{code:"TZ",name:"Tanzania, United Republic of"},TH:{code:"TH",name:"Thailand"},TL:{code:"TL",name:"Timor-Leste"},TG:{code:"TG",name:"Togo"},TK:{code:"TK",name:"Tokelau"},TO:{code:"TO",name:"Tonga"},TT:{code:"TT",name:"Trinidad and Tobago"},TN:{code:"TN",name:"Tunisia"},TR:{code:"TR",name:"Turkey"},TM:{code:"TM",name:"Turkmenistan"},TC:{code:"TC",name:"Turks and Caicos Islands"},TV:{code:"TV",name:"Tuvalu"},UG:{code:"UG",name:"Uganda"},UA:{code:"UA",name:"Ukraine"},AE:{code:"AE",name:"United Arab Emirates"},GB:{code:"GB",name:"United Kingdom"},US:{code:"US",name:"United States"},UY:{code:"UY",name:"Uruguay"},UZ:{code:"UZ",name:"Uzbekistan"},VU:{code:"VU",name:"Vanuatu"},VE:{code:"VE",name:"Venezuela, Bolivarian Republic of"},VN:{code:"VN",name:"Viet Nam"},VG:{code:"VG",name:"Virgin Islands, British"},VI:{code:"VI",name:"Virgin Islands, U.S."},WF:{code:"WF",name:"Wallis and Futuna"},EH:{code:"EH",name:"Western Sahara"},YE:{code:"YE",name:"Yemen"},ZM:{code:"ZM",name:"Zambia"},ZW:{code:"ZW",name:"Zimbabwe"}}}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";return{US:{AL:{code:"AL",name:"Alabama"},AK:{code:"AK",name:"Alaska"},AZ:{code:"AZ",name:"Arizona"},AR:{code:"AR",name:"Arkansas"},CA:{code:"CA",name:"California"},CO:{code:"CO",name:"Colorado"},CT:{code:"CT",name:"Connecticut"},DE:{code:"DE",name:"Delaware"},DC:{code:"DC",name:"District of Columbia"},FL:{code:"FL",name:"Florida"},GA:{code:"GA",name:"Georgia"},HI:{code:"HI",name:"Hawaii"},ID:{code:"ID",name:"Idaho"},IL:{code:"IL",name:"Illinois"},IN:{code:"IN",name:"Indiana"},IA:{code:"IA",name:"Iowa"},KS:{code:"KS",name:"Kansas"},KY:{code:"KY",name:"Kentucky"},LA:{code:"LA",name:"Louisiana"},ME:{code:"ME",name:"Maine"},MD:{code:"MD",name:"Maryland"},MA:{code:"MA",name:"Massachusetts"},MI:{code:"MI",name:"Michigan"},MN:{code:"MN",name:"Minnesota"},MS:{code:"MS",name:"Mississippi"},MO:{code:"MO",name:"Missouri"},MT:{code:"MT",name:"Montana"},NE:{code:"NE",name:"Nebraska"},NV:{code:"NV",name:"Nevada"},NH:{code:"NH",name:"New Hampshire"},NJ:{code:"NJ",name:"New Jersey"},NM:{code:"NM",name:"New Mexico"},NY:{code:"NY",name:"New York"},NC:{code:"NC",name:"North Carolina"},ND:{code:"ND",name:"North Dakota"},OH:{code:"OH",name:"Ohio"},OK:{code:"OK",name:"Oklahoma"},OR:{code:"OR",name:"Oregon"},PA:{code:"PA",name:"Pennsylvania"},RI:{code:"RI",name:"Rhode Island"},SC:{code:"SC",name:"South Carolina"},SD:{code:"SD",name:"South Dakota"},TN:{code:"TN",name:"Tennessee"},TX:{code:"TX",name:"Texas"},UT:{code:"UT",name:"Utah"},VT:{code:"VT",name:"Vermont"},VA:{code:"VA",name:"Virginia"},WA:{code:"WA",name:"Washington"},WV:{code:"WV",name:"West Virginia"},WI:{code:"WI",name:"Wisconsin"},WY:{code:"WY",name:"Wyoming"},AS:{code:"AS",name:"American Samoa"},GU:{code:"GU",name:"Guam"},MP:{code:"MP",name:"Northern Mariana Islands"},PR:{code:"PR",name:"Puerto Rico"},UM:{code:"UM",name:"U.S. Minor Outlying Islands"},VI:{code:"VI",name:"U.S. Virgin Islands"}}}}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";exports.lpDefaultProfileImage=function(e){var a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABPCAIAAADz89W0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MkVFRDI3OTJERUQxMUUzQkU4Qzk1MDlEQzAyMjFFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3MkVFRDI3QTJERUQxMUUzQkU4Qzk1MDlEQzAyMjFFNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyRUVEMjc3MkRFRDExRTNCRThDOTUwOURDMDIyMUU0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjcyRUVEMjc4MkRFRDExRTNCRThDOTUwOURDMDIyMUU0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+gildPAAABRdJREFUeNrsmstKI0EUhicmRmO8IoKIgigoCoovIOhOX8m38RncuHWjG0HFjeAl4GWhoAvvUZPMZ/6ZQ9OtmUBa04OnFk2luqo9X51LnVMzqZWVlV8/qbX8+mHNgR3YgR3YgR3YgR3YgR3YgR3YgR3YgR3YgR3YgR3YgR34O1umkcWVSiX4M5VK2Yj6PDUt9Co6GPxI6MvB+U0GDlL9MZiWluBe6KkJ9iqI8RmDjVeq7cO/1TQN8wTm9fX16ekpn88/Pj5ms1kky+VyLy8vdMrlMoOtra100um0MWgLghj0mfD29mav+JnJZJKiYWuA9fb2jo2NiRYwhL64uIBf0k9NTTFHWyMY5kRtVX0msIqfPK+vr0ulUnRrmgyMHF1dXQsLCz09PYChlpubm7W1tbu7O2SFbXx8fGZmxpiZDwzToobKTwhZgmKfn5/Pz883NjaKxaJMo3FR0/Pz841/Ba0iGSSDg4MPDw/Ih27b29uPj495hbUXCoWRkRGELlYb5MDAzCv6etJ4xaD2BWzGh4aGmHl5eVnD4b8PWPpBFbK6q6ur0dFRlCxzbWtrw6sZ7OjoQNXIPTs7y2ScOVttTGCVvFTN+lI7P/kyP9k4vhkLc6NBCwmQiT76RLdbW1vLy8tyP8inp6dPT09RFHi49Pb29sDAgMyVJ+N0YI6eW6yFljkMEvyYw19pftCSQ0osheWTk5OjoyNCFLolgGHGc3Nzm5ubnZ2dbMf6+jquzvj7H85kbLOCja+xO4uLi2wWO4I5yMJjceBGMy3bcsRCOBnhzs7O/f09CmcvwJ6cnAQbWgi7u7vhyVcbVIxg1cxkOX1G6LM1eDLBWX4hS47LgWMAthiLuKgCJEx3b2+PETk2KsV1IZS7QmgeyxL5M5y5apO1M5lpds4rqicrtUS94gESZoAnJib6+/sBYBcI3ZiojqtQvik1auNub2+xDu2j3CRGS47fhzVCrEJRGCR+u7S0pIAE5/DwsDpRYEuniOe7u7vsnbKO1N8WL3MMufT74VZNIVAvHY4f/JDgjEoVYC0g84x+oVRt5WpjrX3zizTcaHloSlBKaJkjZ698WOoy3do0dfTKEmw6+DNPTbCWFA2HVC0DVpOtKsYyfnBwsL+/T4gyk+aVlC8kebuKEL1VREhWPRws8aIVrD15RWp9dnYGQyhpEZvgdUQpb5MXVAItKUHLXM4MW/KZKeotZ4/O3mipYGvVOITxZKUllmNGLxuar+HQ1QT6URqsA5noRVIZugOIOoX8glWazEdk2DF6ciZ2J7E8RC4qbPItKkTxh6wjeDeiJcQ50hVLM1G4YkGC6uEQsIWcYMWD6HaVESo8dKppnBGcWaFLsZrz2WJbEjUsEqvvTWl20RHKW2zQtsBuCKiZqCsPDw/tbiiJGpboxFskNjyJa5VgjSs73RCpzKbuJ9ksFApkMhYLkwgMGInx6uoqRZKUo6u5f2rJ/FlVhOqwvr6+GAumr9Kwkko0U7+UZtLsi2KVQoDcwbKUJPqwLiikIrmxyil5bG0N6zKEQlpHsZRsdwzJ1TAiIqhiDzmj7qssONVYq9ybtVKsrUpWLh2NQBDKaaVnRFc9XOdyqVp3l1aZJNSkLdlUTLYiIXjY1nm1EDx77QxL6DkcyoHr+QexaGYe7SRUw9EEu55z5bOFH36qaRcA/11zYAd2YAd2YAd2YAd2YAd2YAd2YAd24B/QMrH/J4qkA8f7Pyhcw+7DzW6/BRgAykJQPtOgddIAAAAASUVORK5CYII=",n=function(e){var a="";e=e.split(" ");for(var n=0;n<e.length;n++)a+=e[n].substr(0,1);return a=a.toUpperCase()},o=function(e){var a=e.charCodeAt(0)-64,n=a+120,o=Math.floor((a-1)/25*4+1-1),t=[[n,210,210],[n,n,210],[210,n,n],[n,210,n],[210,n,210]];return t[o]},t=function(e){return{1:.6,2:.5,3:.45}[e]||.3};return function(r,i,c,d){if(!arguments.length)return a;var s=document.createElement("canvas");if(s.setAttribute("width",i),s.setAttribute("height",c),!s.getContext||!s.getContext("2d"))return a;var m=n(r),l=t(m.length),u=parseInt(l*c,10),p=s.getContext("2d");return d=d||o(m),p.fillStyle=e.isArray(d)?"rgb("+d.join(",")+")":d,p.fillRect(0,0,i,c),p.fillStyle="rgb(250,250,250)",p.font=u+"px Proxima Regular, Helvetica Nueue, Helvetica, Arial, sans-serif",p.textAlign="center",p.textBaseline="middle",p.fillText(m,i/2,c/2),s.toDataURL("image/png")}},exports.lpDefaultProfileImage.$inject=["lpCoreUtils"]}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";exports.lpUserDetails=function(e,a,n){function o(e){var o=[];return a.each(e,function(e,a){o.push({key:n.instant(a),value:"dateOfBirth"===a?n.formatDate(e):n.instant(e)})}),o}function t(e){e.photoUrl=e.photoData||(e.photoUrl?decodeURIComponent(e.photoUrl):null),e.details=o(e.details);var a=e.activities;return a?a.lastLoggedIn?a.lastLoggedIn=n.formatDate(a.lastLoggedIn,"medium"):a.lastLoggedIn="":e.activities={lastLoggedIn:""},e}return{get:function(a){return e.get(a).then(function(e){return t(e.data)})},put:function(n,o){return e({method:"put",url:n,transformRequest:a.buildQueryString,data:o,headers:{"Content-Type":"application/x-www-form-urlencoded;"}})}}},exports.lpUserDetails.$inject=["$http","lpCoreUtils","lpCoreI18n"]}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";exports.lpUserSettings=function(e,a,n,o){function t(){var t=function(){};return n.assign(t.prototype,{sendRequest:function(t,i,c){var d=a.defer(),s=r[t];return"undefined"==typeof s&&o.throwException(new Error('Endpoint "'+t+'" not found. Make sure that lpUserSettings is configured properly.')),e(n.assign({method:"POST",url:r[t].replace(/{username}/,i)},c)).then(function(e){d.resolve(e.data)},function(e){d.reject(e)}),d.promise},getEmailByUsernameAndPhone:function(e,a){return this.sendRequest("getEmailByUsernameAndPhone",e,{method:"GET",params:{phone:a}})},sendUsernameByEmail:function(e){return this.sendRequest("sendUsernameByEmail","",{params:{email:e}})},requestAuthCode:function(e,a,n){var o={email:"requestAuthCodeByEmail",phone:"requestAuthCodeByPhone"}[e];return this.sendRequest(o,a,{data:{phone:n}})},authenticateByTempPassword:function(e,a,n){return this.sendRequest("authenticateByTempPassword",e,{data:{password:a},headers:{token:n}})},createNewPassword:function(e,a,n){return this.sendRequest("createNewPassword",e,{data:{password:a},headers:{token:n}})}}),new t}var r={};return{setConfig:function(e){return n.assign(r,n.mapValues(e,n.resolvePortalPlaceholders)),this},api:t,changePassword:function(a,n,o){return e.post(a,{oldPassword:n,password:o})}}},exports.lpUserSettings.$inject=["$http","$q","lpCoreUtils","lpCoreError"]}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";exports.lpUserLocations=function(e,a){var n="services/rest/v1/party-locations",o=n+"/contacts",t=n+"/addresses",r=function(e){return e.data};return{getContacts:function(a){return e.get(a||o).then(r)},saveContacts:function(a,n){return e.put(a||o,n).then(r)},getAddresses:function(a){return e.get(a||t).then(r)},saveAddresses:function(a,n){return e.put(a||t,n).then(r)}}},exports.lpUserLocations.$inject=["$http","lpCoreHttpInterceptor"]}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";var a=[];exports.lpUsersPreference=function(e,n,o,t,r){var i=t.getPreference("preferenceService"),c=o.resolvePortalPlaceholders(i),d={Accept:"application/json","Content-Type":"application/json","Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"};this.read=this.get=function(){return e.get(c,{headers:d})},this.save=function(a,n){var t={};return t[a]=n,e.put(c,o.buildQueryString(t),{headers:d})},this.put=function(a,o){var t={};return t[a]=o,e.put(c+"/"+a,n("json")(t),{headers:d})},this.getCachedUserPrefs=function(){var e=this;if(this.prefs)return r.when(this.prefs);if(!i){var n=r.defer();return a.push(function(e){n.resolve(e)}),n.promise}return this.get().then(function(n){return e.prefs=n.data||{},e.prefs.pfmEnabled=o.parseBoolean(e.prefs.pfmEnabled),o.forEach(a,function(a){a(e.prefs)}),a=[],e.prefs})}},exports.lpUsersPreference.$inject=["$http","$filter","lpCoreUtils","lpWidget","$q"]}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))},function(e,exports,a){var n;n=function(require,exports,e){"use strict";exports.profileImage=function(e,a){return{restrict:"EA",replace:!0,template:'<img height="{{size}}" width="{{size}}" ng-src="{{dataUrl}}"" />',scope:{fullname:"@",color:"@",size:"="},link:function(e,n,o){var t=function(n,o){e.dataUrl=a(e.fullname,n,o,e.color)};e.$watch("size + fullname + color",function(){var a=e.size||100,n=e.size||100;t(a,n)})}}},exports.profileImage.$inject=["lpCoreUtils","lpDefaultProfileImage"]}.call(exports,a,exports,e),!(void 0!==n&&(e.exports=n))}])});
//# sourceMappingURL=main.js.map