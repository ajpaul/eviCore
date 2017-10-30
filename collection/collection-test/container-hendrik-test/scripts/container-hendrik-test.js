/* global b$ */
(function () {
    'use strict';

    var Container = b$.bdom.getNamespace('http://backbase.com/2013/portalView').getClass('container');
 
    Container.extend(function($http, $q) {
        Container.apply(this, arguments);
        this.isPossibleDragTarget = true;
    }, {
        localName: 'templateHendrikTest',
        namespaceURI: 'templates_templateHendrikTest'
    }, {
        template: function(json) {
            var data = {item: json.model.originalItem};
            return window[this.namespaceURI][this.localName](data);
        },
        handlers: {
            DOMReady: function(){
                //add code, DOM ready

                window.gadgets.pubsub.subscribe('hendrik.events.loadContainer', function() { 
                    
                    // my profile connection strings
                    var container = 'panel-container-42610';
                    var containerXml = 'panel-container-42610.xml';
                    var containerHtml = 'panel-container-42610.html';
                    
                    //var insertBeforeVC = false; // vc = view controller?

                    $.get(b$.portal.config.serverRoot + '/portals/retail-demo/containers/' + container, function(data){
                        console.log(data);

                        // taken from Matt's Keybank file
                        var head = data.substring(0, data.indexOf('<body>')) + '</html>';
                        var body = data.substring(data.indexOf('<body>') + 6, data.indexOf('<script type="text/backbase-xml'));
                        var xmp = '';

                        if (data.indexOf('<script type="text/backbase-xml">') !== -1) {
                            xmp = data.substring(data.indexOf('<script type="text/backbase-xml">') + 33, data.indexOf('</script>', data.indexOf('<script type="text/backbase-xml">') + 33));
                        }

                        var htmlAPI = b$._private.htmlAPI;
                        var XMLHelper = b$._private.xml;
                        var xml = XMLHelper.parse(head);

                        //console.log(head);
                        //console.log(body);
                        //console.log(xmp);
                        //console.log(xml);

                        b$.portal._private.definition.getResourcesFromDefinition(xml, '', function (body) {
                            
                            console.log(htmlAPI); // this looks like a Backbase thing?
                            var htmlNode = htmlAPI.createElementFromString(body);
                            var xml = XMLHelper.parse(xmp);
                            var bdocModel = b$.portal.portalModel;

                            //var elm = oDestVC.model;
                            //var htmlArea = iHtmlArea || 0;
        
                            // if (insertBeforeVC) {
                            //     b$.portal.portalView.getElementById(b$.portal.portalReflector.getID(elm)).htmlAreas[htmlArea].insertBefore(htmlNode, insertBeforeVC.htmlNode);
                            // } else {
                            //     b$.portal.portalView.getElementById(b$.portal.portalReflector.getID(elm)).htmlAreas[htmlArea].appendChild(htmlNode);
                            // }


                            //var e = b$.portal.portalView.getElementById(b$.portal.portalReflector.getID(elm));//.htmlAreas[0].appendChild(htmlNode);
                            //console.log(e);

                            // b$.portal.importPortalModel(xml, bdocModel, elm, htmlNode);
        
                            // if (callback && typeof callback === 'function') {
                            //     callback(htmlNode);
                            // }


                            // tests
                            // grab my container 1
                            var containerView = b$.getVC(document.querySelector('.template-hendrik-test'));
                            var containerModel = containerView.model;

                            // grab my container 2 to move into container 1
                            var containerViewInner = b$.getVC(document.querySelector('.template-second'));
                            var containerViewInnerInnerModel = containerViewInner.model;

                            containerModel.appendChild(containerViewInnerInnerModel);                            
                        });

                    })

                    //get all containers
                    // $.get(b$.portal.config.serverRoot + '/portals/retail-demo/containers/', function(data){
                    //     console.log(data);
                    // });
                    
                    //renders
                    //http://localhost:7777/portalserver/portals/retail-demo/containers/panel-container-42610

                    //gets xml
                    //http://localhost:7777/portalserver/portals/retail-demo/containers/panel-container-42610.xml
                });
            },
            preferencesSaved: function(event){
                if(event.target === this) {
                    this.refreshHTML(function(item){
                        //add code, HTML refreshed
                    });
                }
            }
        }
    });
})();
