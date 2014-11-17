/*
 * This file is part of Wakanda software, licensed by 4D under
 *  (i) the GNU General Public License version 3 (GNU GPL v3), or
 *  (ii) the Affero General Public License version 3 (AGPL v3) or
 *  (iii) a commercial license.
 * This file remains the exclusive property of 4D and/or its licensors
 * and is protected by national and international legislations.
 * In any event, Licensee's compliance with the terms and conditions
 * of the applicable license constitutes a prerequisite to any use of this file.
 * Except as otherwise expressly stated in the applicable license,
 * such license does not include any other license or rights on this file,
 * 4D's and/or its licensors' trademarks and/or other proprietary rights.
 * Consequently, no title, copyright or other proprietary rights
 * other than those specified in the applicable license is granted.
 */

/*global wakAdmin, app, $*/

var app = app || {};
$(function () {
    'use strict';


    app.remoteConnection = (function () {
        var protocol,
        port,
        hostname = window.location.hostname;

        if (window.location.protocol === "https:") {
            protocol = "wss:";
            port = "4433";
        } else {
            protocol = "ws:";
            port = "8080";
        }

        var wsURL = protocol +'//' + hostname + ':'+port+'/remote_admin_ws/';

        function query(fn, event, params) {
            wakAdmin[fn + "Async"]({
                "onsuccess": function (response) {
                    if (response.status && response.status != 200) {
                        $.publish(event + ".error", response);
                        return;
                    };
                    $.publish(event + ".success", response);
                },
                "onerror": function (error) {
                    $.publish(event + ".error", error);
                }
            }, params);
        }

        return {
            openWS: function () {
              if (!window.WebSocket) return;

              var connection = new WebSocket(wsURL);

              connection.onmessage = function (e) {
                  try {
                      var message = JSON.parse(e.data);
                      if (message.hasOwnProperty('jobState')) {
                          if (message['jobState'] === 1) {
                              window.location.reload();
                          }
                      }
                  } catch (e) {

                  }
              };
            },

            getSolutionDetails: function (hash) {
                query('getSolutionDetails', 'solution.details', hash);
            },

            getCurrentRunningHash: function (hash) {
                query('getCurrentRunningHash', 'solution.hash', hash);
            },

            getProductName: function () {
                query('getProductName', 'product.name');
            },

            getRecentSolutions: function () {
                query('getRecentSolutions', 'solution.list');
            },

            verify: function (solutionPath, projectName) {
                var option = {
                    solutionPath: solutionPath,
                    applicationName: projectName
                };
                query('verifyApplication', 'solution.verify', option);
            },

            backup: function (solutionPath, projectName) {
                var option = {
                    solutionPath: solutionPath,
                    applicationName: projectName
                };
                query('backupApplication', 'solution.backup', option);
            },

            compact: function (solutionPath, projectName) {
                var option = {
                    solutionPath: solutionPath,
                    applicationName: projectName
                };
                query('compactApplication', 'solution.compact', option);
            },

            repair: function (solutionPath, projectName) {
                var option = {
                    solutionPath: solutionPath,
                    applicationName: projectName
                };
                query('repairApplication', 'solution.repair', option);
            },

            restore: function (solutionPath, projectName, date) {
                var option = {
                    restoreDate     : date,
                    solutionPath    : solutionPath,
                    applicationName : projectName
                };
                query('restoreApplication', 'solution.restore', option);
            },

            closeSolution: function () {
                query('closeSolution', 'solution.close');
            },

            openSolutionByPath: function (path) {
                query('openSolutionByPath', 'solution.open', path);
            },

            openRecentSolution: function (hash) {
                query('openRecentSolution', 'solution.start', hash);
            },

            resetCache: function (projectName) {
                query('resetCache', 'solution.resetCache', projectName);
            },

            getDebuggerServer: function () {
                return wakAdmin.getDebuggerServer();
            },

            setDebuggerServer: function (val) {
                return wakAdmin.setDebuggerServer(val);
            },

            getLogMessages: function () {
                return wakAdmin.getLogMessages();
            },

            getMaintenanceLog: function (maintenanceLogId) {
                return wakAdmin.getMaintenanceLog(maintenanceLogId);
            }
        };
    }());

    app.console = {
        timer: null,
        opened: false,
        node: $('#logsContainer'),
        maintenanceLogId: 0,
        getServerLog: function (open, option) {
            try {
                var result = app.remoteConnection.getLogMessages();
                if (open === undefined) {
                    open = true;
                }
                this.log(result.messages, open, option);
            } catch (e) {
                this.log('<b>getServerLog failed :</b> ' + e, open, option);
            }
        },
        
        getMaintenanceLog: function (callback) {
            var isErrorDetected;
            try {
                var result = app.remoteConnection.getMaintenanceLog(this.maintenanceLogId);
                if (open === undefined) {
                    open = true;
                }

                isErrorDetected = this.log(result.messages);
                this.maintenanceLogId = result.maxId;
                if(jQuery.isFunction(callback)) {
                    callback(isErrorDetected);                    
                }
            } catch (e) {
                this.log('<b>getMaintenanceLog failed :</b> ' + e);
            }
        },

        log: function (contents, open, option) {

            var
            i,
            html,
            logDisplay,
            logSolutionName,
            isErrorDetected = false,
            logApplicationName;

            html = '';
            logDisplay = '';

            if ($.isArray(contents) && contents.length > 0) {
                for(i=0; i<contents.length; i++) {
                    if(contents[i].toLowerCase().indexOf('error') !== -1){
                        contents[i] = '<span style="color:red">' + contents[i] +'</span>';
                        isErrorDetected = true;
                    }
                }
                html = contents.join('<br />') + '<br />';
            } else if ($.isPlainObject(contents) && contents.message && (contents.message !== '')) {
                html = contents.description + '<br />';
            } else if (contents.toString() !== '') {
                html = contents.toString() + '<br />';
            }

            if (option !== undefined && option.hasOwnProperty("solutionName") && option.hasOwnProperty("applicationName")) {
                logSolutionName = option.solutionName;
                logApplicationName = option.applicationName;
            } else if (sources !== null && sources.recentSolutions.name !== null && sources.projects.name !== null) {
                logSolutionName = sources.recentSolutions.name;
                logApplicationName = sources.projects.name;
            }


            if (html !== '') {
                if (logSolutionName !== undefined && logApplicationName !== undefined) {
                    html = '<p class="' + logSolutionName.replace(" ", "-") + "-" + logApplicationName.replace(" ", "-") + '-log" style="' + logDisplay + '">' + html + '</p>';
                }
                this.node.append(html);
                this.node.scrollTop(this.node.height());
            }
            return isErrorDetected;
        },

        error: function (contents, open, option) {

            if ($.isArray(contents) && contents.length > 0) {
                contents.forEach(function(element, index, elementArray) {
                    elementArray[index] = addErrorTag(element);
                });
            } else if ($.isPlainObject(contents) && contents.message && (contents.message !== '')) {
                contents.message = addErrorTag(contents.message);
                contents.description = addErrorTag(contents.description);
            } else if (contents.toString() !== '') {

                contents = addErrorTag(contents.toString());
            }

            function addErrorTag(element) {
                return '<span class="log-error">' + element + '</span>';
            }

            this.log(contents, open, option);
        },

        head: function (content, open, option) {
            content = '<span class="log-head">' + content + '</span>';
            this.log(content, open, option);
        },
        
        showApplicationLog: function () {

            this.node.children('.content').children('p').hide();
            if (adminObject !== null && adminObject.currentSolution !== null && adminObject.currentApplicationName !== null) {
                this.node.children('.content').children('p.' + adminObject.currentSolution.name.replace(" ", "-") + "-" + adminObject.currentApplicationName.replace(" ", "-") + '-log').show();
            }
            this.node.children('.content').scrollTop(this.node.children('.content')[0].scrollHeight);
        }
    };

    app.downloadLogs = function (path) {
        var downloadUrl = "/ReadFile?name=" + path + "&download=true";
        window.open(downloadUrl, "download log");
    };
});
