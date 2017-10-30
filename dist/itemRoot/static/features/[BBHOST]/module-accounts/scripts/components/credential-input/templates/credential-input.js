define(function (require, exports, module) {
    'use strict';

	return '<div ng-switch on="credential.inputFieldType">' +
		'<div ng-switch-when="password">' +
			'<input type="password" class="form-control" ng-model="credential.fieldValue" aria-label="{{credential.inputFieldLabel}}" />' +
		'</div>' +
		'<div ng-switch-when="hidden">' +
			'<input type="hidden" class="form-control" ng-model="credential.fieldValue" aria-label="{{credential.inputFieldLabel}}" />' +
		'</div>' +
		'<div ng-switch-when="select">' +
			'<div dropdown-select="dropdown-select" ng-model="credential.fieldValue" options="option as option for option in credential.options"></div>' +
		'</div>' +
		'<div ng-switch-when="checkbox">' +
			'<div ng-repeat="option in credential.options">' +
				'<div lp-custom-checkbox="" ng-click="handleMultiCheckbox(option)" aria-label="{{option}}">' +
					'{{option}}' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div ng-switch-when="radio">' +
			'<div ng-repeat="option in credential.options">' +
				'<div lp-custom-radio="" ng-model="credential.fieldValue" name="radio-{{ credential.id }}" value="{{ option }}">' +
					'{{ option }}' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div ng-switch-when="img">' +
			'<img ng-src="{{credential.metaData}}" alt="{{credential.inputFieldlabel}}" />' +
			'<br /><br />' +
			'<div lp-custom-radio="" ng-model="credential.fieldValue" name="radio-{{credential.id}}"" value="true" class="radio-inline">' +
				'Yes' +
			'</div>' +
			'<div lp-custom-radio="" ng-model="credential.fieldValue" name="radio-{{credential.id}}" value="false" class="radio-inline">' +
				'No' +
			'</div>' +
		'</div>' +
		'<div ng-switch-when="imgd">' +
			'<img ng-src="data:{{credential.metaData}}" alt="{{credential.inputFieldlabel}}" />' +
			'<br /><br />' +
			'<div lp-custom-radio="" ng-model="credential.fieldValue" name="radio-{{credential.id}}"" value="true" class="radio-inline">' +
				'Yes' +
			'</div>' +
			'<div lp-custom-radio="" ng-model="credential.fieldValue" name="radio-{{credential.id}}" value="false" class="radio-inline">' +
				'No' +
			'</div>' +
		'</div>' +
		'<div ng-switch-default>' +
			'<input type="text" class="form-control" ng-model="credential.fieldValue" aria-label="{{credential.inputFieldLabel}}" />' +
		'</div>' +
	'</div>';
});
