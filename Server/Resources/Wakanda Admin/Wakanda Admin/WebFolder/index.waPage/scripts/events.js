/*global app, $*/
/*jslint unparam: true*/
'use strict';
var app = app || {};


//
$.subscribe("solution.list.success", function (e) {
    var solutions = Array.prototype.splice.call(arguments,1);
    // @Todo: Display "open solution message/form" if recent
    // solution list is empty
    if (solutions.length === 0) {
        return;
    }

    for (var i = solutions.length - 1; i >= 0; i--) {
        if (solutions[i].isRunning) {
            break;
        }
    };

    // Fill recentSolution model with data
    recentSolutions = solutions;
    sources.recentSolutions.sync();

    // Select a solution if it is running, otherwise select the most recent one
    var position = (i === -1)? 0 : i;
    sources.recentSolutions.select(position);

    // Workaround: combobox does not display selected element at loading 
    $$('comboboxSolutions').setValue(sources.recentSolutions.hash);
});

$.subscribe("solution.list.error", function (e, data) {
    // display internal error page with a message inviting
    // the user to refresh the page
    return;
});


// Fill the solution model
$.subscribe("solution.details.success", function (e, details) {

    // Fill the solution model
    if (details.hash !== sources.recentSolutions.hash) {
        return;
    }
    console.log("solution details", details);

    fixedSize = details.settings.database.fixedSize;
    authenticationType = details.settings.solution.directory.authenticationType;
    flushDataCacheInterval = details.settings.database.flushDataCacheInterval;

    projects = details.apps;
    
    sources.projects.sync();
    sources.projects.select(0);
    // @hack: element is not highlighted if there is only one element in a matrix
    $('#listProject .waf-clone-waf-tmp-container-matrix1').first().addClass('waf-state-selected');

    sources.fixedSize.sync();
    sources.authenticationType.sync();
    sources.flushDataCacheInterval.sync();

    app.console.getServerLog();
    app.console.getMaintenanceLog();

    // Show project list

    // Get Server Log
    // Get Maintenance Log

    // Fill solutionDetails Model

    // Fill projects Model

    // Fetch solution settings

    // Check if a maintenance operation is scheduled and run it
    return;
});

$.subscribe("solution.details.error", function (e, data) {
  // display internal error page with a message inviting
  // the user to refresh the page
    return;
});


//
$.subscribe("solution.hash.success", function (e, data) {
    // this was used to reload page after stoping/staring a solution
    // we may omit it now if ws is working
    return;
});

$.subscribe("solution.hash.error", function (e, data) {
    return;
});


//
$.subscribe("solution.verify.success", function (e, data) {
    $('.waf-label-progressbar, .waf-progressBar').hide()
    $$('progressBar2').stopListening();
    verifyLogs.push(data.file);
    sources.verifyLogs.sync();
    sources.verifyLogs.orderBy('date desc');
    app.console.getMaintenanceLog();
    $('#notification').notify('show','info', app.resource.VERIFY_SUCC_MSG);
    // Enable interface
    // Show success message
    // Update verify combobox
    // Update verify log download
    // Fetch Maintenance Log
    return;
});

$.subscribe("solution.verify.error", function (e, data) {
    $('.waf-label-progressbar, .waf-progressBar').hide()
    $$('progressBar2').stopListening();
    app.console.getMaintenanceLog();
    // Enable interface
    // Show Error message
    return;
});


$.subscribe("solution.backup.success", function (e, data) {
    $('.waf-label-progressbar, .waf-progressBar').hide();
    $$('progressBar2').stopListening();
    backupLogs.push(data.file);
    sources.backupLogs.sync();
    sources.backupLogs.orderBy('date desc');
    app.console.getMaintenanceLog();
    $('#notification').notify('show','info', app.resource.BACKUP_SUCC_MSG);
    return;
});

$.subscribe("solution.backup.error", function (e, data) {
    // Enable interface
    // Show Error message
    return;
});


//
$.subscribe("solution.compact.success", function (e, data) {
    // Enable interface
    // Show success message
    // Update compact combobox
    // Update compact log download
    // Fetch Maintenance Log

    $('.waf-label-progressbar, .waf-progressBar').hide();
    $$('progressBar2').stopListening();
    compactLogs.push(data.file);
    sources.compactLogs.sync();
    sources.compactLogs.orderBy('date desc');
    app.console.getMaintenanceLog();
    $('#notification').notify('show','info', app.resource.COMPACT_SUCC_MSG);
    return;
});

$.subscribe("solution.compact.error", function (e, data) {
    // Enable interface
    // Show Error message
    return;
});


//
$.subscribe("solution.repair.success", function (e, data) {
    // Enable interface
    // Show success message
    // Update compact combobox
    // Update compact log download
    // Fetch Maintenance Log
    $('.waf-label-progressbar, .waf-progressBar').hide();
    $$('progressBar2').stopListening();
    repairLogs.push(data.file);
    sources.repairLogs.sync();
    sources.repairLogs.orderBy('date desc');
    app.console.getMaintenanceLog();
    $('#notification').notify('show','info', app.resource.REPAIR_SUCC_MSG);
    return;
    return;
});

$.subscribe("solution.repair.error", function (e, data) {
    // Enable interface
    // Show Error message
    return;
});


//
$.subscribe("solution.restore.success", function (e, data) {
    return;
});

$.subscribe("solution.restore.error", function (e, data) {
    // Enable interface
    // Show success message
    // Enable interface
    // Show Error message
    return;
});


//
$.subscribe("solution.close.success", function (e, data) {
    // ws will reload the page
    return;
});

$.subscribe("solution.close.error", function (e, data) {
    // Show Error message
    return;
});


//
$.subscribe("solution.open.success", function (e, data) {
    // ws will reload the page
    return;
});

$.subscribe("solution.open.error", function (e, data) {
    // Show Error message
    return;
});


$.subscribe("solution.resetCache.success", function (e, data) {
    $('#notification').notify('show','info', app.resource.RESET_SUCC_MSG);
});

$.subscribe("solution.resetCache.error", function (e, data) {
    $('#notification').notify('show','danger', app.resource.RESET_ERR_MSG);
});

$.subscribe("product.name.success", function (e, productName) {
    document.title = productName;
});
