


var testCase = {
    name: "Test datastore getMeasures() function ",

    /**
     * SSJS-GETMEASURES-1  test that GetMeasures() function exists
     */

    testThatGetMeasuresExists: function() {
		
		Y.Assert.areSame(typeof ds.getMeasures,"function");
    },
    
     /**
     * SSJS-GETMEASURES-2  test that GetMeasures() return an object
     */

    testThatGetMeasuresReturnsAnObject: function() {
    	
		Y.Assert.areSame(typeof ds.getMeasures(),"object");
		
    },
    
    testThatGetMeasuresReturnsDiskReadBytesObject: function() {
    	
		Y.Assert.isNotUndefined(JSON.stringify(ds.getMeasures().DB.diskReadBytes));	
    },
    
    testThatGetMeasuresReturnsDiskWriteBytesObject: function() {
    	
	
		Y.Assert.isNotUndefined(JSON.stringify(ds.getMeasures().DB.diskWriteBytes));
    },
    
    testThatGetMeasuresReturnsDiskReadCountObject: function() {
   
		Y.Assert.isNotUndefined(JSON.stringify(ds.getMeasures().DB.diskReadCount));
    },
   
    testThatGetMeasuresReturnsDiskWriteCountObject: function() {
   
		Y.Assert.isNotUndefined(JSON.stringify(ds.getMeasures().DB.diskWriteCount));
    },

   testThatGetMeasuresReturnsDiskWriteCountObject: function() {
   
		Y.Assert.isNotUndefined(JSON.stringify(ds.getMeasures().DB.dataSegment1));
    }, 
    
    testThatGetMeasuresReturnsDiskindexSegmentObject: function() {
   
		Y.Assert.isNotUndefined(JSON.stringify(ds.getMeasures().DB.indexSegment));
    },
    
    testThatGetMeasureReturnInfoAboutDataClass : function() {
    
			var xhr = new XMLHttpRequest();
			xhr.open("POST","http://127.0.0.1:8081/rest/Person/?$method=update");
			var obj = { attribute1:"hev", age:24 };
			xhr.send(JSON.stringify(obj));
			Y.Assert.areEqual(ds.getMeasures().DB.indexes.Person.ID.diskReadBytes.value,3108);
			Y.Assert.areEqual(ds.getMeasures().DB.indexes.Person.ID.diskReadCount.value,1);
    		Y.Assert.areEqual(ds.getMeasures().DB.indexes.Person.ID.cacheReadBytes.value,3080);
    		
    }
    
   //"{"DB":{"diskReadBytes":{"value":67917},"diskWriteBytes":{"value":43884},"diskReadCount":{"value":40},"diskWriteCount":{"value":21},"dataSegment1":{"diskReadBytes":{"value":53515},"diskWriteBytes":{"value":41782},"diskReadCount":{"value":34},"diskWriteCount":{"value":14}},"indexSegment":{"diskReadBytes":{"value":14402},"diskWriteBytes":{"value":2102},"diskReadCount":{"value":6},"diskWriteCount":{"value":7}}}}"

};

//require('unitTest').run(testCase).getReport()