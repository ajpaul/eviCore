/* module-places@v3.1.0 build with ♥ by bb-lp-cli@v1.9.11 */
!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("core"),require("base"),require("ui"),require("async!//maps.google.com/maps/api/js?libraries=places"),require("jquery")):"function"==typeof define&&define.amd?define(["core","base","ui","async!//maps.google.com/maps/api/js?libraries=places","jquery"],n):"object"==typeof exports?exports["module-places"]=n(require("core"),require("base"),require("ui"),require("async!//maps.google.com/maps/api/js?libraries=places"),require("jquery")):e["module-places"]=n(e.core,e.base,e.ui,e["async!//maps.google.com/maps/api/js?libraries=places"],e.jquery)}(this,function(e,n,t,a,r){return function(e){function n(a){if(t[a])return t[a].exports;var r=t[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,exports,n){e.exports=n(1)},function(e,exports,n){var t;(function(e){"use strict";t=function(require,exports,e){e.name="module-places";var t=n(3),a=n(4),r=n(5);n(6),n(7);var i=[t.name,r.name,"AngularGM"];e.exports=a.createModule(e.name,i).constant(n(8)).service(n(9)).directive(n(10))}.call(exports,n,exports,e),!(void 0!==t&&(e.exports=t))}).call(exports,n(2)(e))},function(e,exports){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(n,exports){n.exports=e},function(e,exports){e.exports=n},function(e,exports){e.exports=t},function(e,exports){"use strict";/**
	 * AngularGM - Google Maps Directives for AngularJS
	 * @version v1.0.2 - 2015-06-17
	 * @link http://dylanfprice.github.com/angular-gm
	 * @author Dylan Price <the.dylan.price@gmail.com>
	 * @license MIT License, http://www.opensource.org/licenses/MIT
	 */
!function(){angular.module("AngularGM",[]).factory("angulargmDefaults",function(){return{precision:3,markerConstructor:google.maps.Marker,polylineConstructor:google.maps.Polyline,circleConstructor:google.maps.Circle,mapOptions:{zoom:8,center:new google.maps.LatLng(46,(-120)),mapTypeId:google.maps.MapTypeId.ROADMAP}}})}(),function(){angular.module("AngularGM").directive("gmCircles",["$parse","$compile","$timeout","$log","angulargmUtils","angulargmShape",function(e,n,t,a,r,i){function o(e,n,t,a){if(!("gmCircleCenter"in t))throw"gmCircleCenter attribute required";var r=function o(n){var t=e.gmCircleCenter({object:n}),a=s(t);if(null==a)return null;var o=e.gmCircleOptions({object:n}),r={};return angular.extend(r,o,{center:a}),r};i.createShapeDirective("circle",e,t,a,r)}var s=r.objToLatLng;return{restrict:"AE",priority:100,scope:{gmObjects:"&",gmId:"&",gmCircleCenter:"&",gmCircleOptions:"&"},require:"^gmMap",link:o}}])}(),function(){angular.module("AngularGM").directive("gmInfoWindow",["$parse","$compile","$timeout","angulargmUtils",function(e,n,t,a){function r(n,a,r,o){var s=angular.extend({},n.$eval(r.gmInfoWindowOptions));s.content=a[0];var l=e(r.gmInfoWindow),u=l(n);u||(u=new google.maps.InfoWindow(s),l.assign(n,u));var c=i(r);angular.forEach(c,function(e,a){google.maps.event.addListener(u,a,function(){t(function(){e(n,{infoWindow:u})})})})}var i=a.getEventHandlers;return{restrict:"A",priority:100,scope:!1,link:r}}])}(),function(){angular.module("AngularGM").directive("gmMap",["$timeout","angulargmUtils","debounce",function(e,n,t){function a(n,a,i,o){if(angular.isDefined(n.gmCenter)||(n.center={}),angular.isDefined(n.gmBounds)||(n.bounds={}),!angular.isDefined(n.gmMapId))throw"angulargm must have non-empty gmMapId attribute";var s=!1,l=!1,u=!1,c=!1;i.hasOwnProperty("gmCenter")&&(s=!0),i.hasOwnProperty("gmZoom")&&(l=!0),i.hasOwnProperty("gmBounds")&&(u=!0),i.hasOwnProperty("gmMapTypeId")&&(c=!0);var g=function(){e(function(){(s||l||u||c)&&n.$apply(function(e){if(s&&(n.gmCenter=o.center),l&&(n.gmZoom=o.zoom),u){var t=o.bounds;t&&(n.gmBounds=t)}c&&(n.gmMapTypeId=o.mapTypeId)})})},p=t(g,100);o.addMapListener("drag",p),o.addMapListener("zoom_changed",p),o.addMapListener("center_changed",p),o.addMapListener("bounds_changed",p),o.addMapListener("maptypeid_changed",p),o.addMapListener("resize",p);var m=o.getMap(i.gmMapId),f=r(i);angular.forEach(f,function(t,a){o.addMapListener(a,function(a){var r={map:m};void 0!==a&&(r.event=a),e(function(){t(n.$parent,r)})})}),s&&n.$watchCollection("gmCenter",function(e,n){var t=e!==n;if(t&&!o.dragging){var a=e;a&&(o.center=a)}}),l&&n.$watch("gmZoom",function(e,n){var t=null!=e&&!isNaN(e);t&&e!==n&&(o.zoom=e)}),u&&n.$watch("gmBounds",function(e,n){var t=e!==n;if(t&&!o.dragging){var a=e;a&&(o.bounds=a)}}),c&&n.$watch("gmMapTypeId",function(e,n){var t=e!==n;t&&e&&(o.mapTypeId=e)}),n.$on("gmMapResize",function(e,t){n.gmMapId()===t&&o.mapTrigger("resize")}),o.addMapListenerOnce("idle",function(){n.$emit("gmMapIdle",n.gmMapId())}),o.mapTrigger("resize")}var r=n.getEventHandlers;return{restrict:"AE",priority:100,template:'<div><div id="" style="width:100%;height:100%;"></div><div ng-transclude></div></div>',transclude:!0,replace:!0,scope:{gmCenter:"=",gmZoom:"=",gmBounds:"=",gmMapTypeId:"=",gmMapOptions:"&",gmMapId:"&"},controller:"angulargmMapController",link:a}}])}(),function(){angular.module("AngularGM").directive("gmMarkers",["$log","$parse","$timeout","angulargmUtils","angulargmShape",function(e,n,t,a,r){function i(e,n,t,a){if(!("gmPosition"in t))throw"gmPosition attribute required";var i=function s(n){var t=e.gmPosition({object:n}),a=o(t);if(null==a)return null;var s=e.gmMarkerOptions({object:n}),r={};return angular.extend(r,s,{position:a}),r};r.createShapeDirective("marker",e,t,a,i)}var o=a.objToLatLng;return{restrict:"AE",priority:100,scope:{gmObjects:"&",gmId:"&",gmPosition:"&",gmMarkerOptions:"&",gmEvents:"&"},require:"^gmMap",link:i}}])}(),function(){angular.module("AngularGM").directive("gmPolylines",["$parse","$compile","$timeout","$log","angulargmUtils","angulargmShape",function(e,n,t,a,r,i){function o(e,n,t,r){if(!("gmPath"in t))throw"gmPath attribute required";var o=function l(n){var t=e.gmPath({object:n}),r=[];angular.forEach(t,function(e){var n=s(e);return null==n?void a.warn("Unable to generate lat/lng from ",e):void r.push(n)});var l=e.gmPolylineOptions({object:n}),i={};return angular.extend(i,l,{path:r}),i};i.createShapeDirective("polyline",e,t,r,o)}var s=r.objToLatLng;return{restrict:"AE",priority:100,scope:{gmObjects:"&",gmId:"&",gmPath:"&",gmPolylineOptions:"&",gmEvents:"&"},require:"^gmMap",link:o}}])}(),function(){angular.module("AngularGM").factory("angulargmContainer",["$q",function(e){function n(e,n){if(!(n instanceof google.maps.Map))throw"map not a google.maps.Map: "+n;if(e in o)throw"already contain map with id "+e;o[e]=n,e in s&&s[e].resolve(n)}function t(e){return o[e]}function a(n){var a=s[n]||e.defer(),r=t(n);return s[n]=a,void 0!==r&&a.resolve(r),a.promise}function r(e){e in o&&delete o[e],e in s&&delete s[e]}function i(){o={},s={}}var o={},s={};return{addMap:n,getMap:t,getMapPromise:a,removeMap:r,clear:i}}])}(),function(){angular.module("AngularGM").factory("angulargmShape",["$timeout","angulargmUtils",function(e,n){function t(e){if(!("gmObjects"in e))throw"gmObjects attribute required";if(!("gmId"in e))throw"gmId attribute required"}function a(e,n){var t={};return angular.forEach(n,function(n){var a=e.gmId({object:n});t[a]=n}),t}function r(n,t,a,r,i,o){angular.forEach(i,function(i,s){var l=a.getElement(n,t.$id,s),u=o(i);null!=u&&(l?a.updateElement(n,t.$id,s,u):(a.addElement(n,t.$id,s,u),l=a.getElement(n,t.$id,s),angular.forEach(r,function(r,o){a.addListener(l,o,function(){e(function(){var e={object:i};e[n]=l,angular.version.major<=1&&angular.version.minor<=2?r(t.$parent.$parent,e):r(t.$parent.$parent.$parent,e)})})})))})}function i(e,n,t,a){var r=[];t.forEachElementInScope(e,n.$id,function(e,n){n in a||r.push(n)}),angular.forEach(r,function(a){t.removeElement(e,n.$id,a)})}function o(e,n){var t=n.charAt(0).toUpperCase()+n.slice(1)+"s";return e.replace("Shapes",t)}function s(n,t,a,r,i){t.$watch("gmObjects().length",function(e,n){null!=e&&e!==n&&i(t,t.gmObjects())}),t.$watch("gmObjects()",function(e,n){null!=e&&e!==n&&i(t,t.gmObjects())}),t.$watch("gmEvents()",function(a,i){null!=a&&a!==i&&angular.forEach(a,function(a){var i=a.event,o=a.ids;angular.forEach(o,function(a){var o=r.getElement(n,t.$id,a);null!=o&&e(angular.bind(this,r.trigger,o,i))})})}),t.$on(o("gmShapesRedraw",n),function(e,n){null!=n&&n!==a.gmObjects||(i(t),i(t,t.gmObjects()))}),t.$on(o("gmShapesUpdate",n),function(e,n){null!=n&&n!==a.gmObjects||i(t,t.gmObjects())})}function l(l,u,c,g,p){t(c);var m=function(e,t){var s=a(e,t),u=n.getEventHandlers(c);r(l,e,g,u,s,p),i(l,e,g,s),e.$emit(o("gmShapesUpdated",l),c.gmObjects)};s(l,u,c,g,m),e(angular.bind(null,m,u,u.gmObjects()))}return{createShapeDirective:l}}])}(),function(){angular.module("AngularGM").factory("angulargmUtils",["$parse",function(e){function n(e,n){return Math.abs(e-n)<1e-6}function t(e,t){return e instanceof google.maps.LatLng&&t instanceof google.maps.LatLng&&(n(e.lat(),t.lat())&&n(e.lng(),t.lng()))}function a(e,n){if(!(e instanceof google.maps.LatLngBounds&&n instanceof google.maps.LatLngBounds))return!1;var a=e.getSouthWest(),r=n.getSouthWest(),i=e.getNorthEast(),o=n.getNorthEast();return t(a,r)&&t(i,o)}function r(e){if(!(e instanceof google.maps.LatLng))throw"latLng not a google.maps.LatLng";return{lat:e.lat(),lng:e.lng()}}function i(e){if(null!=e){var n=e.lat,t=e.lng,a=!(null==n||null==t||isNaN(n)||isNaN(t));if(a)return new google.maps.LatLng(n,t)}return null}function o(e){if(!(e instanceof google.maps.LatLng))throw"latLng must be a google.maps.LatLng";var n=null==e.lat()||null==e.lng(),t=isNaN(e.lat())||isNaN(e.lng());return n||t}function s(n){var t={};return angular.forEach(n,function(n,a){if(0===a.lastIndexOf("gmOn",0)){var r=angular.lowercase(a.substring(4).replace(/(?!^)([A-Z])/g,"_$&")),i=e(n);t[r]=i}}),t}function l(e,n){if(void 0===e||null===e)throw n?n+" was: "+e:"value was: "+e}return{latLngEqual:t,boundsEqual:a,latLngToObj:r,objToLatLng:i,hasNaN:o,getEventHandlers:s,assertDefined:l}}])}(),function(){angular.module("AngularGM").factory("debounce",["$timeout",function(e){return function(n,t,a){function r(){s=this,o=arguments;var r=function(){i=null,a||(l=n.apply(s,o))},u=a&&!i;return i&&e.cancel(i),i=e(r,t),u&&(l=n.apply(s,o)),l}var i,o,s,l;return r.cancel=function(){e.cancel(i),i=null},r}}])}(),function(){angular.module("AngularGM").controller("angulargmMapController",["$scope","$element","angulargmUtils","angulargmDefaults","angulargmContainer",function(e,n,t,a,r){var i=t.latLngEqual,o=t.boundsEqual,s=t.hasNaN,l=t.assertDefined,u=function(e,n){var t=e.gmMapId();if(!t)throw"angulargm must have non-empty gmMapId attribute";var l=angular.element(n[0].firstChild);l.attr("id",t);var u=this._getConfig(e,a);this._map=this._createMap(t,l,u,r,e),this._elements={},this._listeners={},this.dragging=!1,Object.defineProperties(this,{precision:{value:a.precision,writeable:!1},center:{configurable:!0,get:function(){return this._map.getCenter()},set:function(e){if(s(e))throw"center contains null or NaN";var n=!i(this.center,e);n&&this._map.panTo(e)}},zoom:{configurable:!0,get:function(){return this._map.getZoom()},set:function(e){if(null==e||isNaN(e))throw"zoom was null or NaN";var n=this.zoom!==e;n&&this._map.setZoom(e)}},bounds:{configurable:!0,get:function(){return this._map.getBounds()},set:function(e){var n=!s(e.getSouthWest())&&!s(e.getNorthEast());if(!n)throw"bounds contains null or NaN";var t=!o(this.bounds,e);t&&this._map.fitBounds(e)}},mapTypeId:{configurable:!0,get:function(){return this._map.getMapTypeId()},set:function(e){if(null==e)throw"mapTypeId was null or unknown";var n=this.mapTypeId!==e;n&&this._map.setMapTypeId(e)}}}),this._initDragListeners(),e.$on("$destroy",angular.bind(this,this._destroy))};this._getConfig=function(e,n){var t=n.mapOptions,a={};return angular.extend(a,t,e.gmMapOptions()),a},this._createMap=function(e,n,t,a){var r=a.getMap(e);if(r){var i=r.getDiv();n.replaceWith(i),this._map=r,this.mapTrigger("resize"),r.setOptions(t)}else r=new google.maps.Map(n[0],t),a.addMap(e,r);return r},this._initDragListeners=function(){var e=this;this.addMapListener("dragstart",function(){e.dragging=!0}),this.addMapListener("idle",function(){e.dragging=!1})},this._destroy=function(){angular.forEach(this._listeners,function(e){angular.forEach(e,function(e){google.maps.event.removeListener(e)})}),this._listeners={};var e=this,n=Object.keys(this._elements);angular.forEach(n,function(n){var t=Object.keys(e._getElements(n));angular.forEach(t,function(t){e.forEachElementInScope(n,t,function(a,r){e.removeElement(n,t,r)})})});var t=this._map.getStreetView();t&&t.getVisible()&&t.setVisible(!1)},this.addMapListener=function(e,n){var t=google.maps.event.addListener(this._map,e,n);void 0===this._listeners[e]&&(this._listeners[e]=[]),this._listeners[e].push(t)},this.addMapListenerOnce=function(e,n){var t=google.maps.event.addListenerOnce(this._map,e,n);void 0===this._listeners[e]&&(this._listeners[e]=[]),this._listeners[e].push(t)},this.addListener=function(e,n,t){google.maps.event.addListener(e,n,t)},this.addListenerOnce=function(e,n,t){google.maps.event.addListenerOnce(e,n,t)},this.mapTrigger=function(e){google.maps.event.trigger(this._map,e)},this.trigger=function(e,n){google.maps.event.trigger(e,n)},this._newElement=function(e,n){if("marker"===e){if(!(n.position instanceof google.maps.LatLng))throw"markerOptions did not contain a position";return new a.markerConstructor(n)}if("polyline"===e){if(!(n.path instanceof Array))throw"polylineOptions did not contain a path";return new a.polylineConstructor(n)}if("circle"===e){if(!(n.center instanceof google.maps.LatLng))throw"circleOptions did not contain a marker position";return new a.circleConstructor(n)}throw"unrecognized type "+e},this._getElements=function(e){return e in this._elements||(this._elements[e]={}),this._elements[e]},this.addElement=function(e,n,t,a){if(l(e,"type"),l(n,"scopeId"),l(t,"id"),l(a,"elementOptions"),this.hasElement(e,n,t))return!1;var r=this._getElements(e);null==r[n]&&(r[n]={});var i={};angular.extend(i,a);var o=this._newElement(e,i);return r[n][t]=o,o.setMap(this._map),!0},this.updateElement=function(e,n,t,a){l(e,"type"),l(n,"scopeId"),l(t,"id"),l(a,"elementOptions");var r=this.getElement(e,n,t);return!!r&&(r.setOptions(a),!0)},this.hasElement=function(e,n,t){return l(e,"type"),l(n,"scopeId"),l(t,"id"),null!=this.getElement(e,n,t)},this.getElement=function(e,n,t){l(e,"type"),l(n,"scopeId"),l(t,"id");var a=this._getElements(e);return null!=a[n]&&t in a[n]?a[n][t]:null},this.removeElement=function(e,n,t){l(e,"type"),l(n,"scopeId"),l(t,"id");var a=this._getElements(e),r=!1,i=a[n][t];return i&&(i.setMap(null),r=!0),a[n][t]=null,delete a[n][t],r},this.forEachElement=function(e,n){l(e,"type"),l(n,"fn");var t=this._getElements(e),a=Object.keys(t),r=a.reduce(function(e,n){return angular.forEach(t[n],function(n){e.push(n)}),e},[]);angular.forEach(r,function(e,t){null!=e&&n(e,t)})},this.forEachElementInScope=function(e,n,t){l(e,"type"),l(n,"scopeId"),l(t,"fn");var a=this._getElements(e);angular.forEach(a[n],function(e,n){null!=e&&t(e,n)})},this.getMap=function(){return this._map},angular.bind(this,u)(e,n)}])}()},function(e,exports){e.exports=a},function(e,exports,n){var t;t=function(require,exports,e){"use strict";exports.lpPlacesUtils={maxLengthLabel:3,markerColorPool:["#FF8355","#6FADD4","#E69215","#74AED3","#C73935","#443647","#38706D","#1D415B"],markerWidth:25,markerHeight:35,markerFontFamily:"Arial",titleField:"name",alertTimeout:5e3,isCanvasSupported:function(){return!!document.createElement("canvas").getContext},maps:window.google&&window.google.maps}}.call(exports,n,exports,e),!(void 0!==t&&(e.exports=t))},function(e,exports,n){var t;t=function(require,exports,e){"use strict";exports.lpPlaces=function(e){var n=function(e,n,t){var a=n/2;e.beginPath(),e.moveTo(a,t),e.arc(a,a,a,0,Math.PI,!0),e.closePath(),e.fill(),e.stroke()};this.getFilterOptions=function(e){var n=e.types||[],t=e.services||[];return n.concat(t)},this.googleIcon=function(e,n){return"#"===n.charAt(0)&&(n=n.substring(1)),"//chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+e.charAt(0)+"|"+(n||"FF0000")},this.canvasIcon=function(t,a,r,i){var o=document.createElement("canvas"),s=o.getContext("2d");r=r||e.markerWidth,i=i||e.markerHeight,o.width=r,o.height=i,s.clearRect(0,0,r,i),s.fillStyle=a,s.strokeStyle=a,n(s,r,i),s.fillStyle="white",s.strokeStyle="black";var l=10-t.length;s.font="normal "+l+"pt "+e.markerFontFamily,s.textBaseline="top";var u=s.measureText(t);return s.fillText(t,Math.floor(r/2-u.width/2),4),o.toDataURL()}},exports.lpPlaces.$inject=["lpPlacesUtils"]}.call(exports,n,exports,e),!(void 0!==t&&(e.exports=t))},function(e,exports,n){var t;t=function(require,exports,e){"use strict";var t=n(11);exports.placesAutocomplete=function(e,n){function a(n,t,a,r){var i=new e.maps.places.Autocomplete(t[0]);e.maps.event.addListener(i,"place_changed",function(){var e=i.getPlace(),a=!!e.geometry,o={place:e};a&&(o.location=e.geometry.location),n.$apply(function(){r.$setValidity("place",a),r.$setViewValue(t.val()),n.onPlaceChange({result:o})})}),t.bind("keydown",function(e){13===e.keyCode&&e.preventDefault()})}return{restrict:"A",require:"ngModel",scope:{onPlaceChange:"&placesAutocomplete"},replace:!1,link:a,compile:function(){return t(document).on({DOMNodeInserted:function(){t(".pac-item, .pac-item span",this).addClass("needsclick")}},".pac-container"),a}}},exports.placesAutocomplete.$inject=["lpPlacesUtils","lpCoreUtils"]}.call(exports,n,exports,e),!(void 0!==t&&(e.exports=t))},function(e,exports){e.exports=r}])});
//# sourceMappingURL=main.js.map