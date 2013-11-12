var testCase = {
    name: "SSJS Backup Tests with Journal",
    
    _should: {
		error: {
			
		},
		ignore: {
			
		}
    },
    
    setUp : function () {
    	/*
        if (os.isWindows) {
    	}
    	if (os.isLinux) {
    	}
    	*/
    },
 

	//1- Method Backup existance
    testMethodBackupExistance: function () {
    	var manif = ds.backup();
		Y.Assert.isObject(manif);
		Y.Assert.isNotNull(manif);
    },
    
    //2- Method Backup without params (existance and name)
    testMethodBackupWithoutParameters: function () {
    	var manif = ds.backup();
    	Y.Assert.areSame(manif.exists,true,"backup() doest not return a file" );
    	Y.Assert.areSame(manif.name,"backupManifest.json","backup() doest not return the correct file [expected: backupManifest.json]" );
    }
}