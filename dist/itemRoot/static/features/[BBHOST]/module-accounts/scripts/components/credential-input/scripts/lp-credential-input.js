define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.lpCredentialInput = function($templateCache) {

		var inputTypes = {
			'TEXT': 'text',
			'PASSWORD': 'password',
			'OPTIONS': 'select',
			'LOGIN': 'text',
			'CHECKBOX': 'checkbox',
			'RADIO': 'radio',
			'URL': 'text',
			'HIDDEN': 'hidden',
			'IMAGE_URL': 'img',
			'CONTENT_URL': 'text',
			'CUSTOM': 'text',
			'CLUDGE': 'text',
			'TOKEN': 'text',
			'IMAGE_DATA': 'imgd'
		};

		function formatCredentialType(credential) {
			if (credential && credential.inputFieldType) {
				credential.inputFieldType = inputTypes[credential.inputFieldType];

				if(credential.inputFieldType === inputTypes.CHECKBOX) {
					credential.fieldValue = [];
				}
			}
		}

		$templateCache.put('$credentialInput.html', require('../templates/credential-input'));

		return {
			restrict: 'A',
			// replace: true,
			scope: {
				credential: '=lpCredentialInput'
			},
			template: $templateCache.get('$credentialInput.html'),
			link: function (scope, element, attrs, ngModelCtrl) {
				formatCredentialType(scope.credential);

				scope.handleMultiCheckbox = function(option) {
					var found = false;

					for(var i = 0; i < scope.credential.fieldValue.length; i++) {
						if(scope.credential.fieldValue[i] === option) {
							found = true;
							scope.credential.fieldValue.splice(i, 1);
							break;
						}
					}

					if(!found) {
						scope.credential.fieldValue.push(option);
					}
				};
			}
		};
	};
});
