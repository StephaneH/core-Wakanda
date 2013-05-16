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
            result[dataClass.name] = new _DataClass(dataClass);
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
                
                continue;
            }
            
            if(attr == 'key'){
                this._private.key = obj[attr][0].name;
                
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

var
UPLOAD_MESSAGES = {
    ENABLE_TO_UPLOAD    : "Enable to upload the files",
    CONFLICT_MESSAGE    : " conflict(s) arose in the file(s) selected to upload. Do you want to replace them?",
    NOFILE              : {
       errCode              : 2501,
       message              : "No file was uploaded.",
       componentSignature   : "dbmg"
    },
    ERROR_FOLDER        : {
       errCode              : 2502,
       message              : "The folder cannot be created!",
       componentSignature   : "dbmg"
    },
    SERVICE_ERROR       : {
       errCode              : 2503,
       message              : 'Upload service error !',
       componentSignature   : "dbmg"
    },
    MAX_COUNT_EXEEDED   : {
       errCode              : 2504,
       message              : "Files count exceeds the maximum. (The maximum is : @maximum )",
       componentSignature   : "dbmg"
    },
    FILE_SIZE_EXEEDED   : {
       errCode              : 2505,
       message              : "The file : '@filename' is too large( @filesize ). (The maximum is : @maximum)",
       componentSignature   : "dbmg"
    },
    SERVICE_NOT_STARTED : {
       errCode              : 2506,
       message              : "The upload service is not started !",
       componentSignature   : "dbmg"
    },
    FILE_ALREADY_EXISTS : {
       errCode              : 2507,
       message              : "The file : @filename already exists !",
       componentSignature   : "dbmg"
    },
    INVALID_JSON_FORMAT : {
       errCode              : 2508,
       message              : "The format of the json is invalid !",
       componentSignature   : "dbmg"
    }
}

function _upload(request, response) {
    response.contentType = 'application/json';
    
    var
    info            = null,
    obj             = [],
    uploadUtils     = require('upload/uploadUtils'),
    uploader        = new uploadUtils.Uploader(),
    res             = uploader.getResult(),
    config          = null,
    folder          = null,
    datasource      = null,
    replaceIfExist  = null,
    files           = [];
    
    /**
     * Validation process
     */
    
    if(!request.parts || !request.parts.count > 0){
        res.addNewError(UPLOAD_MESSAGES.NOFILE);
    }
    
    try{
        config          = JSON.parse(request.parts[request.parts.count-1].asText);
        folder          = Folder(ds.getDataFolder().path + (config.folder?config.folder:'tmp'));
        datasource      = config.datasource;
        replaceIfExist  = config.replace;
    }catch(e){
        res.addNewError(UPLOAD_MESSAGES.INVALID_JSON_FORMAT);
    }
    
    for (var _i = 0 ; _i < request.parts.count - 1 ; ++_i) {
        var
        part = request.parts[_i];
        
        uploader.addNewFile({
            name    : part.fileName,
            size    : part.size,
            type    : part.mediaType
        });
    }
    
    verifyProcessImpl(uploader , folder , {
        errorIfConflicts : false
    });
    
    if(res.getErrors().length > 0){
        response.statusCode = 500;
        return JSON.stringify(res);
    }
    
    /**
     * Upload process
     */
    
    for (i = 0; i < request.parts.count-1; ++i) {
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
        theDataClass;
        
        theDataClass = ds[datasource.dsname];
        
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
    var
    info        = null,
    folder      = null,
    uploadUtils = require('upload/uploadUtils'),
    uploader    = new uploadUtils.Uploader(),
    res         = uploader.getResult();
    
    /**
     * 1- Verify if there is no file
     */
    if(!request.parts || !request.parts.count > 0){
        res.addNewError(UPLOAD_MESSAGES.NOFILE);
    }
    
    try{
        info    = JSON.parse(request.parts[0].asText);
        folder  = Folder(ds.getDataFolder().path + info.folder);
        
        uploader.addFiles(info.files);
    }catch(e){
        res.addNewError(UPLOAD_MESSAGES.INVALID_JSON_FORMAT);
    }
    
    /**
     *  2 - Verify the folder if can be created
     *  3 - Verify if the service "upload" is already launched
     *  4 - Verify the files count (maximum files exceeded ?)
     *  5 - Verify for each file the size (maximum file size exceeded ?)
     *  6 - Verify for each file if it already exist
     */
    verifyProcessImpl(uploader , folder , {
        errorIfConflicts : false
    });
    
    if(res.getErrors().length > 0){
        response.statusCode = 500;
    }
    
    return JSON.stringify(res);
}

function byteSize(size , unity){
    if(isNaN(size) || parseFloat(size) < 0){
        return -1;
    }
    
    size    = parseFloat(size);
    unity   = unity || 'kb';
    
    switch(unity.toLowerCase()){
        case 'byte'    :
            return size;
        case 'mb'   :
            return size * 1024 * 1024;
        default :
            return size * 1024;
    }
}

function getSizeUnity(unity){
    switch(unity.toLowerCase()){
        case 'byte'    :
            return 'Byte(s)';
        case 'mb'   :
            return 'MB';
        default :
            return 'KB';
    }
}

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

function verifyProcessImpl(uploader , folder , options){
    var
    _err,
    maxSize,
    sizeUnity,
    uploadService,
    uploadUtils = require('upload/uploadUtils'),
    resultObj   = uploader.getResult(),
    appService  = application.settings.services;
    
    /**
     * 2 - Verify the folder if does not exist
     */
    if(!folder.exists){
        try{
            folder.create();
        }catch(e){
            resultObj.addNewError(UPLOAD_MESSAGES.ERROR_FOLDER);
        }
    }
    
    /**
     * 3 - Verify if the service "upload" is already launched
     */
    if(!appService || !appService.upload){
        resultObj.addNewError(UPLOAD_MESSAGES.SERVICE_NOT_STARTED);
    }

    try{
        uploadService   = appService.upload;
        maxSize         = isNaN(uploadService.maxSize) ? -1 : parseFloat(uploadService.maxSize);
        sizeUnity       = uploadService.sizeUnity || 'kb';
        
        uploader.setMaxFiles(isNaN(uploadService.maxFiles) ? -1 : parseInt(uploadService.maxFiles));
        uploader.setMaxSize(byteSize(maxSize , sizeUnity));
        
        /**
         * 4 - Verify the files count (maximum files exceeded ?)
         */
        if(uploader.getFiles().length > uploader.getMaxFiles() && uploader.getMaxFiles() >= 0 ){
            _err = UPLOAD_MESSAGES.MAX_COUNT_EXEEDED;
            
            _err.message = _err.message.replace(/@maximum/g , uploader.getMaxFiles() + ' file(s)' );

            resultObj.addNewError(_err);
        }
        
        uploader.validateAll(function(resObj){
            var
            file = File(folder,this.name);
            
            /**
             * 5 - Verify for each file the size (maximum file size exceeded ?)
             */
            if(this.getSize() > uploader.getMaxSize()){
                _err = clone(UPLOAD_MESSAGES.FILE_SIZE_EXEEDED);
                
                _err.message = _err.message.replace(/@filename/g , this.getName());
                _err.message = _err.message.replace(/@maximum/g , maxSize + ' ' + getSizeUnity(sizeUnity) );
                _err.message = _err.message.replace(/@filesize/g , this.getSize() + ' Byte(s)' );
                
                resObj.addNewError(_err);
            }
            
            /**
             * 6 - Verify for each file if it already exist
             */
            if(file.exists){
                var
                conflict = {
                    fileSent   : new uploadUtils.File({
                        name    : this.getName(),
                        size    : this.getSize(),
                        type    : this.getType()
                    }),
                    fileExists : new uploadUtils.File({
                        name    : file.name,
                        size    : file.size,
                        type    : this.getType()
                    })
                };
                
                resObj.addNewConflict(conflict);
                
                if(options.errorIfConflicts){
                    _err            = clone(UPLOAD_MESSAGES.FILE_ALREADY_EXISTS);
                    _err.message    = _err.message.replace(/@filename/g , this.getName());
                    
                    resObj.addNewError(_err);
                }
            }
        });
        
    }catch(e){
        resultObj.addNewError(UPLOAD_MESSAGES.SERVICE_ERROR);
    }
    
    if(resultObj.getConflicts().length > 0){
        resultObj.setConflictMessage(resultObj.getConflicts().length + UPLOAD_MESSAGES.CONFLICT_MESSAGE);
    }
    
    if(resultObj.getErrors().length > 0){
        resultObj.setMessage(UPLOAD_MESSAGES.ENABLE_TO_UPLOAD);
    }
}