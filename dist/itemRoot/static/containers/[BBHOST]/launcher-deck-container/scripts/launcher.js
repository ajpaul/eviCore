/*global b$, gadgets, bd, window, jQuery, require */

(function (b$, gadgets, bd, $) {
    'use strict';
    // b$.view.url2state.active = false;

    var EVENT_NOTIFY_PANEL_OPEN = 'lp-launcher-panel-open';
    var EVENT_NOTIFY_PANEL_CLOSE = 'lp-launcher-panel-close';

    // var EVENT_PANEL_LOADED = 'DeckPanelLoaded';
    var EVENT_CONTEXT_CHANGED = 'launchpad-retail.activeContextChanged';

    var EVENT_TOGGLE_MENU = 'launchpad-retail.toggleLauncherMenu';
    var EVENT_TOGGLE_SLIDE = 'launchpad-retail.toggleSlideElement';
    var EVENT_CLOSE_ACTIVE_PANEL = 'launchpad-retail.closeActivePanel';
    var EVENT_SET_OFFSET = 'launchpad-retail.offsetTopCorrection';
    var EVENT_ADD_NOTIFICATION = 'launchpad.add-notification';

    var loadedPanels = {};

    /**
     * Checks if element is editable or form element
     * @param  {HTMLElement} inspected element
     * @return {Boolean}
     */
    var isEditable = function(el) {
        var tagName = el.tagName.toLowerCase();
        var editable = el.getAttribute('contenteditable');
        return editable || ['input', 'textarea', 'select', 'button', 'label'].indexOf(tagName) > -1;
    };


    /**
     * <p>Returns true if:
     * <ol>
     *  <li>the value is a boolean and true<br>
     *  <li>the value is a number and not 0<br>
     *  <li>the value is a string and equal to 'true' (after trimming and ignoring case)
     * </ol>
     * @memberOf util
     * @param {*} val The value to parse
     * @return {boolean} A boolean value depending on the parsing result
     */
    var parseBoolean = function(val) {
        return (typeof val === 'boolean' && val) ||
            (typeof val === 'string' && /\s*true\s*/i.test(val)) ||
    (typeof val === 'number' && val !== 0);
    };



    var DeckContainer = b$.bdom.getNamespace('launchpad').getClass('DeckContainer');
    //  ----------------------------------------------------------------
    DeckContainer.extend(function (bdomDocument, node) {
        DeckContainer.apply(this, arguments);
        this.isPossibleDragTarget = false;
    }, {
        localName: 'LauncherDeckContainer',
        namespaceURI: 'launchpad',

        /**
         * Sets up the container by creating 2 initial panels inside the container
         * @constructor
         */
        DOMReady: function(ev) {
            var initialized = parseBoolean(this.getPreference('initialized'));

            if(!initialized){
                // Initialize Launcher Container
                this._initialize(ev);
            } else {
                // Initialize Deck Container
                DeckContainer.prototype.DOMReady.call(this, ev);
                this._addHandlers();
            }
        },


        _initialize: function() {
            var defaultPanelName = this._getNewPanelName();
            this.setPreference('initialized', true);
            this.setPreference('defaultPanel', defaultPanelName);
            this.model.save();


            // Add 2 initial panels
            this.addPanel(this._getNewPanelData({
                id: defaultPanelName,
                order: '0',
                panel: 'mainhidden',
                title: 'Default panel',
                loadChildren: 'true'
            }));

            this.addPanel(this._getNewPanelData({order: '1'}));
        },


        /**
         * Add launcher handlers
         */
        _addHandlers: function(){
            var self = this;
            var UI = this._getUI();
            this.dir = document.dir || document.getElementsByTagName('html')[0].getAttribute('dir');

            require(['hammerjs'], function(Hammer) {

                // Enable mobile-device events
                if(typeof Hammer !== 'undefined' && !bd.designMode && ('ontouchstart' in window)) {
                    var element = document.body;
                    var eventType = 'swipe';
                    var mc = $(element).data('touch');
                    if (!mc) {
                        mc = new Hammer( element, {
                            'swipe_velocity': 0.4
                        });
                        $(element).data('touch', mc);
                    }
                    mc.on(eventType, self._swipeHandler.bind(self));
                }
            });

            UI.container.on('click', '[data-action="lp-tab-open"]', $.proxy(this, '_tabClickHandler'));
            UI.container.on('click', '[data-action="lp-tab-hide"]', $.proxy(this, '_closeActivePanel'));

            gadgets.pubsub.subscribe(EVENT_TOGGLE_MENU, $.proxy(this, '_toggleLauncherMenuHandler'));
            gadgets.pubsub.subscribe(EVENT_TOGGLE_SLIDE, $.proxy(this, '_toggleSlideElement'));
            gadgets.pubsub.subscribe(EVENT_CLOSE_ACTIVE_PANEL, $.proxy(this, '_closeActivePanel'));
            gadgets.pubsub.subscribe(EVENT_SET_OFFSET, $.proxy(this, '_offsetTopCorrection'));
            gadgets.pubsub.subscribe(EVENT_ADD_NOTIFICATION, $.proxy(this, '_sessionHandler'));

        },

        _offsetTopCorrection: function(offset){
            if(offset && offset.offsetTopCorrection){
                $(this.htmlNode).css({
                    'margin-top': offset.isStatic ? '' : offset.offsetTopCorrection
                });
            }
        },

        _notifyChildren: function(eventName, panel){
            function notifyChildren (vc) {
                $.each(vc.childNodes || [], function () {
                    if (this.childNodes && this.childNodes.length) {
                        notifyChildren(this);
                    } else {
                        this.dispatchCustomEvent(eventName, panel);
                    }
                });

            }
            if (panel) {
                notifyChildren(panel);
            }
        },

        _swipeHandler: function(ev){
            var eventType = ev.type;
            var dir = ev.direction;
            // prevent left/right swipes from scrolling page
            ev.preventDefault();

            // Check both LTR and RTL
            if(eventType === 'swipe' && (dir === 4 || dir === 2) ) {
                var toggleClass = (dir === 4 && this.dir === 'ltr' || dir === 2 && this.dir === 'rtl');
                this._toggleLauncherMenu(toggleClass);
            }
        },

        _findModel: function($current) {
            var $mainLi;
            var $parentUl = $current.closest('ul');
            var isChild = $parentUl.hasClass('lp-lc-2ndlevel');
            if (isChild) {
                $mainLi = $parentUl.closest('li');
            } else {
                $mainLi = $current.closest('li');
            }
            var mainId = $mainLi.attr('data-panel');
            var mainModel = b$.portal.portalModel.all[mainId];

            if (isChild) {
                // try _children first as childNodes.length will be 0 when is not preloaded
                var mod = this._getName(mainModel._children || mainModel.childNodes, $current.closest('li').attr('data-panel'));
                return {
                    model: mod,
                    main: mainModel
                }
            }
            return {
                model: mainModel,
                main: mainModel
            }
        },

        _getName: function(childs, name) {
            var i, res;
            for (i = 0; i < childs.length; i++) {
                if (childs[i].name === name) {
                    return childs[i];
                }
                if (childs[i].childNodes) {
                    res = this._getName(childs[i].childNodes, name);
                    if (res) return res;
                }
            }
        },


        _tabClickHandler: function(ev) {
            var $current = $(ev.currentTarget);
            var $li = $current.closest('li');

            if (!$current.hasClass('external-link')){
                if (ev.preventDefault) ev.preventDefault();

                var currentId = $li.attr('data-panel');

                var current = this._findModel($current);
                var panelPref = current.model.getPreference ? current.model.getPreference('panel') : undefined;

                var tabType = (panelPref === undefined) ? '2ndLevel' :
                    (panelPref.indexOf('2nd') > -1) ? '2ndParent' : '1st';

                var isActive;
                if (tabType === '2ndLevel') {
                    isActive = $current.closest('.lp-launcher-tab').hasClass('active');
                    if (isActive) {
                        this._closeActivePanel();
                    } else {
                        this._show2ndLevelPanel(current.main.name, currentId, $li);
                    }
                } else {
                    if (tabType === '2ndParent' && !bd.designMode) {
                        var $ul2nd = $li.children('ul');
                        // when hiding close if some child is open
                        var isActive = $ul2nd.find('.lp-launcher-tab.active').length !== 0;
                        if (isActive) this._closeActivePanel();

                        $ul2nd.toggleClass('hide');
                        $li.toggleClass('lp-launcher-open lp-launcher-close');
                        this._toggleTab($li);
                    } else {
                        this.showPanel(currentId, true);
                    }
                }
            }
        },

        _show2ndLevelPanel: function(mainId, subId, $li) {
            var self = this;
            var inDeck;
            var callback = function(item) {
                self._toggleTab($li);
                inDeck = getFirstChildDeck(b$.portal.portalView.all['VIEW-' + mainId].childNodes);
                if (!inDeck) return;
                setTimeout(function() {
                    inDeck.showPanel(subId);
                    var inSub = b$.portal.portalView.all['VIEW-' + subId];
                    var header = self._getArea(mainId).find('.widget-title');
                    var title = inSub.model.getPreference('title');
                    header.find('.--lp-i18n').text(title).attr('data-lp-i18n', title);
                    setSlug(1, title);
                    var headerIcon = header.find('.lp-icon');
                    var prevClass = headerIcon.attr('class').match(/lp-icon-\S+/);
                    headerIcon.removeClass(prevClass && prevClass[0]);
                    headerIcon.addClass('lp-icon-' + (inSub.model.getPreference('icon') || 'star-empty'));
                }, 50);
            };
            this.showPanel(mainId, true, callback);
            // callback will not fire when main is already loaded, so trigger it if deck is there
            inDeck = getFirstChildDeck(b$.portal.portalView.all['VIEW-' + mainId].childNodes);
            if (inDeck) callback(inDeck);
        },

        /**
         * make sure user will see sidebar with login screen after get logged out
         * @param  {object} pubsub message
         */
        _sessionHandler: function(data) {
            if(data && data.notification && data.notification.id === 'session-expired'){
                this._toggleLauncherMenu(true);
            }
        },


        _getUI: function() {
            var container = $(this.htmlNode),
                content = this.getDisplay('content');

            this._ui = {
                container: container,
                main: this.getDisplay('main'),
                left: this.getDisplay('left'),
                content: content,
                areas: $(content).children('.lp-launcher-area')
            };

            return this._ui;
        },


        refreshHTML: function(callback, errCallback) {
            // console.log('refreshHTML');
            this._hideOverlay();
            var current = this.state;
            // var t1 = new Date().getTime();
            $(this.htmlNode).addClass('lp-lc-refresh');
            DeckContainer.prototype.refreshHTML.call(this, function(bres, res){
                // var t2 = new Date().getTime();
                // console.log('refreshed',  t2 - t1, 'ms');
                if (current) setTimeout(function() {
                    $('a[href=#' + current + ']').trigger('click');
                }, 100);
                if (typeof callback === 'function') {
                    callback(bres, res);
                }
            }, errCallback);
        },

        _getDefaultPanel: function() {
            var defaultPanel = this.getPreference('defaultPanel');
            // check if element is extended from the Masterpage
            var name = this.model && this.model.name.split('~');
            return this.getPanel(defaultPanel + (name.length === 2 ? '~' + name[1] : ''));
        },

        _toggleClass: function($li) {
            $li.children('.lp-launcher-tab')
            .toggleClass('active')
            .find('.lp-launcher-tab-arrow > i')
            .toggleClass('lp-icon-cross');
        },

        // $el - $li of the tab to toggle or undefined
        _toggleTab: function($el) {
            var UI = this._getUI();
            var $active = $(UI.left).find('.lp-launcher-tab.active');
            if ($el === undefined) $el = $active.closest('li');
            if (!$el || !$el.length) return;
            $active = $active.closest('li');
            var toggle = $active[0] !== $el[0];

            if (toggle) {
                var panel = this.getPanel($el.data('panel'));
                this._notifyChildren(EVENT_NOTIFY_PANEL_OPEN, panel);
            }
            this._toggleClass($el);
            if ($active.length && toggle) {
                this._toggleClass($active);
                this._notifyChildren(EVENT_NOTIFY_PANEL_CLOSE, $active.data('panel'));
            }
        },

        /**
         * Displays a panel given an index or a name. Launcher Container specific.
         * Launcher Container might have several "active" (visible) panels
         *  @param panelId: (string) name or index of the panel to be shown
         */
        showPanel: function(panelId, clicked, callback) {
            var panel = this.getPanel(panelId);
            if (!panel) {
                if (callback) callback(new Error('Invalid Panel'));
                return;
            }
            if (typeof panelId !== 'string') panelId = panel.model.name;
            var self = this;
            var UI = this._getUI();
            var defaultPanel = this.getPreference('defaultPanel');
            var isDefault = defaultPanel && panel && panel.model.name.indexOf(defaultPanel) > -1;
            var isActive, isHidden, is2ndLevel;
            var $defaultPanel = $(this.getDisplay('default'));

            var area = this._getArea(panelId);
            var tab = this._getTab(panelId);

            function findChildWidgets(root) {
                var widgets = [];
                root.childNodes.forEach(function(node) {
                    if (node.tagName === 'backbaseWidget') {
                        widgets.push(node.id);
                    }
                    else if (node.childNodes && node.childNodes.length) {
                        widgets.push.apply(widgets, findChildWidgets(node));
                    }
                });
                return widgets;
            }

            function allLoaded() {
                var allWidgets = findChildWidgets(panel);
                var loadedWidgetsCount = 0;

                loadedPanels[panelId] = true;

                gadgets.pubsub.flush('cxp.item.loaded');
                gadgets.pubsub.subscribe('cxp.item.loaded', cxpItemLoaded);

                function cxpItemLoaded(item) {
                    if (allWidgets.indexOf(item.id) > -1) {
                        loadedWidgetsCount++;
                    }

                    if (loadedWidgetsCount === allWidgets.length) {
                        gadgets.pubsub.unsubscribe('cxp.item.loaded', cxpItemLoaded);
                        area.removeClass('loading');
                    }
                }
            }

            if (!loadedPanels[panelId]) {

                area.addClass('loading');

                var loadedChildren = [];
                this._loadChildren(panel, function(item) {
                    loadedChildren.push(item);
                    if (loadedChildren.length === panel.model._children.length) {
                        allLoaded(loadedChildren);
                    }
                });

                // Before children are loaded we have them defined in the model,
                // but if panel is empty "loading" class in not going to be removed (since 
                // callback where it is removed is ignored in portalClient).
                // So here we have to remove the class according to the model.
                if (!panel.model.hasOwnProperty('_children')) {
                    area.removeClass('loading');
                }
            }



            if (tab.hasClass('lp-launcher-slide')){
                tab.toggleClass('lp-launcher-open lp-launcher-close')
                .addClass('lp-launcher-animating');

                setTimeout(function() {
                    tab.removeClass('lp-launcher-animating');
                }, 500);
            }
            else {

                if(tab.children('a.lp-lc-tab-inlinehidden').length > 0){
                    return;
                }
                isActive = area.hasClass('active');
                isHidden = area.hasClass('lp-launcher-area-mainhidden');
                is2ndLevel = tab.find('ul').hasClass('lp-lc-2ndlevel');

                if (!is2ndLevel && (isDefault || isActive && (!isHidden || isHidden && clicked))) {
                    this._closeActivePanel();

                    if ($defaultPanel.hasClass('lp-launcher-area-fixed')) {
                        setTimeout(function() {
                            $defaultPanel.parent().css('min-height', $defaultPanel.outerHeight());
                        }, 100);
                    }
                } else {
                    setSlug(0, panel.model.getPreference('title'));
                    this._toggleTab(tab);
                    self._showOverlay();

                    // After animation is over focus will be returned to the last focused element
                    setTimeout(function() {
                        area.focus();
                        self._fixOverflow();
                    }, 400);

                    UI.areas.hide().removeClass('active');
                    area.show().addClass('active');
                    if ($defaultPanel.hasClass('lp-launcher-area-fixed')) {
                        $defaultPanel.show();
                    }

                    self._toggleLauncherMenu(false);
                    self._animateScrollToElement(0);

                    // Update state and URL
                    self.state = panelId;
                    self.pageTitle = panel.model.getPreference('title');
                    self._updateState(self.pageTitle);

                    // Attach keyboard listeners - use document for ie8
                    $(document).on('keydown.launcherKeys', $.proxy(this, '_keydownHandler'));

                    // Fire events
                    // gadgets.pubsub.publish(EVENT_PANEL_LOADED, panelId);
                }
            }
        },

        /**
         * Overwrite Deck
         * @return {[type]} [description]
         */

        removePanel: function(id) {
            var self = this;
            var panel = this.getPanel(id);
            panel.model.destroyAndSave(function(){
                self.refreshHTML();
            });
        },

        enhancePreferenceForm: function(ev){
            ev.stopPropagation();
        },


        getPanel: function(panelId) {
            return (panelId && panelId.model) ? panelId :
                DeckContainer.prototype.getPanel.call(this, panelId);
        },

        /**
         * fix negative margin (view cropping) issue
         */
        _fixOverflow: function() {
            var container = $(this.htmlNode);
            container.css('overflow', 'visible').css('overflow', '');
        },


        _getTab: function(panelId) {
            var ui = this._getUI();
            return $(ui.left).children('[data-panel="' + panelId + '"]');
        },

        _getArea: function(panelId) {
            var container = $(this.htmlNode);
            return container.find('.lp-launcher-area[data-panel="' + panelId + '"]');
        },


        /**
         * Extend Deck function which provides data for panel creation
         * @param  {object} data Default values
         * @return {object}
         */
        _getNewPanelData: function(data){
            var order = this._getPanels().length;
            data = data || {};
            data.title = data.title || this.PANEL_NAME_PREFIX + ( order + 1 );

            var props = getCommonPrefs(data);
            props.push({
                name: 'panel',
                label: 'Content (and tab type)',
                value: data.panel || 'main',
                viewHint: 'text-input,designModeOnly,manager'
            }, {
                type: 'boolean',
                name: 'hideChrome',
                label: 'Hide Chrome',
                value: data.hideChrome || 'false',
                viewHint: 'checkbox,designModeOnly,manager'
            });

            return {
                area: data.order || order,
                order: data.order || order,
                id: data.id || this._getNewPanelName(),
                properties: props
            };

        },

        _getPanelByTitle: function(title) {
            if(!title) {
                return;
            }
            var panels = this._getPanels();
            var selectedPanel = panels.filter(function(el){
                return el.getPreference('title') === title;
            });

            return selectedPanel && selectedPanel[0];
        },

        /**
         * Overwrite Deck _displayInitialPanel
         * @return {[type]} [description]
         */
        _displayInitialPanel: function() {
            var self = this;
            var slug = window.location.hash.substr(1);
            this.state = this.getPreference('state') || this.getPreference('defaultPanel');

            // If preloading is turned off we need to lazy load visible inline panels
            $.each(this.childNodes || [], function(){
                var type = this.getPreference('panel');
                var loadChildren = this.getPreference('loadChildren');

                // Trigger loading for panels
                if(type && ['inlinehidden', 'inlineopen'].indexOf(type) > -1 && loadChildren === 'false'){
                    self._loadChildren(this);
                }
            });

            if (!slug || bd.designMode) {
                if (this.state) {
                    this.showPanel(this.state);
                }
                return;
            }

            var slugArr = parseSlug(slug);
            var selectedPanel = this._getPanelByTitle(slugArr[0]);

            if (!selectedPanel) {
                return;
            }

            // first level menu
            if (slugArr.length === 1) {
                this.state = selectedPanel.model.name;
                this.showPanel(this.state);
            }

            // second level
            if (slugArr.length > 1) {
                var $left = $(this.getDisplay('left'));
                var $tabSpan = $left.find('[data-lp-i18n="' + slugArr[0] + '"]');
                var $ul2nd = $tabSpan.closest('li').children('ul');
                if ($ul2nd.length) {
                    if ($ul2nd.hasClass('hide')) {
                        $ul2nd.toggleClass('hide');
                    }
                    $tabSpan = $tabSpan.closest('li').find('[data-lp-i18n="' + slugArr[1] + '"]');
                    if ($tabSpan.closest('a').length) {
                        this._tabClickHandler({currentTarget: $tabSpan.closest('a')[0]});
                        return;
                    }
                }
            }
        },

        /**
         * Overwrite Deck updateUrl
         */
        updateUrl: function(){
            // DeckContainer.prototype.updateUrl.call(this);
        },

        /**
         * publish global event if state changed from inside Launcher
         * @param  {boolean} [optional] state value: true - left panel is open
         */
        _toggleLauncherMenu: function(value){
            gadgets.pubsub.publish(EVENT_TOGGLE_MENU, value);
        },

        _toggleLauncherMenuHandler: function(value){
            $(this.htmlNode).toggleClass('lp-launcher-left', value);
        },


        /**
         * Slides up/down the element with given selector
         * @param {object} data
         * @param {string} data.className
         * @param {integer} [data.duration=300]
         * @param {boolean} [data.state]
         */
        _toggleSlideElement: function(data){
            var el = $(this.htmlNode).find(data.selector);
            var options = {
                duration: data.duration || 300
            };
            if (typeof data.state === 'undefined'){
                el.slideToggle(options);
            } else if (data.state){
                el.slideUp(options);
            } else {
                el.slideDown(options);
            }
        },

        _closeActivePanel: function() {
            var UI = this._getUI();
            this._hideOverlay();

            this._toggleTab();
            setSlug(0);

            UI.areas.hide().removeClass('active');
            $(this.getDisplay('default')).show();

            this.state = null;
            this._updateState();

            // Remove keyboard listeners when widget closes
            $(document).off('.launcherKeys');
            this._fixOverflow();
        },


        /**
         * Publish message with new title for Navbar
         * @private
         */
        _updateState: function(pageTitle) {
            // console.log('_updateState', pageTitle);
            gadgets.pubsub.publish(EVENT_CONTEXT_CHANGED, { newActiveContext: pageTitle || ''});

            // this._updateTitle(pageTitle);
            // b$.view.url2state.active = false;
            // this.updateUrl();
        },


        /**
         * Update window title
         * @private
         */
        _updateTitle: function(pageTitle) {
            var title = document.getElementsByTagName('title')[0];
            if(title && title.innerText){
                title.innerText = pageTitle ? pageTitle : 'Home';
            }
        },


        /**
         * Disable dnd
         * @private
         */
        _setDND: function (value) {
            // disable/restore DND behind overlay
            function setDND (vc, val){
                var parent = vc && vc.parentNode;
                if (parent){
                    if(!val){
                        parent.isPossibleDragTargetCache = parent.isPossibleDragTarget;
                    }
                    if(typeof parent.isPossibleDragTargetCache !== 'undefined'){
                        parent.isPossibleDragTarget = val ? parent.isPossibleDragTargetCache : false;
                    }
                    setDND(parent, val);
                }
            }

            // disable/restore DND to the Default panel while other panel is active
            function setDNDChildren (vc, val){
                var children = vc && vc.childNodes || [];
                if(!val){
                    vc.isPossibleDragTargetCache = vc.isPossibleDragTarget;
                }
                if(typeof vc.isPossibleDragTargetCache !== 'undefined'){
                    vc.isPossibleDragTarget = val ? vc.isPossibleDragTargetCache : false;
                }

                $.each(children, function(){
                    setDNDChildren(this, val);
                });
            }


            var defaultPanel = this._getDefaultPanel();
            if(defaultPanel) {
                setDNDChildren(defaultPanel, value);
            }

            setDND(this, value);
        },


        /**
         * Show Launcher overlay
         * @private
         */
        _showOverlay: function () {
            if (!this.overlay) {
                var overlay = $('.lp-launcher-overlay');
                this.overlay = overlay.length ? overlay :
                    $('<div class="lp-overlay lp-launcher-overlay" style="display: none;" />').appendTo('#main');
            }
            this.overlay.fadeIn('fast');
            $(this.htmlNode).addClass('lp-launcher-overlay-open');

            // disable dnd for all parent items if overlay is open
            this._setDND(false);
        },

        /**
         * Handle Escape button
         */
        _keydownHandler: function(ev) {
            // need to use keyCode for ie8
            if (ev.keyCode === 27) {

                var notEditable = !isEditable(document.activeElement || ev.target);
                // Close panel only if current element is not editable
                if(notEditable){
                    this._closeActivePanel();
                }
            }
        },


        /**
         *
         * @private
         */
        _hideOverlay: function () {
            if (this.overlay) {
                this.overlay.fadeOut('fast');
                $(this.htmlNode).removeClass('lp-launcher-overlay-open');
            }
            // restore dnd for parent items
            this._setDND(true);
        },


        /**
         * Scroll to specific element on the page or the value.
         * @param element
         * @private
         */
        _animateScrollToElement: function(el) {
            var top = el ? (typeof el === 'number' ? el : $(el).offset().top) : 0;
            var body = $('html, body');
            var self = this;

            body.css({scrollLeft: 0})
            .animate({scrollTop: top}, 200, 'swing', function(){
                // it not always scrolls to the top well
                self._fixOverflow();
                body.scrollTop(top);
            });
        },

        /**
         * Destroy callback
         */
        destroy: function () {
            this._hideOverlay();
            return DeckContainer.prototype.destroy.call(this);
        },

        /**
         * Owerwrite portalclient to not reshuffle children based on area property
         * @return {[type]} [description]
         */
        insertDisplayChild: function(){}
    }, {
        template: function(json) {
            var data = {item: json.model.originalItem};
            var sTemplate = window['templates_' + this.localName][this.localName](data);
            return sTemplate;
        },
        handlers: {
            'DOMNodeInsertedIntoDocument': function(ev) {
                if (bd.designMode === 'true') check2ndLevelDeck(ev.target);
            },
            'preferencesSaved': function(ev) {
                // console.log('preferencesSaved', ev);
                var isParentLauncher = ev.target.parentNode.nodeName === 'LauncherDeckContainer';
                var isPanel = ev.target.nodeName === 'PanelContainer';
                var isLauncher = ev.target.nodeName === 'LauncherDeckContainer';
                var is2ndLevelPanel = decks2nd.hasOwnProperty(ev.target.parentNode.model.name);
                if(isLauncher || (isPanel && isParentLauncher) || is2ndLevelPanel) {
                    ev.currentTarget.refreshHTML();
                }
            },
            'DOMNodeRemoved': function(ev) {
                if (!ev.target.model || !decks2nd[ev.target.model.name] || !bd.designMode) return;

                var name = ev.target.model.name;
                var self = this;
                setTimeout(function() {
                    if (decks2nd[name].status === 'init') {
                        if (decks2nd[name].deck.childNodes.length === 0) delete decks2nd[name];
                        runOnce('remove', self.refreshHTML, self);
                    }
                }, 120);
            },
            // 'savePreferenceForm': function(ev) {
            // },
            // 'preferenceFormReady': function(ev){
            // 	console.log('preferenceFormReady', ev);
            // },
            'preferences-form': function(ev) {
                // console.log('preferences-form', this);
                var prefs, aPrefs,
                aNewPrefs = [],
                    target = ev.target,
                    panels = [];

                // Extend Panel preference form
                if(target.nodeName === 'PanelContainer'){

                    prefs = target.model.preferences.array;
                    aPrefs = b$.portal.portalModel.filterPreferences(prefs);
                    aNewPrefs = [];

                    $.each(aPrefs, function(){
                        if (this.name === 'panel') {
                            this.inputType.name = 'select-one';
                            this.inputType.options = [
                                {label: 'Side panel (with expanded tab)', value: 'inlineopen'},
                                {label: 'Side panel (with collapsed tab)', value: 'inline'},
                                {label: 'Side panel (tab without chrome)', value: 'inlinehidden'},
                                {label: 'Main panel (with simple tab)', value: 'main'},
                                {label: 'Main panel (with hidden tab)', value: 'mainhidden'},
                                {label: '2nd Level Parent (expanded)', value: 'opened2nd'},
                                {label: '2nd Level Parent (collapsed)', value: 'closed2nd'}
                            ];
                        }
                        aNewPrefs.push(this);
                    });

                    ev.detail.customPrefsModel = aNewPrefs;
                }

                // add preferences to 2nd level panel settings
                if (decks2nd[target.parentNode.model.name]) {
                    ev.detail.customPrefsModel = set2ndLevelPrefs(target.model);
                }

                // Extend Launcher preference form
                if(target.nodeName === 'LauncherDeckContainer'){
                    prefs = target.model.preferences.array;
                    aPrefs = b$.portal.portalModel.filterPreferences(prefs);


                    $.each(target.childNodes, function(){
                        var panel = this;
                        if(panel.model){
                            panels.push({
                                value: panel.model.name,
                                label: panel.model.getPreference('title')
                            });
                        }
                    });

                    $.each(aPrefs, function(){
                        if (this.name === 'defaultPanel') {
                            this.inputType.name = 'select-one';
                            this.inputType.options = panels;
                        }
                        aNewPrefs.push(this);
                    });

                    ev.detail.customPrefsModel = aNewPrefs;
                }
            }
        }
    });

    // list of iitialized deck containers
    var decks2nd = {};
    // adds 2nd level deck containers to decks2nd object
    // only if deck is the first child of the parent panel
    function check2ndLevelDeck(target) {
        if (!target.parentNode || !target.model || !bd.designMode) return false;

        if (target.parentNode.nodeName === 'LauncherDeckContainer') {
            // TODO: check for manageable area
            var panel = target.getPreference('panel');
            if (panel && panel.indexOf('2nd') > -1) {
                // on init it is in _children, on create it is in childNodes
                var childs, status;
                if (childs = target.model._children) {
                    status = 'init';
                } else if (childs = target.model.childNodes) {
                    if (childs.length) {
                        status = 'create';
                    }
                }
                if (status) {
                    var child = getFirstChildDeck(childs);
                    if (child) {
                        decks2nd[child.name] = {
                            status: status,
                            panel: target,
                            deck: child
                        }
                        runOnce('sync', syncDeckWithTabs);
                        return true;
                    }
                }
            }
        }
        return check2ndLevelDeck(target.parentNode);
    }
    function getFirstChildDeck(childs) {
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].extendedItemName === 'deck-container' || childs[i].nodeName === 'DeckContainer') {
                return childs[i];
            }
        }
        return undefined;
    }

    // refreshes launcher if deck panels and tabs don't much
    function syncDeckWithTabs() {
        var k, deck;
        for (k in decks2nd) {
            deck = decks2nd[k].deck;
            if (deck && deck.childNodes.length) {
                decks2nd[k].counter = 0;
                $.each(deck.childNodes, function() {
                    decks2nd[k].counter++;
                    setPanelPrefs(this, function() {
                        decks2nd[k].counter--;
                        if (decks2nd[k].counter === 0) {
                            decks2nd[k].status = 'create';
                            doSync(decks2nd[k]);
                        }
                    });
                });
            } else {
                setTimeout(function() {
                    runOnce('sync', syncDeckWithTabs);
                }, 100);
                break;
            }
        }
    }

    function doSync(deckObj) {
        var deck = deckObj.deck;
        var deckPanelNames = [];
        var launcherTabNames = [];

        $.each(deck.childNodes, function() {
            if (this.model) deckPanelNames.push(this.model.name);
        });

        var panel = deckObj.panel;
        var launcher = panel.parentNode;

        var tabs = $(launcher.getDisplay('left'))
        .find('li[data-panel=' + panel.model.name + ']')
        .find('li[data-panel]');

        $.each(tabs, function() {
            launcherTabNames.push(this.getAttribute('data-panel'));
        });
        // when deck is first dropped deckPanelNames.length will be zero but it needs refresh
        if (!deckPanelNames.length || deckPanelNames.toString() !== launcherTabNames.toString()) {
            launcher.refreshHTML(function() {
                deckObj.status = 'init';
            });
        }

    }

    var onceFunc = {};
    function runOnce(name, func, context, delay) {
        if (!onceFunc[name]) {
            onceFunc[name] = true;
            setTimeout(function() {
                if (context) func.call(context);
                else func();
                delete onceFunc[name];
            }, delay || 100);
        }
    }

    var slug;
    function setSlug(level, title) {
        if (bd.designMode) return;
        if (!title) slug = undefined;
        else if (level === 0) slug = [title];
        else slug[1] = title;

        if (slug) {
            runOnce('slug', function() {
                window.location.hash = '/' + parseSlug(slug);
            }, this, 200);
        } else {
            window.location.hash = '';
        }
    }
    function parseSlug(slug) {
        if (typeof slug === 'string') {
            return slug.replace(/-/g,' ').split('/').splice(1);
        } else {
            return slug.join('/').replace(/ /g,'-');
        }
    }

    var saveModels = {};
    function setPanelPrefs(model, callback) {
        if (!model.getPreference('icon') && !saveModels[model.name]) {
            saveModels[model.name] = true;
            set2ndLevelPrefs(model, function() {
                delete saveModels[model.name];
                callback();
            });
        }
    }
    function getCommonPrefs(data) {
        data = data || {};
        return [{
            type: 'string',
            name: 'title',
            label: 'Title',
            value: data.title || '',
            viewHint: 'text-input,designModeOnly,manager'
        }, {
            type: 'string',
            name: 'icon',
            value: data.icon || 'star',
            label: 'Icon',
            viewHint: 'text-input,designModeOnly,manager'
        }, {
            type: 'string',
            name: 'customClasses',
            value: data.customClasses || '',
            label: 'Custom Classes',
            viewHint: 'text-input,designModeOnly,manager'
        }, {
            type: 'boolean',
            name: 'loadChildren',
            label: 'Preload content',
            value: data.loadChildren || 'false',
            viewHint: 'checkbox,designModeOnly,manager'
        }];
    }
    function set2ndLevelPrefs(model, callback) {
        var pref;
        var retPrefs = [];
        $.each(getCommonPrefs(), function() {
            pref = model.preferences.getByName(this.name);
            if (!pref) {
                if (this.name === 'icon') {
                    model.setPreference(this.name, 'star-empty');
                } else {
                    model.setPreference(this.name, this.value);
                }
                pref = model.preferences.getByName(this.name);
                pref.viewHint = this.viewHint;
                // its not working only by setting viewHint, so...
                pref.inputType.name = this.viewHint.split(',')[0];
                pref.label = this.label;
                pref.type = this.type;
            }
            retPrefs.push(pref);
        });
        model.save(callback);
        return retPrefs;
    }

})(b$, gadgets, bd, window.jQuery);
