/**
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : login.js
 *  Description:
 *
 *  Source code for CXP Universal login widget
 *  ----------------------------------------------------------------
 */
b$ = b$ || {};
b$.universal = b$.universal || {};
b$.universal.widgets = b$.universal.widgets || {};
b$.universal.widgets.LoginWidget = (function($) {
    'use strict';

    var Login = {
        /**
         * Mapping of validation messages
         * @type {Object}
         */
        messages: {},

        /**
         * Initialize login widget applying params set in preferences
         * @param  {Object} oWidget Backbase widget object
         */
        start: function(oWidget) {
            var self = this;

            // General
            var $widget = $(oWidget.body);
            var $loginError = $widget.find('[data-response-message]:first-child').hide();

            // Login section
            var $loginForm = $('form.login', $widget);
            var $username = $loginForm.find('[name="j_username"]');
            var $usernameError = $username.siblings('[role="error"]').hide();
            var $password = $loginForm.find('[name="j_password"]');
            var $passwordError = $password.siblings('[role="error"]').hide();
            $.each([$username, $password], function(){
                this.on('focus', function(){
                    $(this).closest('.form-group').removeClass('has-error');
                    $(this).siblings('[role="error"]').hide();
                    $loginError.empty().hide();
                });
                this.on('keydown', function(ev){
                    if (ev.which === 13) {
                        $widget.find('.login [data-button-submit]').trigger('click');
                    }
                });
            });

            // Logout section
            var $loggedInUser = $widget.find('.logout .username');

            var redirectUrl = self.getParameterByName('redirect'),
                nextUrl,
                loggedOutNextUrl;
            // Get preferences
            if (!redirectUrl) {
                nextUrl = oWidget.getPreference('nextPage');
                loggedOutNextUrl = oWidget.getPreference('loggedOutNextPage');
            }
            var messagesSrc = oWidget.getPreference('messagesSrc');

            // Load messages
            if (messagesSrc){
                $.ajax({
                    type: 'GET',
                    url: messagesSrc.replace(/\$\(contextRoot\)/g, b$.portal.config.serverRoot)
                }).then(function(response){
                    self.messages = JSON.parse(response);

                    // Additional mapping for Spring security response messages
                    self.messages.LOGIN['Bad credentials'] = self.messages.LOGIN.CANNOT_AUTHENTICATE;
                });
            }

            // Check if already logged in
            var currentUser = b$.portal.loggedInUserId;
            if (currentUser && currentUser !== 'null') {
                $widget.find('> .cxp-universal-login').removeClass('logged-out').addClass('logged-in');
                $loggedInUser.text(currentUser);
            }

            // Log in click handler
            $widget.on('click', '.login [data-button-submit]', function(ev) {
                var $submit  = $(this);
                var errorMessage = '';

                var username = $username.val();
                if (!username) {
                    $loginForm.find('[name="j_username"]').closest('.form-group').addClass('has-error');
                    $usernameError.text(self.messages.LOGIN.MISSING_USERNAME).show();
                }

                var password = $password.val();
                if (!password){
                    $loginForm.find('[name="j_password"]').closest('.form-group').addClass('has-error');
                    $passwordError.text(self.messages.LOGIN.MISSING_PASSWORD).show();
                }

                if (username && password) {
                    $.ajax({
                        type: 'POST',
                        url: b$.portal.config.serverRoot + $submit.attr('data-button-submit'),
                        data: {
                            'j_username': username,
                            'j_password': password
                        },
                        beforeSend : function() {
                            $loginError.empty().hide();
                            $submit.prop('disabled', true).addClass('btn-loading');
                        },
                        complete : function() {
                            $submit.prop('disabled', false).removeClass('btn-loading');
                        }
                    })
                    .then(function(response) {
                        var $response = $('authenticationResult', response);
                        if ($response.find('isSuccess').text() === 'true'){
                            if(redirectUrl || nextUrl && nextUrl !== '0') {
                                self.performRedirect(redirectUrl, nextUrl);
                            } else {
                                window.location.reload();
                            }
                        } else {
                            var errorCode = $response.find('code').text();
                            $loginError.text(self.messages.LOGIN[errorCode]).show();
                        }

                    }, function(xhr) {
                        var errorCode = $('code', xhr.responseText).text();
                        $loginError.text(self.messages.LOGIN[errorCode]).show();
                    });
                }

                ev.preventDefault();
                ev.stopPropagation();
            });

            // Log out click handler
            $widget.on('click', '.logout [data-button-submit]', function(ev){
                var $submit  = $(this);

                $.ajax({
                    type: 'POST',
                    url: b$.portal.config.serverRoot + $submit.attr('data-button-submit'),
                    beforeSend : function() {
                        $submit.prop('disabled', true).addClass('btn-loading');
                    },
                    complete : function() {
                        $submit.prop('disabled', false).removeClass('btn-loading');
                    }
                })
                .then(function(response) {
                    // Redirect
                    if(loggedOutNextUrl && loggedOutNextUrl !== '0') {
                        self.performRedirect(null, loggedOutNextUrl);
                    }
                    else {
                        window.location.reload();
                    }

                }, function(error) {
                });
            });

            // Show widget
            $widget.find('.cxp-universal-login').removeClass('cloak');
        },

        /**
         * Get query string param by name
         * @param  {String} name - name of query string param
         * @return {String} - query string param value
         */
        getParameterByName: function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        /**
         * Redirect to link by uuid
         * @param {String} url - redirect URL
         * @param {String} linkUuid - UUID of the link to redirect
         */
        performRedirect: function(url, linkUuid){
            if (url) {
                window.location.href = url;
            } else {
                $.ajax({
                    type: 'GET',
                    url: b$.portal.config.serverRoot + '/portals/' + b$.portal.portalName + '/links.xml?f=uuid(eq)' + linkUuid
                })
                .then(function(response){
                    var path = $('link > path', response).text();
                    window.location.href = path;
                });
            }
        }
    };

    return Login;
})(jQuery);