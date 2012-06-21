//var 
//protocol;

//protocol = require('waf-mysql/Protocol');


var Client = function (args) {
 
    var 
    i,
    Protocol,
    _params,
    params;

    Protocol = require('waf-mysql/protocol').Protocol;

    this.isClosed = false;
    this.isConnected = false;
    this.isError = false;
    this.error = {};
    this.Protocol = null;


    _params = ['hostname','port','user','password','database','ssl'];

    if(args.length == 1 && typeof args[0] === 'object'){
        params = args[0];

        for(i = 0; i < params.length; i ++){
            if(!params[_params[i]]){	
                throw new Error('Syntax Error: Undefined ' + _params[i]);
            }
        }
    }
    else{

        params = {
            hostname: 'localhost',
            user	: 'root',
            password: '',
            database: '',
            port	: 3306,
            ssl		: false
        };

        for(i = 0; i < args.length; i ++){
            if(!(params[_params[i]] = args[i])){	
                throw new Error('Syntax Error: Undefined ' + _params[i]);
            }
        }

    }

    this.Protocol = new Protocol();
    this.Protocol.connect(params);

    this.isConnected = this.Protocol.isConnected;
    this.isError = this.Protocol.isError;

    if(this.isError)
        this.error = this.Protocol.error;

}


function ResultSet(){
    this.Protocol = undefined;
}

ResultSet.prototype.fetch = function (count){
  
    return this.Protocol.data.fetch(count,
        this.Protocol.metaData[this.Protocol.fResult]["fieldCount"],
        this.Protocol.metaData[this.Protocol.fResult]["titles"],
        this.Protocol.metaData[this.Protocol.fResult]["types"]);

}

ResultSet.prototype.fetchAll = function (){
   
    return this.Protocol.data.fetch(-1,
        this.Protocol.metaData[this.Protocol.fResult]["fieldCount"],
        this.Protocol.metaData[this.Protocol.fResult]["titles"],
        this.Protocol.metaData[this.Protocol.fResult]["types"]);

}

ResultSet.prototype.hasNext = function (){

    return this.Protocol.data.hasNext();

}

ResultSet.prototype.getRowsCount = function (){

    return this.Protocol.data.getRowsCount();

}

ResultSet.prototype.getColumnsCount = function (){

    return this.Protocol.metaData[this.Protocol.fResult]["fieldCount"];

}

ResultSet.prototype.getColumnName = function (iCol){

    return this.Protocol.metaData[this.Protocol.fResult]["titles"][iCol];

}

ResultSet.prototype.getColumnType = function (iCol){

    return this.Protocol.metaData[this.Protocol.fResult]["type"][iCol];

}

ResultSet.prototype.isUpdate = function (){
    
    if( this.Protocol.typePacket[this.Protocol.fResult] && this.Protocol.typePacket[this.Protocol.fResult] == 1)
        return true;
    return false;

}

ResultSet.prototype.isInsert = function (){
    
    if( this.Protocol.typePacket[this.Protocol.fResult] && this.Protocol.typePacket[this.Protocol.fResult] == 1)
        return true;
    return false;

}

ResultSet.prototype.isDelete = function (){
    
    if( this.Protocol.typePacket[this.Protocol.fResult] && this.Protocol.typePacket[this.Protocol.fResult] == 1)
        return true;
    return false;

}

ResultSet.prototype.isSelect = function (){
 
    if( this.Protocol.typePacket[this.Protocol.fResult] && this.Protocol.typePacket[this.Protocol.fResult] == 0)
        return true;
    return false;

}

ResultSet.prototype.isError = function (){

    if( this.Protocol.typePacket[this.Protocol.fResult] && this.Protocol.typePacket[this.Protocol.fResult] == -1)
        return true;
    return false;
}

ResultSet.prototype.getAffectedRowCount = function (){

    if(this.Protocol.records[this.Protocol.fResult])
        return this.Protocol.records[this.Protocol.fResult];
    
    return {};
}

ResultSet.prototype.getNextRow = function (){
    
    return this.fetch(1);
    
}

ResultSet.prototype.getNextRows = function (){
    
    if(arguments.length == 1 && typeof arguments[0] === 'number')
        return this.fetch(arguments[0]);
    else
        throw new Error('Expected number');
    
}

ResultSet.prototype.skipRows = function (){
    
    if(arguments.length == 1 && typeof arguments[0] === 'number')
        this.Protocol.data.advanceFetch(arguments[0]);
    else
        throw new Error('Expected number');
    
}


Client.prototype.useDatabase =  function(){

    if(this.isClosed)
        return false;

    if(arguments.length != 1)// argument syntax error
        throw new Error('parameters number error');

    if(typeof arguments[0] !== 'string')// argument syntax error
        throw new Error('Syntax type Error, expected String');

    return this.Protocol.useDatabase(arguments[0]);
}

Client.prototype.executeAndFetch = function (){
	
    var 
    query;

    if(arguments.length == 0 || typeof arguments[0] != 'string'){// argument syntax error
        throw new Error('too few parameters given');
    }

    if(arguments.length > 1)
        query = this.Protocol._constructQuery(arguments);
    else
        query = arguments[0];
    
    this.Protocol.sendQuery(query, 1);
    this.Protocol.prepareForFetch(0, true);
  
    this.Protocol.resultCount = 1;
    this.Protocol.fResult = 0;
    var Result = new ResultSet();
    this.Protocol.setNextFetch();
    
    Result.Protocol =  this.Protocol;
    
    return Result;
}

Client.prototype.execute = function (){
    
    var 
    query,
    i;
      
    if(arguments.length == 0 || typeof arguments[0] != 'string'){// argument syntax error
        throw new Error('too few parameters given');
    }
    
    if(arguments.length > 1)
        query = this.Protocol._constructQuery(arguments);
    else
        query = arguments[0];
    
    i = 0;
    
    this.Protocol.sendQuery(query);
    
    while(this.Protocol.hasNext){
        
        this.Protocol.prepareForFetch(i, false);
        i++;
        
    }
  
    this.Protocol.resultCount = i;
// this.isError = this.Protocol.isError;
       
//return !this.isError;

}

Client.prototype.hasMoreResults = function (){

    return this.Protocol._hasMoreResult();
}

Client.prototype.getResultCount = function (){

    return this.Protocol.resultCount;

}

Client.prototype.select = function (){
  
    var
    query,
    keyVal
    ;
    if(arguments.length < 2 )// argument syntax error
        throw new Error('too few parameters given');
    
    else if(arguments.length >= 2){
        
        if(typeof arguments[0] != 'string' || typeof arguments[1] != 'string')
            throw new Error('Syntax Error');
         
        query = "SELECT " + arguments[0] + " FROM " + arguments[1]; 
    }
    if(arguments.length >= 3){
        
        if(typeof arguments[2] != 'object')
            throw new Error('Syntax Error');
         
        keyVal = Object.keys(arguments[2])[0];
        query += " WHERE "  + keyVal + "=";
         
        if(typeof arguments[2][keyVal] == 'string')
            query +="'" + arguments[2][keyVal] + "'";
        else if (typeof arguments[2][keyVal] == 'number')
            query += arguments[2][keyVal];
        else 
            throw new Error('Syntax Error');
    }
   
    this.Protocol.sendQuery(query, 2);
    this.Protocol.prepare(0);
  
    this.Protocol.resultCount = 1;
    this.Protocol.fResult = 0;
    var Result = new ResultSet();
    this.Protocol.setNextFetch();
    
    Result.Protocol =  this.Protocol;
    
    return Result;

}

Client.prototype.update = function (){
   
    var
    query,
    keyVal,
    _arguments,
    sep
    ;
    if(arguments.length < 3 )// argument syntax error
        throw new Error('too few parameters given');
    
    else if(arguments.length >= 3){
        
        if(typeof arguments[0] != 'string' || typeof arguments[1] != 'object' || typeof arguments[2] != 'object')
            throw new Error('Syntax Error');
         
        query = "UPDATE " + arguments[0] + " SET ";
        _arguments = arguments[1];
        sep ="";
        Object.getOwnPropertyNames(_arguments).forEach(

            function (key){
                query += sep + '`' + key + '`=';
                if(typeof _arguments[key] == 'string')
                    query += "'" + _arguments[key] + "'";
                else if (typeof _arguments[key] == 'number')
                    query += _arguments[key];
                else 
                    throw new Error('Syntax Error');
                sep = " ,"
            }
            );

        keyVal = Object.keys(arguments[2])[0];
        query += " WHERE "  + keyVal + "=";
         
        if(typeof arguments[2][keyVal] == 'string')
            query +="'" + arguments[2][keyVal] + "'";
        else if (typeof arguments[2][keyVal] == 'number')
            query += arguments[2][keyVal];
        else 
            throw new Error('Syntax Error');
    }

     
     
     
     
    this.Protocol.sendQuery(query, 3);
   this.Protocol.prepare(0);
  
    this.Protocol.resultCount = 1;
    this.Protocol.fResult = 0;
    
    var Result = new ResultSet();
    
    Result.Protocol =  this.Protocol;
    return Result;
    
}

Client.prototype['delete'] = function (){
    
    var
    query,
    keyVal
    ;
    if(arguments.length < 2 )// argument syntax error
        throw new Error('too few parameters given');
    
    else if(arguments.length >= 2){
        
        if(typeof arguments[0] !== 'string' || typeof arguments[1] !== 'object')
            throw new Error('Syntax Error');
         
        query = "DELETE FROM " + arguments[0];
        
        if(typeof arguments[1] != 'object')
            throw new Error('Syntax Error');
         
        keyVal = Object.keys(arguments[1])[0];
        query += " WHERE "  + keyVal + "=";
        
        if(typeof arguments[1][keyVal] == 'string')
            query +="'" + arguments[1][keyVal] + "'";
        else if (typeof arguments[1][keyVal] == 'number')
            query += arguments[1][keyVal];
        else 
            throw new Error('Syntax Error');
        
    }
   
     
    this.Protocol.sendQuery(query, 3);
    this.Protocol.prepare(0);
  
    this.Protocol.resultCount = 1;
    this.Protocol.fResult = 0;
    
    var Result = new ResultSet();
    
    Result.Protocol =  this.Protocol;
    return Result;
}

Client.prototype.insert = function (){
    
    var
    query,
    sep,
    sep2,
    _arguments,
    i
    ;
    if(arguments.length != 2 )// argument syntax error
        throw new Error('too few parameters given');
    
    if(typeof arguments[0] !== 'string' || typeof arguments[1] !== 'object')
        throw new Error('Syntax Error');
 
    query = "INSERT INTO " + arguments[0] + " (";


    if(arguments[1].length == 0)
        throw new Error('Syntax Error: Empty insert data');
    
    _arguments = arguments[1][0];
    
    if(typeof _arguments != 'object')
        throw new Error('Syntax Error');
    
    sep = "";
    Object.getOwnPropertyNames(_arguments).forEach(

        function (key){
            query += sep + '`' + key + '`';
            sep = " ,"
        }
        );
    
    query += ") VALUES ";
    sep2 = "";
    for(i = 0; i < arguments[1].length; i ++){
        _arguments =  arguments[1][i];
        if(typeof _arguments != 'object')
            throw new Error('Syntax Error');
        sep = "";
        query += sep2 + "(";
        Object.getOwnPropertyNames(_arguments).forEach(

            function (key){
            
                if(typeof _arguments[key] == 'string')
                    query += sep + "'" + _arguments[key]+ "'";
                else if (typeof _arguments[key] == 'number')
                    query += sep + _arguments[key];
                sep = " ,"
            }
            );
        query += ")";
        sep2 = ", ";
    }

    console.log(query);
    this.Protocol.sendQuery(query, 3);
    this.Protocol.prepare(0);
  
    this.Protocol.resultCount = 1;
    this.Protocol.fResult = 0;
    
    var Result = new ResultSet();
    
    Result.Protocol =  this.Protocol;
    return Result;
}

Client.prototype.getNextResult = function (){

    if(!this.hasMoreResult()){
        return null;
    }
    
    this.Protocol.fResult ++;

    var Result = new ResultSet();
    Result.Protocol =  this.Protocol;
    
    return Result;
}

Client.prototype.close = function (){
    
    this.isClosed = true;
    this.Protocol.socket.end();
    return true;

}
exports.Client = Client;