M.qtype_easyomechjs = {}

M.qtype_easyomechjs = {

    showmyresponse: function(Y, moodle_version, slot) {
   /* var handleSuccess = function(o) {};
    var handleFailure = function(o) {

    };
    var callback = {
        success: handleSuccess,
        failure: handleFailure
    };
    if (moodle_version >= 2012120300) { //Moodle 2.4 or higher
        YAHOO = Y.YUI2;
    }  */
    var refreshBut = Y.one("#myresponse" + slot, slot);
   
    refreshBut.on("click", function() {
        var newxmlStr = document.getElementById('my_answer' +
            slot).value;
       
        MarvinJSUtil.getEditor("#EASYOMECH" + slot).then(function(
            sketcherInstance) {
                    //alert("slot="+slot);
            marvinController = new MarvinControllerClass(
                sketcherInstance);
            var pastePromise = marvinController.sketcherInstance
                .importStructure("mrv", newxmlStr);
        });

       var MarvinControllerClass = (function() {
            function MarvinControllerClass(sketcherInstance) {
                this.sketcherInstance = sketcherInstance;
                this.init();
            }
            MarvinControllerClass.prototype.init = function init() {
                this.sketcherInstance.setDisplaySettings({
                    "cpkColoring": true,
                    "lonePairsVisible": true
                });  
            };
            return MarvinControllerClass;
        }());

        //document.getElementById('EASYOMECH' + slot).setMol(
        //    newxmlStr, "mrv");
    });
    },



    showcorresponse: function(Y, moodle_version, slot) {
    /*
    var handleSuccess = function(o) {};
    var handleFailure = function(o) {
      
    };
    var callback = {
        success: handleSuccess,
        failure: handleFailure
    };
    if (moodle_version >= 2012120300) { //Moodle 2.4 or higher
        YAHOO = Y.YUI2;
    } */
    var refreshBut = Y.one("#corresponse" + slot, slot);
    refreshBut.on("click", function() {
        var newxmlStr = document.getElementById('correct_answer' +
            slot).value;
        
        MarvinJSUtil.getEditor("#EASYOMECH" + slot).then(function(
            sketcherInstance) {
                    //alert("slot="+slot);
            marvinController = new MarvinControllerClass(
                sketcherInstance);
            var pastePromise = marvinController.sketcherInstance
                .importStructure("mrv", newxmlStr);
        });

       var MarvinControllerClass = (function() {
            function MarvinControllerClass(sketcherInstance) {
                this.sketcherInstance = sketcherInstance;
                this.init();
            }
            MarvinControllerClass.prototype.init = function init() {
                this.sketcherInstance.setDisplaySettings({
                    "cpkColoring": true,
                    "lonePairsVisible": true
                });  
            };
            return MarvinControllerClass;
        }());

        //document.getElementById('EASYOMECH' + slot).setMol(
        //    newxmlStr, "mrv");
    });
    },






    init_showarrowsrev: function(Y, moodle_version, slot) {
    var handleSuccess = function(o) {};
    var handleFailure = function(o) {
        /*failure handler code*/
    };
    var callback = {
        success: handleSuccess,
        failure: handleFailure
    };
    if (moodle_version >= 2012120300) { //Moodle 2.4 or higher
        YAHOO = Y.YUI2;
    }
    var refreshBut = Y.one("#showorderrev" + slot, slot);
    refreshBut.on("click", function() {
        var xmlStr = document.getElementById('correct_answer' +
            slot).value;
        ///parse xml string        
        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xmlStr, "text/xml");
            // alert('not IE');
        } else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(xmlStr);
        }
        meflowarrows = xmlDoc.getElementsByTagName("MEFlow");
        var arrowtot = meflowarrows.length;
        var currentarrow = Number(document.getElementById(
            'curarrow' + slot).value);
        currentarrow = currentarrow - 1;
        if (currentarrow < 0) {
            currentarrow = arrowtot;
        }
        document.getElementById('curarrow' + slot).value = Number(
            currentarrow);
        //console.log('curarrow='+currentarrow);
        //console.log('prev='+currentarrow);
        xAll = xmlDoc.getElementsByTagName('*');
        var i = 5,
            j, y, counter = 0,
            newxmlStr;
        for (j = xAll.length - 1; j >= 0; j -= 1) {
            y = xAll[j];
            //console.log(y.nodeName)
            if (y.nodeName == 'MEFlow') {
                if (counter == arrowtot - currentarrow) {
                    j = 0;
                } else {
                    y.parentNode.removeChild(y);
                }
                //alert(newxmlStr);
                counter = counter + 1;
                //j=0;
                //}
            }
        }
        //}

        newxmlStr = new XMLSerializer().serializeToString(xmlDoc);

        MarvinJSUtil.getEditor("#EASYOMECH" + slot).then(function(
            sketcherInstance) {
                    //alert("slot="+slot);
            marvinController = new MarvinControllerClass(
                sketcherInstance);
            var pastePromise = marvinController.sketcherInstance
                .importStructure("mrv", newxmlStr);
        });

       var MarvinControllerClass = (function() {
            function MarvinControllerClass(sketcherInstance) {
                this.sketcherInstance = sketcherInstance;
                this.init();
            }
            MarvinControllerClass.prototype.init = function init() {
                this.sketcherInstance.setDisplaySettings({
                    "cpkColoring": true,
                    "lonePairsVisible": true
                });  
            };
            return MarvinControllerClass;
        }());

        //document.getElementById('EASYOMECH' + slot).setMol(
        //    newxmlStr, "mrv");
    });
    },



    init_showarrows: function(Y, moodle_version, slot) {


    var handleSuccess = function(o) {};
    var handleFailure = function(o) {
        /*failure handler code*/
    };
    var callback = {
        success: handleSuccess,
        failure: handleFailure
    };
    if (moodle_version >= 2012120300) { //Moodle 2.4 or higher
        YAHOO = Y.YUI2;
    }
    var refreshBut = Y.one("#showorder" + slot, slot);
    refreshBut.on("click", function() {
        var xmlStr = document.getElementById('correct_answer' +
            slot).value;
        ///parse xml string        
        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xmlStr, "text/xml");
        } else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(xmlStr);
        }
        meflowarrows = xmlDoc.getElementsByTagName("MEFlow");
        var arrowtot = meflowarrows.length;
        var currentarrow = Number(document.getElementById(
            'curarrow' + slot).value);
        currentarrow = currentarrow + 1;
        if (currentarrow > arrowtot) {
            currentarrow = 0;
        }
        document.getElementById('curarrow' + slot).value = Number(
            currentarrow);
        xAll = xmlDoc.getElementsByTagName('*');
        var i = 5,
            j, y, counter = 0,
            newxmlStr;
        for (j = xAll.length - 1; j >= 0; j -= 1) {
            y = xAll[j];
            if (y.nodeName == 'MEFlow') {
                if (counter == arrowtot - currentarrow) {
                    j = 0;
                } else {
                    y.parentNode.removeChild(y);
                }
                counter = counter + 1;
            }
        }
        newxmlStr = new XMLSerializer().serializeToString(xmlDoc);

        MarvinJSUtil.getEditor("#EASYOMECH" + slot).then(function(
            sketcherInstance) {
                 //   alert("slot="+slot);
            marvinController = new MarvinControllerClass(
                sketcherInstance);
            var pastePromise = marvinController.sketcherInstance
                .importStructure("mrv", newxmlStr);
        });

       var MarvinControllerClass = (function() {
            function MarvinControllerClass(sketcherInstance) {
                this.sketcherInstance = sketcherInstance;
                this.init();
            }
            MarvinControllerClass.prototype.init = function init() {
                this.sketcherInstance.setDisplaySettings({
                    "cpkColoring": true,
                    "lonePairsVisible": true
                });  
            };
            return MarvinControllerClass;
        }());

        /*document.getElementById('EASYOMECH' + slot).setMol(
            newxmlStr, "mrv"); */
    });





    },

    insert_easyomechjs_applet: function(Y, toreplaceid, appletid, name,
        topnode, appleturl, feedback, readonly, stripped_answer_id,
        moodleurl, marvinpath) {
        var javaparams = ['mol', Y.one(topnode + ' input.mol').get(
            'value')];
        var easyomechjsoptions = new Array();
        // if (readonly) {
        //     easyomechjsoptions[easyomechjsoptions.length] = Y.one(topnode+' input.mol').get('value');  ///crl 
        // }
        // if (easyomechjsoptions.length !== 0) {
        //       javaparams[javaparams.length] = "mrv";  ///added by crl
        //     javaparams[javaparams.length] = easyomechjsoptions.join(',');
        // }
        if (!this.show_java(toreplaceid, appletid, name, appleturl, 600,
            460, 'chemaxon.marvin.applet.JMSketchLaunch',
            javaparams, stripped_answer_id, moodleurl, marvinpath)) {
            this.show_error(Y, topnode);
        } else {
            var marvinController,
                inputController;
            MarvinJSUtil.getEditor("#" + appletid).then(function(
                sketcherInstance) {
                marvinController = new MarvinControllerClass(
                    sketcherInstance, $("#chbx-coloring"),
                    $("#chbx-carbonVis"));
            });
            var MarvinControllerClass = (function() {
                function MarvinControllerClass(sketcherInstance,
                    cpkCheckbox, carbonCheckbox) {
                    this.sketcherInstance =
                        sketcherInstance;
                   /* this.cpkCheckbox = cpkCheckbox;
                    this.carbonCheckbox = carbonCheckbox; */
                    this.init();
                }
                MarvinControllerClass.prototype.init = function init() {
                /*    this.carbonCheckbox.on("change", $.proxy(
                        this.handleCarbonCheckBoxChange,
                        this));
                    this.cpkCheckbox.on("change", $.proxy(
                        this.handleCpkCheckBoxChange,
                        this));  */
                };
           /*     MarvinControllerClass.prototype.handleCarbonCheckBoxChange =
                    function handleCarbonCheckBoxChange(e) {
                        this.sketcherInstance.setDisplaySettings({
                            "carbonLabelVisible": this.carbonCheckbox
                                .is(':checked')
                        });
                    };
                MarvinControllerClass.prototype.handleCpkCheckBoxChange =
                    function handleCpkCheckBoxChange(e) {
                        this.sketcherInstance.setDisplaySettings({
                            "cpkColoring": this.cpkCheckbox
                                .is(':checked')
                        });
                    };    */
                return MarvinControllerClass;
            }());
            var inputdiv = Y.one(topnode);
            inputdiv.ancestor('form').on('submit', function() {
                exportPromise = marvinController.sketcherInstance
                    .exportStructure("mrv", null)
                exportPromise.then(function(source) {
                    Y.one(topnode + ' input.answer').set(
                        'value', source);
                });
            }, this);
        }
    },
    loadXMLString: function(txt) {
        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(txt, "text/xml");
        } else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(txt);
        }
        return xmlDoc;
    },
    show_error: function(Y, topnode) {
        var errormessage = '<span class ="javawarning">' + M.util.get_string(
            'enablejava', 'qtype_easyomechjs') + '</span>';
        Y.one(topnode + ' .ablock').insert(errormessage, 1);
    },
    /**
     * Gets around problem in ie6 using name
     */
    find_java_applet: function(appletname) {
        for (appletno in document.applets) {
            if (document.applets[appletno].name == appletname) {
                return document.applets[appletno];
            }
        }
        return null;
    },
    nextappletid: 1,
    javainstalled: -99,
    doneie6focus: 0,
    doneie6focusapplets: 0,
    // Note: This method is also called from mod/audiorecorder
    show_java: function(id, appletid, name, java, width, height,
        appletclass, javavars, stripped_answer_id, moodleurl,
        marvinpath) {
        var warningspan = document.getElementById(id);
        warningspan.innerHTML = '';
        var newIframe = document.createElement("iframe");
        newIframe.src = "http://localhost/marvin4js/editor.html";
        newIframe.className = "sketcher-frame";
        newIframe.id = appletid;
        newIframe.width = width;
        newIframe.height = height;
        warningspan.appendChild(newIframe);
        var marvinController,
            inputController;
        MarvinJSUtil.getEditor("#" + appletid).then(function(
            sketcherInstance) {
            marvinController = new MarvinControllerClass(
                sketcherInstance, $("#chbx-coloring"), $(
                    "#chbx-carbonVis"));
            var pastePromise = marvinController.sketcherInstance
                .importStructure("mrv", document.getElementById(
                    stripped_answer_id).value);
        });
        var MarvinControllerClass = (function() {
            function MarvinControllerClass(sketcherInstance,
                cpkCheckbox, carbonCheckbox) {
                this.sketcherInstance = sketcherInstance;
            /*    this.cpkCheckbox = cpkCheckbox;
                this.carbonCheckbox = carbonCheckbox;  */
                this.sketcherInstance.setDisplaySettings({
                    "cpkColoring": true,
                    "lonePairsVisible": true
                });
                this.init();
            }
            MarvinControllerClass.prototype.init = function init() {
                /*this.carbonCheckbox.on("change", $.proxy(
                    this.handleCarbonCheckBoxChange,
                    this));
                this.cpkCheckbox.on("change", $.proxy(this.handleCpkCheckBoxChange,
                    this));
                this.sketcherInstance.setDisplaySettings({
                    "cpkColoring": true,
                    "lonePairsVisible": true
                });  */
            };
            /* MarvinControllerClass.prototype.handleCarbonCheckBoxChange =
                function handleCarbonCheckBoxChange(e) {
                    this.sketcherInstance.setDisplaySettings({
                        "carbonLabelVisible": this.carbonCheckbox
                            .is(':checked')
                    });
                };
            MarvinControllerClass.prototype.handleCpkCheckBoxChange =
                function handleCpkCheckBoxChange(e) {
                    this.sketcherInstance.setDisplaySettings({
                        "cpkColoring": this.cpkCheckbox
                            .is(':checked')
                    });
                };  */
            return MarvinControllerClass;
        }());

       /* function pasteMolAction(txt, format) {
            var pastePromise = marvinController.sketcherInstance.pasteStructure(
                format, txt);
            pastePromise.then(function() {}, function(error) {
                alert(error);
            });
        }

        function importMolAction(txt, format) {
            var importPromise = marvinController.sketcherInstance.importStructure(
                format, txt);
            importPromise.then(function() {}, function(error) {
                alert(error);
            });
        }

        function exportMolAction(format) {
            var ic = inputController;
            var exportPromise = marvinController.sketcherInstance.exportStructure(
                format, null);
            exportPromise.then(function(source) {
                //alert(source);
                $('#mdlmol').val(source);
                ///CRL MODS - ajax to obabel
                $.ajax({
                    type: 'POST',
                    url: 'openbabel.php',
                    data: $('#mdlmol').serialize(),
                    dataType: 'json',
                    success: function(data) {
                        console.log(data);
                        $('#molsource-box').val(
                            data);
                    }
                });
                //	ic.setTxt(source);
            }, function(error) {
                ic.setTxt(error);
            });
        }   */
      /*  if (document.body.className.indexOf('ie6') != -1 && !this.doneie6focus) {
            var fixFocus = function() {
                if (document.activeElement && document.activeElement
                    .nodeName.toLowerCase() == 'applet') {
                    setTimeout(fixFocus, 100);
                    this.doneie6focus = 1;
                    this.doneie6focusapplets++;
                    window.focus();
                } else {
                    this.doneie6focus++;
                    if (this.doneie6focus == 2 && this.doneie6focusapplets >
                        0) {
                        // Focus one extra time after applet gets it
                        window.focus();
                    }
                    if (this.doneie6focus < 50) {
                        setTimeout(fixFocus, 100);
                    }
                }
            };
            window.arghApplets = 0;
            setTimeout(fixFocus, 100);
            this.doneie6focus = 1;
        }  */
        return true;
    },
    insert_applet: function(Y, moodleurl, marvinpath) {
        var warningspan = document.getElementById('appletdiv');
        warningspan.innerHTML = '';
        var newIframe = document.createElement("iframe");
        newIframe.src = "http://localhost/marvin4js/editor.html";
        newIframe.className = "sketcher-frame";
        newIframe.id = "MSketch";
        newIframe.width = "600";
        newIframe.height = "460";
        warningspan.appendChild(newIframe);
        //import structure
        var marvinController;
        MarvinJSUtil.getEditor("#MSketch").then(function(
            sketcherInstance) {
            marvinController = new MarvinControllerClass(
                sketcherInstance);
            var pastePromise = marvinController.sketcherInstance
                .importStructure("mrv", document.getElementById(
                    'id_answer_0').value);
        });
        var MarvinControllerClass = (function() {
            function MarvinControllerClass(sketcherInstance) {
                this.sketcherInstance = sketcherInstance;
                this.init();
            }
            MarvinControllerClass.prototype.init = function init() {
                this.sketcherInstance.setDisplaySettings({
                    "cpkColoring": true,
                    "lonePairsVisible": true
                });  
            };
            return MarvinControllerClass;
        }());

    }
}
M.qtype_easyomechjs.init_getanswerstring = function(Y, moodle_version) {
    var handleSuccess = function(o) {};
    var handleFailure = function(o) {
        /*failure handler code*/
    };
    var callback = {
        success: handleSuccess,
        failure: handleFailure
    };
    if (moodle_version >= 2012120300) { //Moodle 2.4 or higher
        YAHOO = Y.YUI2;
    }
    Y.all(".id_insert").each(function(node) {
        node.on("click", function() {
 var marvinController,
            inputController;
                //alert(textfieldid);
	MarvinJSUtil.getEditor("#MSketch").then(function(
            sketcherInstance) {

             marvinController = new MarvinControllerClass(
                sketcherInstance, $("#chbx-coloring"), $(
                    "#chbx-carbonVis"));

            var buttonid = node.getAttribute('id');
            //var s = document.MSketch.getMol('mrv');
            var textfieldid = 'id_answer_' + buttonid.substr(
                buttonid.length - 1);
                // alert(textfieldid);

		exportPromise = marvinController.sketcherInstance
                    .exportStructure("mrv", null)
                exportPromise.then(function(source) {

                    Y.one('#'+textfieldid).set(
                        'value', source);
		});
	});
            //document.getElementById(textfieldid).value = s;

      var MarvinControllerClass = (function() {
            function MarvinControllerClass(sketcherInstance,
                cpkCheckbox, carbonCheckbox) {
                this.sketcherInstance = sketcherInstance;
                this.cpkCheckbox = cpkCheckbox;
                this.carbonCheckbox = carbonCheckbox;
                this.init();
            }
            MarvinControllerClass.prototype.init = function init() {
              /*  this.carbonCheckbox.on("change", $.proxy(
                    this.handleCarbonCheckBoxChange,
                    this));
                this.cpkCheckbox.on("change", $.proxy(this.handleCpkCheckBoxChange,
                    this));  */
                this.sketcherInstance.setDisplaySettings({
                    "cpkColoring": true,
                    "lonePairsVisible": true
                });
            };
          /*  MarvinControllerClass.prototype.handleCarbonCheckBoxChange =
                function handleCarbonCheckBoxChange(e) {
                    this.sketcherInstance.setDisplaySettings({
                        "carbonLabelVisible": this.carbonCheckbox
                            .is(':checked')
                    });
                };
            MarvinControllerClass.prototype.handleCpkCheckBoxChange =
                function handleCpkCheckBoxChange(e) {
                    this.sketcherInstance.setDisplaySettings({
                        "cpkColoring": this.cpkCheckbox
                            .is(':checked')
                    });
                };  */
            return MarvinControllerClass;
        }());


        });
    });
};
