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


/*
function _CurrentModel(){
    this.file       = File(ds.getModelFolder() , ds.getName() + '.waModel');
    this.path       = this.file.path;
    this.xml        = loadText(this.file);
    this.json       = JSON.parse(XmlToJSON(this.xml, "json-bag", "EntityModelCatalog"));
    this.dataClasses= this.getDataClasses();
}

_CurrentModel.prototype = {
    getDataClasses : function(){
        var
        modelObj    = this.json,
        dataClasses = modelObj.dataClasses,
        result      = {};
        
        for(var _i = 0 , dataClass; dataClass = dataClasses[_i] ; _i++ ){
            result[dataClass.className] = new _DataClass(dataClass);
        }
        
        return result;
    },
    getDataClass: function(name){
        return this.dataClasses[name];
    }
}

function _DataClass(obj){
    this._private = {
        attributes  : {},
        key         : ''
    }
    
    if(obj){
        for(var attr in obj){
            if(attr == 'attributes'){
                this._initAttrsFromArray(obj[attr]);
                
                for(var _att in this._private.attributes){
                	if(this._private.attributes[_att].hasOwnProperty('primKey') && this._private.attributes[_att]['primKey'] == 'true'){
                		this._private.key = _att;
                	}
            	}
                
                continue;
            }
            
            this[attr] = obj[attr];
        }
    }
}

_DataClass.prototype = {
    getAttribute : function(attrName){
        return this._private.attributes[attrName];
    },
    getKeyName: function(){
        return this._private.key;
    },
    _initAttrsFromArray: function(array){
        for(var _i = 0 , item ; item = array[_i] ; _i++ ){
            this._private.attributes[item.name] = item;
        }
    }
}

*/

function _upload(request, response) {
    response.contentType = 'application/json';
    var 
    obj = [],
    config          = JSON.parse(request.parts[request.parts.count-1].asText),
    folder          = Folder(ds.getDataFolder().path + (config.folder?config.folder:'temp')),
    datasource      = config.datasource,
    replaceIfExist  = config.replace,
    files           = [];
    
    if(!folder.exists){
        folder.create();
    }

    for (var i = 0; i < request.parts.count-1; ++i) {
        var file = File(folder,request.parts[i].fileName);
        if(file.exists && !replaceIfExist){
            var j = 0,
                fileTmp = file;
            do{
                j++;
                fileTmp = File(folder,file.nameNoExt + ' (' + j + ').' + file.extension);
            }
            while(fileTmp.exists);
            files.push(fileTmp);
            
            try{
                request.parts[i].save(folder.path + fileTmp.name, true);
                obj.push({
                    saved       : true,
                    filename    : fileTmp.name,
                    path        : fileTmp.path
                });
            }catch(e){
                obj.push({
                    saved   : false,
                    message : e.message,
                    filename    : null,
                    path        : null
                });
            }
        }
        else{
            files.push(file);
            
            try{
                request.parts[i].save(folder.path, true);
                obj.push({
                    saved       : true,
                    filename    : file.name,
                    path        : file.path
                });
            }catch(e){
                obj.push({
                    saved   : false,
                    message : e.message,
                    filename    : null,
                    path        : null
                });
            }
        }
    }
    
    config.fileNames = [];
    files.forEach(function(fileItem) {
            config.fileNames.push(fileItem.name);
    });
    
    if(datasource){
        var
        mypict,
        entity,
        //curModel,
        theDataClass,
        theKey;
        
        //curModel        = new _CurrentModel();
        //theDataClass    = curModel.getDataClass(datasource.dsname);
		theDataClass	= ds[datasource.dsname];
        //theKey          = theDataClass.getKeyName();
        
        if(!datasource.saveOnDS){
            mypict = files[0].path;
        }
        else{
            mypict  = loadImage (files[0].path);
            if(files[0].exists){
                files[0].remove();
            }
            if(folder.files.length == 0 && folder.folders.length == 0){
                folder.remove();
            }
        }

        //entity = ds[datasource.dsname].find(theKey + " = " + datasource.id);
		var isSaved = false;
		entity = theDataClass(datasource.id);
		if (entity != null) {
			entity[datasource.field] = mypict;
			try
			{
				entity.save();
				isSaved = true;
			}
			catch (err)
			{
				isSaved = false; // maybe put a break here
			}
		}
		obj[0] = {
				saved       : isSaved,
				filename    : null,
				path        : null
			}    
		}
    
    return JSON.stringify(obj);
}

function _verify(request, response){
    var info    = null,
        files   = null,
        folder  = null,
        res     = {
            conflits    : [],
            message     : ""
        };
    if(!request.parts || !request.parts.count > 0){
        res.message = "No file was uploaded.";
        return JSON.stringify(res);
    }
    
    info    = JSON.parse(request.parts[0].asText);
    folder  = Folder(ds.getDataFolder().path + info.folder);
    files   = info.files;
    
    if(!folder.exists){
        res.message = "The folder specified does not exist.";
        return JSON.stringify(res);
    }
    
    for (var i = 0, f; f = files[i]; i++) {
        var file = File(folder,f.name);
        if(file.exists){
            var conflit = {
                fileSent   : {
                    name    : f.name,
                    size    : f.size,
                    type    : f.type
                },
                fileExists : {
                    name    : file.name,
                    size    : file.size
                }
            };
            res.conflits.push(conflit);
        }
    }
    
    res.message = res.conflits.length + " conflict(s) arose in the file(s) selected to upload. Do you want to replace them?";
    
    return JSON.stringify(res);
}