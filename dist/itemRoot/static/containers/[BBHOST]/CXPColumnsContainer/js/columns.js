(function () {
    var Container = b$.bdom.getNamespace('http://backbase.com/2013/portalView').getClass('container'),
        errorMessageTPL = '<tr><td colspan="3"><ul class="bp-ColumnsContainer-errormsg" style="color:red;display:none"></ul></td></tr>',
        errorMessages = {
            doesNotMatchColumns: 'The number of columns and number of column widths do not match.',
            notAllowedValueGutter: 'The value for gutter is not allowed put the value in pixels.',
            notAllowedValueMarginTop: 'The value for margin top is not allowed put the value in pixels.'
        },
        getLengthOfNumber = function (num){
            return String(num).length;
        },
        validators = {
            matchColumns: function (aWidths, numberOfColumns) {
                return aWidths.length === numberOfColumns
            },
            suffix: function (input, expectedSuffix, softCheck){
                var suffix,
                    numberStr = input.value,
                    number = parseInt(numberStr, 10),
                    lenNumber,
                    result = false;

                if(!isNaN(number)){
                    lenNumber = getLengthOfNumber(number);

                    if (lenNumber !== numberStr.length) {
                        suffix = numberStr.substr(lenNumber);
                        if (suffix === expectedSuffix) {
                            result = true;
                        }
                    }else{
                        input.value = numberStr + expectedSuffix;
                        result = true;
                    }
                }else if(numberStr.length === 0 && softCheck){
                    result = true;
                }

                return result;
            }
        },
        ColumnsContainer = Container.extend(function (bdomDocument, node) {
                Container.apply(this, arguments);
                this.isPossibleDragTarget = true;
            },
            {
                localName: 'ColumnsContainer',
                namespaceURI: 'universal',
                preparePrefs: function () {
                    var aPrefs, order, aNewPrefs, i, j, orderLen, prefsLen;

                    // filter preferences for view
                    aPrefs = b$.portal.portalModel.filterPreferences(this.model.preferences.array);
                    prefsLen = aPrefs.length;

                    // the order to appear in form
                    order = ['numberOfColumns', 'columnWidths', 'gutter', 'marginTop'];
                    orderLen = order.length;
                    aNewPrefs = [];

                    for (i = 0; i < orderLen; i++) {
                        for (j = 0; j < prefsLen; j++) {
                            if (order[i] == aPrefs[j].name) {
                                aNewPrefs.push(aPrefs[j]);
                            }
                        }
                    }

                    // error message to be shown when column and number of width values do not match
                    aNewPrefs.push(errorMessageTPL);

                    return aNewPrefs;
                },
                guttersEven: function (gutter, numberOfColumns) { // calculates the position of the gutters for even number of gutters
                    // get box dimensions
                    var oBox = b$._private.htmlAPI.getBoxObject(this.htmlNode, 'border'),
                        columnWidthMax = oBox.w / numberOfColumns,
                        columnWidth = (oBox.w - (gutter * (numberOfColumns - 1))) / numberOfColumns,
                        columnMarginTotal = columnWidthMax - columnWidth,
                        halfGutters = Math.floor(numberOfColumns / 2),
                        aNewMargins = [],
                        lastRight,
                        i;

                    for (i = 0; i <= halfGutters; i++) {
                        if (i === 0) {
                            aNewMargins.push(columnMarginTotal / 2);
                            lastRight = columnMarginTotal / 2;
                        } else if (i == halfGutters) {
                            aNewMargins.push(columnMarginTotal);
                            aNewMargins.push(0);
                        } else {
                            var left = gutter - lastRight;
                            lastRight = columnMarginTotal - left;
                            aNewMargins.push(left);
                            aNewMargins.push(lastRight);
                        }
                    }
                    return this.createSeries(aNewMargins);
                },
                guttersOdd: function (gutter, numberOfColumns) { // calculates the position of the gutters for odd number of gutters
                    var middleMargin = gutter / 2,
                        halfGutters = numberOfColumns / 2,
                        difPart = middleMargin / halfGutters,
                        aNewMargins = [],
                        i;

                    for (i = 0; i <= halfGutters; i++) {
                        if (i === 0) {
                            aNewMargins.push(middleMargin);
                        } else if (i == (halfGutters)) {
                            aNewMargins.push(0);
                        } else {
                            var left = middleMargin - (i * difPart);
                            var right = middleMargin + (i * difPart);
                            aNewMargins.push(left);
                            aNewMargins.push(right);
                        }
                    }
                    return this.createSeries(aNewMargins);
                },
                createSeries: function (aNewMargins) { // creates full series of positions for the gutters from a half one
                    var j, lastSerie, firstSerie, fullSeries;

                    for (j = 0; j < aNewMargins.length; j++) {
                        aNewMargins[j] = Math.round(aNewMargins[j]);
                    }

                    lastSerie = aNewMargins.join();
                    firstSerie = aNewMargins.reverse().join();
                    fullSeries = firstSerie.concat(',', lastSerie);

                    return fullSeries;
                },
                renderErrors: function (oForm, errors) {
                    var errorContainer = b$.ua.querySelector(oForm.htmlNode, '.bp-ColumnsContainer-errormsg');
                    errorContainer.innerHTML = '';
                    if (errors.length) {
                        errors.forEach(function (key) {
                            var error = document.createElement('li'),
                                message = document.createTextNode(errorMessages[key]);
                            error.appendChild(message);
                            errorContainer.appendChild(error);
                        });
                        errorContainer.style.display = "";
                    } else {
                        errorContainer.style.display = 'none';
                    }
                },
                validateValues: function (oForm, event) { // validates if the number of columns is equal to number of column widths otherwise show error msg
                    // get values from the form
                    var numberOfColumns = parseInt(oForm.htmlNode.elements['numberOfColumns'].value),
                        columnWidths = oForm.htmlNode.elements['columnWidths'].value,
                        gutter = oForm.htmlNode.elements['gutter'],
                        marginTop = oForm.htmlNode.elements['marginTop'],
                        aWidths = columnWidths.split(','),
                        expectedSufix = 'px',
                        errors = [];

                    if (!validators.matchColumns(aWidths, numberOfColumns)) {
                        errors.push('doesNotMatchColumns');
                    }

                    if(!validators.suffix(gutter, expectedSufix)){
                        errors.push('notAllowedValueGutter');
                    }

                    if(!validators.suffix(marginTop, expectedSufix, true)){
                        errors.push('notAllowedValueMarginTop');
                    }

                    if (errors.length) {
                        this.renderErrors(oForm, errors);
                        if (event) {
                            event.stopImmediatePropagation();
                        }
                    }
                }
            },
            {
                template: function (json) {
                    var data = {item: json.model.originalItem};
                    var sTemplate = window.templates_ColumnsContainer.ColumnsContainer(data);
                    return sTemplate;
                },
                handlers: {
                    'preferences-form': function (event) {
                        var aNewPrefs;
                        if (event.target == this) {
                            aNewPrefs = this.preparePrefs();
                            event.detail.customPrefsModel = aNewPrefs;
                        }
                    },
                    'preferenceFormReady': function (event) {
                        var oContainer = event.target.parentNode, i, elementsLen;
                        if (oContainer == this) {
                            b$._private.html.addEventListener(event.target, 'save', function (evt) {
                                oContainer.validateValues(event.target, evt);
                            }, false);
                            elementsLen = event.target.htmlNode.elements.length
                            // setting change listener on input for IE8
                            for (i = 0; i < elementsLen; i++) {
                                b$._private.html.addEventListener(event.target.htmlNode.elements[i], 'change', function () {
                                    oContainer.validateValues(event.target);
                                }, false);
                            }

                            oContainer.validateValues(event.target);
                        }
                    },
                    'savePreferenceForm': function (event) {
                        var oContainer = event.target.parentNode,
                            gutter,
                            numberOfColumns,
                            fullSeries;
                        if (oContainer == this) {
                            gutter = parseInt(event.detail.gutter.split('px')[0]);
                            numberOfColumns = parseInt(event.detail.numberOfColumns);

                            // based on number of gutters call correct gutter calculation
                            if (numberOfColumns % 2 == 1) {
                                fullSeries = this.guttersEven(gutter, numberOfColumns);
                            } else {
                                fullSeries = this.guttersOdd(gutter, numberOfColumns);
                            }

                            event.detail.gutterMargins = fullSeries;
                        }
                    },
                    'preferencesSaved': function (event) {
                        var oContainer = event.target;
                        if (oContainer == this) {
                            event.target.refreshHTML();
                        }
                    }
                }
            }
        );
})();