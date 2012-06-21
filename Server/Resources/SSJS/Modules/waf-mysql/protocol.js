var
constants,
SHA1;

constants = require('waf-mysql/constants');
SHA1 = require('waf-mysql/sha1Module');

function Protocol(){

    this.index = 0;
    this.isConnected = false;
    this.isInitDB = false;
    this.isError = false;
    this.isClosed = false;
    this.charsetNumber = 192;
    this.lang = 'UTF8_UNICODE_CI';
    this.flags  = constants.defaultFlag;
    this.maxPacketSize = 16777215;
    this.socket = null;
    this.params = null;
    this.serverOptions = {};
    this.data = null;
    this.error = {};
    this.metaData = [];
    this.typePacket = [];
    this.records = [];
    this.resultCount = 0;
    this.fResult = -1;
    this.hasNext = true;
        
        

}

Protocol.prototype.connect = function (params){

    var
    netNative,
    authResp;

    netNative = requireNative('net');

    this.params = params;
    this.socket = new netNative.SocketSync();

    if(typeof this.params.hostname === 'string' && typeof this.params.port === 'number'){

        try{
            this.socket.connect(params.port, params.hostname);
        }catch(err){
            this.error = {
                message : err, 
                code : -1
            };
            this.isError = true;
            return ;
        }
    }

    if (this.params.ssl)
        this.setSecure(); 

    this.data = this.socket.read();
    this._getHandshakeInitPacket();

    if(!this.isError)
        this._sendClientAuthPacket();
    this.data = this.socket.read();
    authResp = this.data[4];

    if(authResp === 0xff){
        this._readErrorPacket();
        return;
    }
    else if(authResp === 0x00){
        if(this.params.database !== ''){
            if(this.useDatabase(this.params.database))
                this.isConnected = true;
            else 
                return;
        }
        this.isConnected = true;	
    }

    return;
}

Protocol.prototype.setSecure = function (){
    this.socket.setSecure();
}

Protocol.prototype.setLang = function (charSet){

    var 
    refLang;
    // The CharSet maybe a Number or String value
    // If the case of String we determinate it's Numeric value
    if(typeof charSet === 'string'){
        if((refLang = constants.charsetMap[charSet])){
            this.lang = charSet;
            this.charsetNumber = refLang;
            return true;
        }
        return false;
    }
    else if(!isNaN(parseFloat(charSet)) && isFinite(charSet)){
        if((refLang = constants.reverseCharsetMap[charSet])){
            this.lang = refLang;
            this.charsetNumber = charSet;
            return true;
        }
    }
    return false;

}

Protocol.prototype._constructQuery = function (params){

    var 
    query,
    argcount,
    reg,
    rReg,
    regLen,
    i;

    query = params[0];
    argcount =   params.length; 

    for(i = 1; i < argcount; i ++){
	
        reg = new RegExp(':' + i, "g");
        rReg = query.match(reg, "g");
        regLen = rReg ? rReg.length : 0;

        if(regLen == 1)	
            query = query.replace(reg, params[i]);
	
        else if(regLen > 1){
			
            var
            holdersPos,
            quotesPos,
            hldpos,
            k,
            qtepos;
				
			
            holdersPos = [];
            quotesPos = [];
            
            function indexsOff(strs){
                
                var 
                pos,
                poss,
                num,
                z;
			 	
                pos = 0;
                num = -1;
                z = -1;
				
                poss = [];
				
                while (pos != -1) {
			   
                    pos = query.indexOf(strs, z + 1);
                    if(pos!= -1)
                        poss.push(pos);
                    num += 1;
                    z = pos;
			   
                }	
                
                return poss;
            }
			
            holdersPos = indexsOff(":" + i);
            quotesPos = indexsOff("'");
            qtepos = 0;
			
            if(!true){
				
            }
            else{
				
                for( hldpos = 0; hldpos < holdersPos.length; hldpos ++){
                    for( qtepos; qtepos < quotesPos.length; qtepos ++){
						
                        if(qtepos == quotesPos.length - 1 && quotesPos[qtepos] <  holdersPos[hldpos]){
                        	
                            if((qtepos + 1) % 2 == 0){

                                query = query.slice(0,holdersPos[hldpos]) + params[i] + query.slice(holdersPos[hldpos] + 2, query.length);

                                if(hldpos != holdersPos.length - 1){
                                	
                                    for(k = hldpos + 1; k < holdersPos.length; k ++ ){
                                        holdersPos [k] += (params[i] + "" ).length - 2;
                                    }
                                }

                                for(k = 0; k < quotesPos.length; k ++ ){
                                    if (quotesPos [k] > holdersPos[hldpos])
                                        quotesPos [k] += (params[i] + "" ).length - 2;
                                }

                                qtepos --;
                                break;
                            }
                        }
                        else{
                            if( quotesPos[qtepos] <  holdersPos[hldpos])
                                continue;
						
                            else{
	                    	
                                if((qtepos) % 2 == 0){
                                    query = query.slice(0,holdersPos[hldpos]) + params[i] + query.slice(holdersPos[hldpos] + 2, query.length);

                                    if(hldpos != holdersPos.length - 1){
                                        
                                        for(k = hldpos + 1; k < holdersPos.length; k ++ ){
                                            holdersPos [k] += (params[i] + "" ).length - 2;
                                        }
                                    }

                                    for( k = 0; k < quotesPos.length; k++ ){
                                        if (quotesPos [k] > holdersPos[hldpos])
                                            quotesPos [k] += (params[i] + "" ).length - 2;
                                    }
                                }
                                qtepos --;
                                break;
                            }
                        }
                    }
                }
            }
        }

  

    }
    return query;
}

Protocol.prototype._readQErrorPacket = function (){

    this.error.code = this.data.readUInt16LE(5);	//  Error Number: The possible values are listed in the MySQL source code file /include/mysqld_error.h
    if(this.data.readUInt24LE(0) > 9)
        this.error.message = this.data.toString('utf-8', 13);
	
}

Protocol.prototype._readOkPacket = function(packetLength,i){
    this.data.readUInt8();// field_count: always = 0
	
    this.records[i] = {

        affectedRows	:	this.data.readLCBPlus(),// affected_rows:the number of rows affected by INSERT/UPDATE/DELETE
        insertId	:	this.data.readLCBPlus(),//  If the statement generated any AUTO_INCREMENT number,the number is returned here. Otherwise this field contains 0
        serverStatus	:	this.data.readUInt16LE(), // if there are more informations to read from the server
        warningCount	:	this.data.readUInt16LE() // number of warnings inside this transaction
		
    };

    var readed = 5 + this.data.getOffsetRead();

    if(packetLength > readed)
        this.records[i]['message'] =  this.data.readString(packetLength-readed);

}

Protocol.prototype._getHandshakeInitPacket = function (){

    if (this.data[4] === 0xff) {

        this._readErrorPacket();
        
        return ;
		
    } else {

        var 
        packetLength,
        svIndex,
        scrambleIndex,
        index,
        scramble,


        index = 0;
        packetLength = this.data.readUInt24LE(index);
        index += 4;

        this.serverOptions.protocolVersion = this.data.readUInt8(index);
        index ++;
        svIndex = index;
        while ((index < packetLength) && (this.data[index ++] !== 0x00)){}
        this.serverOptions.serverVersion = this.data.toString('utf-8',svIndex,index - 1);
        this.serverOptions.threadId = this.data.readUInt32LE( index);
        index += 4;//ID of the server thread for this connection
        scrambleIndex = index;
        index += 9;
        this.serverOptions.capabilities = this.data.readUInt16LE(index);
        index += 2;
        this.serverOptions.charset = this.data.readUInt8(index);
        index += 1;
        this.serverOptions.language = constants.reverseCharsetMap[this.serverOptions.charset];
        this.serverOptions.status = this.data.readUInt16LE(index);
        index += 15;
        scramble = new Buffer(packetLength + 11 - index);
        this.data.copy(scramble, 0, scrambleIndex, scrambleIndex + 8);
        this.data.copy(scramble, 8, index , packetLength + 3  );
        this.serverOptions.scramble = scramble;

    }

}
	
Protocol.prototype._sendClientAuthPacket = function(){

    var
    theToken,
    theTokenLength,
    packLength,
    authPacket,
    index;

    theToken = SHA1.getToken(this.params.password,this.serverOptions.scramble);// the token to send when the database has a password [only for MySQL 4.1 and later].
    theTokenLength = (theToken.length != 1) ? theToken.length : 0;
    packLength = this.params.user.length + theTokenLength + 39 ;
    authPacket = new Buffer(packLength);
    index = 0;
    authPacket.writeUInt24LE(packLength - 4, index);
    index += 3;
    authPacket.writeUInt8(1, index);// Write the Sequence Number
    index += 1;
    authPacket.writeUInt32LE(this.flags, index);// Write the Client flag 
    index += 4;
    authPacket.writeUInt32LE(this.maxPacketSize, index);// Write the maximum Packet Size
    index += 4;
    authPacket.writeUInt8(this.charsetNumber, index);// Write the Client charSet number
    index += 1;
    authPacket.fill(0,index, 23);// Write 24 Zero
    index += 23;
    authPacket.write(this.params.user, index, 'utf-8');// Write the Null-Terminated String of the Database User name 
    index += this.params.user.length;
    authPacket.writeUInt8(0, index);// Write 0 to identify the End of the User name String
    index += 1;
    authPacket.writeUInt8(theTokenLength, index);// Writing the  Length Coded Binary of the token
    index+=1;

    if (theTokenLength !== 0) {
        theToken.copy(authPacket, index, 0,theTokenLength);
        index += theTokenLength;
    }

    authPacket.writeUInt8(0, index);
    this.socket.write(authPacket);
}

Protocol.prototype.useDatabase = function(database){
    if(!this.socket)
        return false;
    var 
    useDBQuery,
    packLength,
    useDBPacket,
    authResp;

    this.params.database = database;

    useDBQuery = "USE `" + database + "`";
    packLength = 5 + useDBQuery.length;
    useDBPacket = new Buffer(packLength);

    useDBPacket.writeUInt24LE(packLength - 4, 0);
    useDBPacket.writeUInt8(0, 3);
    useDBPacket.writeUInt8(constants.commands.COM_QUERY,4);
    useDBPacket.write(useDBQuery, 5, 'utf8');

    this.socket.write(useDBPacket);

    this.data = this.socket.read();
    authResp = this.data[4];

    if (authResp === 0xff){
        this._readErrorPacket();
        return false;
    }
    else if(authResp === 0x00)
        return true;
    return false;
}

Protocol.prototype.sendQuery = function (){
    var
        query,
        queryT;
        
    queryT = 0;
    if(arguments.length > 0){
        query = arguments[0];
    }
    if(arguments.length == 2){
        queryT =  arguments[1];
    }
    
    var 
    queryPacket,
    simulatedPacket,
    packLength;

    simulatedPacket = new Buffer(query.length * 4);// to support Encoding in 4 Bytes
    packLength = 5 + simulatedPacket.write(query, 0);
    queryPacket = new Buffer(packLength);
    queryPacket.writeUInt24LE(packLength - 4, 0);
    queryPacket.writeUInt8(0, 3);
    queryPacket [4] = constants.commands.COM_QUERY;
    queryPacket.write(query, 5, 'utf-8');

    // Ready to receive Data from the server
    this.socket.write(queryPacket);
    this.data = new MysqlBuffer();
    
    console.log("queryT " + queryT);
    
    if(queryT != 0){
        while(this.data.addBuffer(this.socket.read(), queryT)){
            console.log(this.data.getSize());
        }
    }
    else{
        while(this.data.addBuffer(this.socket.read())){
            console.log(this.data.getSize());
        }
    }
    console.log("e+++");
    this.data.init();
    console.log("e+++");
}

Protocol.prototype._codedBinaryLength = function (lengthCoded){

    if(lengthCoded <= 251){
        return 1;
    }
    else if(lengthCoded <= 65535){
        return 3;
    }
    else if(lengthCoded < 16777215){
        return 4;
    }
    else {
        return 9;
    }
}

Protocol.prototype._readErrorPacket = function (){
    
    var
    packetLength,
    
    offset;
    offset = 0;
    packetLength = this.data.readUInt24LE(offset);
    offset += 3;
    this.data.readUInt8(offset);// field count: always = 0xff
    offset ++;
    this.error.errno = this.data.readUInt16LE(offset);
    offset += 6;

    if(packetLength > 9)
        this.error.message =  this.data.toString(offset);
// after an error packet there is always no more information to read from the server
}

Protocol.prototype.prepare = function (i){

    var
    typePacket,
    headerLength,
    m;

    this.hasNext = true;
    headerLength = this.data.readUInt24LE();
    console.log("headerLength " + headerLength);
    this.data.advance(1);
   
    typePacket = this.data.readNextHex();

    if(typePacket == 0x00){//not (error || result set)
        console.log("OK? START");
        this.typePacket[i] = 1;
        this._readOkPacket(headerLength, i);
        
        //if(eof && (this.records[i]['serverStatus'] & constants.serverStatus.SERVER_MORE_RESULTS_EXISTS )!= 0)
          //  this.hasNext = false;
          
        this.hasNext = false;
        console.log("OK? END");

    }
    else if(typePacket == 0xff){//if error
        console.log("ERROR? START");
        this.typePacket[i] = -1;
        this.error = this._readQErrorPacket();
        this.hasNext = false;
        console.log("ERROR? END");
    }
    else{//Result set response
        console.log("ROWDATA? START");
        this.typePacket[i] = 0;
        this.metaData[i] = {};
        this.metaData[i]["fieldCount"] = this.data.readLCB();
        
        this.metaData[i]["fields"] = [this.metaData[i]["fieldCount"]];
        this.metaData[i]["titles"] = [this.metaData[i]["fieldCount"]];
        this.metaData[i]["types"] = [this.metaData[i]["fieldCount"]];

        for (m = 0; m < this.metaData[i]["fieldCount"]; m ++){
            console.log("ROWDATA? START ::: " + m);
            this.data.advance(4);
            this.data.readLCBString();
            this.metaData[i]["fields"][m] = {
 
                dbSchema	: this.data.readLCBString(), // Database identifier, also known as schema name
                table		: this.data.readLCBString(), //  Table identifier, after AS clause (if any)
                org_table	: this.data.readLCBString(),// Original table identifier, before AS clause (if any)
                name        	: this.data.readLCBString(),// Column identifier, after AS clause (if any)
                org_name	: this.data.readLCBString(),// Column identifier, after AS clause (if any)
                filler		: this.data.readUInt8(),// always is 0x00
                lang    	: this.data.readUInt16LE(),//  Character set number
                fieldLength	: this.data.readUInt32LE(), // Length of column
                type		: this.data.readUInt8(),// The code for the column's data type for ex:   0x00  for  FIELD_TYPE_DECIMAL,  0x0d   for FIELD_TYPE_YEAR
                flags		: this.data.readUInt16LE(),//  ex:  0001 NOT_NULL_FLAG, 0002 PRI_KEY_FLAG, 0004 UNIQUE_KEY_FLAG ...
                decimals	: this.data.readUInt8()// the number of positions after the decimalpoint if the type is DECIMAL or NUMERIC

            };

            this.data.advance(2);  
            this.metaData[i]["titles"][m] = this.metaData[i]["fields"][m]["name"];
            this.metaData[i]["types"][m] = this.metaData[i]["fields"][m]["type"];   
        }
     
        this.data.advance(9);
        this.data.saveRows(this.metaData[i]["fieldCount"]);
        this.data.advance(7);
        this.hasNext = false;
       /*if((this.data.readUInt16LE() & constants.serverStatus.SERVER_MORE_RESULTS_EXISTS )== 0){
            this.hasNext = false;
        }
        else
            console.log("has more result" );*/
    }
}

Protocol.prototype.prepareForFetch = function (i, eof){

    var
    typePacket,
    headerLength,
    m;

    this.hasNext = true;
    headerLength = this.data.readUInt24LE();
    console.log("headerLength " + headerLength);
    this.data.advance(1);
   
    typePacket = this.data.readNextHex();

    if(typePacket == 0x00){//not (error || result set)
        console.log("OK? START");
        this.typePacket[i] = 1;
        this._readOkPacket(headerLength, i);

        if(eof || (this.records[i]['serverStatus'] & constants.serverStatus.SERVER_MORE_RESULTS_EXISTS )!= 0)
            this.hasNext = false;
        
        console.log("OK? END");

    }
    else if(typePacket == 0xff){//if error
        console.log("ERROR? START");
        this.typePacket[i] = -1;
        this.error = this._readQErrorPacket();
        this.hasNext = false;
        console.log("ERROR? END");
    }
    else{//Result set response
        console.log("ROWDATA? START");
        this.typePacket[i] = 0;
        this.metaData[i] = {};
        this.metaData[i]["fieldCount"] = this.data.readLCB();
        
        this.metaData[i]["fields"] = [this.metaData[i]["fieldCount"]];
        this.metaData[i]["titles"] = [this.metaData[i]["fieldCount"]];
        this.metaData[i]["types"] = [this.metaData[i]["fieldCount"]];

        for (m = 0; m < this.metaData[i]["fieldCount"]; m ++){
            console.log("ROWDATA? START ::: " + m);
            this.data.advance(4);
            this.data.readLCBString();
            this.metaData[i]["fields"][m] = {
 
                dbSchema	: this.data.readLCBString(), // Database identifier, also known as schema name
                table		: this.data.readLCBString(), //  Table identifier, after AS clause (if any)
                org_table	: this.data.readLCBString(),// Original table identifier, before AS clause (if any)
                name        	: this.data.readLCBString(),// Column identifier, after AS clause (if any)
                org_name	: this.data.readLCBString(),// Column identifier, after AS clause (if any)
                filler		: this.data.readUInt8(),// always is 0x00
                lang    	: this.data.readUInt16LE(),//  Character set number
                fieldLength	: this.data.readUInt32LE(), // Length of column
                type		: this.data.readUInt8(),// The code for the column's data type for ex:   0x00  for  FIELD_TYPE_DECIMAL,  0x0d   for FIELD_TYPE_YEAR
                flags		: this.data.readUInt16LE(),//  ex:  0001 NOT_NULL_FLAG, 0002 PRI_KEY_FLAG, 0004 UNIQUE_KEY_FLAG ...
                decimals	: this.data.readUInt8()// the number of positions after the decimalpoint if the type is DECIMAL or NUMERIC

            };

            this.data.advance(2);  
            this.metaData[i]["titles"][m] = this.metaData[i]["fields"][m]["name"];
            this.metaData[i]["types"][m] = this.metaData[i]["fields"][m]["type"];   
        }
     
        this.data.skipRowsData();
        this.data.advance(7);
        if(eof || (this.data.readUInt16LE() & constants.serverStatus.SERVER_MORE_RESULTS_EXISTS )== 0){
            this.hasNext = false;
        }
        else
            console.log("has more result" );
    }
}

Protocol.prototype._hasMoreResult = function (){
    console.log("++++ " + this.fResult < (this.resultCount - 1));
    return (this.fResult < (this.resultCount - 1));

}

Protocol.prototype.setNextFetch = function (){

    if(this.typePacket[this.fResult] == 0){
        this.data.prepareSelectFetch();
    }
    
}

exports.Protocol = Protocol;
