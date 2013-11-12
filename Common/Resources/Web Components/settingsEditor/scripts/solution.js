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
function solutionDisplay() {

    var txt_html = '';

    txt_html += '<section id="solution">';
    txt_html +=     '<h3>Solution</h3>';
    txt_html +=     '<div class="group">';

    txt_html +=         '<div title="Defines if server should be stopped when Wakanda fails to open one of the projects in the solution.">';
    txt_html +=             '<label for="stopIfProjectFails">Stop loading solution if a project fails</label>';
    txt_html +=             '<input id="stopIfProjectFails" type="checkbox" />';
    txt_html +=         '</div>';

    // txt_html += '<div class="spacer"/>';/* spacer */

    txt_html +=         '<div title="Defines the authentication mode for the solution">';
    txt_html +=             '<label class="item" for="authenticationType">Authentication type:</label>';
    txt_html +=             '<select id="authenticationType" class="inline" name="authentication">';
    txt_html +=                 '<option value="basic">Basic</option>';
    txt_html +=                 '<option value="digest">Digest</option>';
    txt_html +=                 '<option value="custom">Custom</option>';
    txt_html +=             '</select>';
    txt_html +=         '</div>';

    txt_html +=     '</div>';
    txt_html += '</section>';

    // txt_html += '<div class="spacer"/>'; /* spacer */

    txt_html += '<section id="datastoreCache">';
    txt_html +=     '<h3>Datastore Cache</h3>';
    txt_html +=     '<div class="group">';

    txt_html +=         '<div title="Fixed size of memory to be used by the cache">';
    txt_html +=             '<label for="fixedSize">Size:</label>';
    txt_html +=             '<input id="fixedSize" type="text" class="number" size="10"/> MB';
    txt_html +=         '</div>';

    // txt_html += '<div class="spacer"/>';
    txt_html +=         '<div title="Specifies the time period between each automatic saving of the data cache (in seconds)">';
    txt_html +=             '<label class="item" for="flushDataCacheInterval">Flush data buffers every:</label>';
    txt_html +=             '<input id="flushDataCacheInterval" type="text" class="numeric" size="10"/> seconds';
    txt_html +=         '</div>';

    txt_html +=     '</div>';
    txt_html += '</section>';

    return txt_html;
}

function solutionOnClick() {

    switch (this.id) {

        case 'stopIfProjectFails':
            if (!jsonData.solution[0].serverStartup)
                jsonData.solution[0].serverStartup = new Array({});
            jsonData.solution[0].serverStartup[0][this.id] = this.checked;
            break;
    }

    setDirty();
}

function solutionOnChange() {
    switch (this.id) {
        case 'fixedSize':
        case 'flushDataCacheInterval':
            validate('database');
            jsonData.database[0][this.id] = this.value;
            break;
    }

    setDirty();
}

function solutionOnSelect () {

    var id = this.id;

    switch (id) {

        case 'authenticationType':
            if (!jsonData.solution[0].directory)
                jsonData.solution[0].directory = new Array({});
            jsonData.solution[0].directory[0][this.id] = getSelectedValue(id);
            break;
    }
    setDirty();  
}

function solutionDefault() {

    var tempo = new Object({
        solution : {
            serverStartup : {
                stopIfProjectFails : 'true'
            },
            directory : {
                authenticationType : 'basic'
            }
        },
        database : {
            fixedSize : '200',
            flushDataCacheInterval : '15'
        }
    });

    return tempo;
}

function solutionActivate() {

    var defaultValues = solutionDefault();
    var value;

    // SET VALUES
    if (jsonData.solution) {

        document.getElementById('stopIfProjectFails').checked = eval((jsonData.solution[0].serverStartup) ? jsonData.solution[0].serverStartup[0].stopIfProjectFails
            : defaultValues.solution.serverStartup.stopIfProjectFails);

        if (jsonData.solution[0].directory) {
            value = (jsonData.solution[0].directory[0].authenticationType) ? jsonData.solution[0].directory[0].authenticationType
            : defaultValues.solution.directory.authenticationType;
        } else {
            value = defaultValues.solution.directory.authenticationType;
        }
        setSelectedValue("authenticationType", value);

    } else {

        document.getElementById('stopIfProjectFails').checked = eval(defaultValues.solution.serverStartup.stopIfProjectFails);

        value = defaultValues.solution.directory.authenticationType;
        setSelectedValue("authenticationType", value);

    }

    if (jsonData.database) {

        document.getElementById('fixedSize').value = (jsonData.database[0].fixedSize) ? jsonData.database[0].fixedSize
        : defaultValues.database.fixedSize;

        document.getElementById('flushDataCacheInterval').value = (jsonData.database[0].flushDataCacheInterval) ? jsonData.database[0].flushDataCacheInterval
        : defaultValues.database.flushDataCacheInterval;

    } else {

        document.getElementById('fixedSize').value = defaultValues.database.fixedSize;
        document.getElementById('flushDataCacheInterval').value = defaultValues.database.flushDataCacheInterval;

    }

    // INSTALL EVENTS
    $("#stopIfProjectFails").click(solutionOnClick);
    $("#fixedSize").change(solutionOnChange);
    $("#flushDataCacheInterval").change(solutionOnChange);
    $("#authenticationType").change(solutionOnSelect);
    
    $(":text").keydown(function(){setDirty();});
}