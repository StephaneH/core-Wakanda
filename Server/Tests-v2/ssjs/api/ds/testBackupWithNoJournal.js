
//testUnitaire de l'API backup/restore sans activation du journal.
	function initBackups() {
	//initialisation
		var backup = Folder(getFolder().path+"Backups/");
		var n = backup.folders.length;
		for(var i = 0;i<n;i++)
		{
			var e = Folder(backup.folders[0].path);
			e.remove();
		}
		var m = backup.files.length;
		for(var i = 0;i<m;i++)
		{
			var e = File(backup.files[0].path);
			e.remove();
		}
		var backup1 = Folder(getFolder().path+"Backups1/");
		var n1 = backup1.folders.length;
		for(var i = 0;i<n1;i++)
		{
			var e = Folder(backup1.folders[0].path);
			e.remove();
		}
		var m1 = backup1.files.length;
		for(var i = 0;i<m1;i++)
		{
			var e = File(backup1.files[0].path);
			e.remove();
		}
		//fin d'initialisation
	};
	
var testCase = {
    name: "SSJS Backup Tests without Journal",
    
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
		initBackups();
    	var manif = ds.backup();
		Y.Assert.isObject(manif);
		Y.Assert.isNotNull(manif);
    },
    
    //2- Method Backup without params
    testMethodBackupWithoutParameters: function () {
    	var manif = ds.backup();
    	Y.Assert.areSame(manif.exists,true,"backup() doest not return a file" );
    	Y.Assert.areSame(manif.name,"backupManifest.json","backup() doest not return the correct file [expected: backupManifest.json]" );
    },
    
    //3- Method Backup with defining just useUniqueNames in the settings (to false)
    testMethodBackup_UseUniqueNamesToFalse: function () {
    	var back = "Backups/" ;
    	var config = 
    		{
        		useUniqueNames: false
    		};
		var isDataFolderExist = false; 						//si le dossier 'DataFolder/' existe dans le dossier 'Backups/'
		var folderBackup = Folder(getFolder().path+back); 	//le dossier 'Backups/'
		var numBackups = folderBackup.folders.length; 		//le nombre de backup qui existe dans le dossier 'Backups/'.
		
		for (var i=folderBackup.folders.length-1; i>=0; i--) 
		{
			if(folderBackup.folders[i].name == "DataFolder" )
			{
				isDataFolderExist = true;
				break;
			}
		};
		// la on va faire le backup
		var manif = ds.backup(config);
		if(manif.exists)
		{
			//puis on va tester sur le boolean isDataFolderExist
			if(isDataFolderExist && numBackups != folderBackup.folders.length && ( manif.parent.name != "DataFolder" || manif.parent.name != "data")) //le numBackups ne doit pas changer
			{
				Y.Assert.fail("The backup has not been created in the folder 'DataFolder'1");
			}
			if(!isDataFolderExist && numBackups != folderBackup.folders.length-1 && (manif.parent.name != "DataFolder" || manif.parent.name != "data")) //le numBackups doit etre incrémenté par un
			{
				Y.Assert.fail("The backup has not been created in the folder 'DataFolder'2");
			}
		}
		else
		{
			Y.Assert.fail("The backup (with useUniqueNmaes=false) has not been created");
		}
    }, 
    
    //4- Method Backup with defining just useUniqueNames in the settings (to false) : test default values
    testMethodBackup_UseUniqueNamesToFalse_DefaultValues: function () {
    	var back = "Backups/" ;
    	var config = 
    		{
        		useUniqueNames: false
    		};
    		
    	//on lance le backup
    	var manif = ds.backup(config);
    	
    	if(manif.exists)
		{
    		//on va tester si le backup est bien ajouté et est dans le bon endroit
    		if(manif.parent.name != back.substring(0,back.length-1))
    			Y.Assert.fail("initializing useUniqueName value to false fail" );
    		
    		//on va tester l'emplacement du registryFolder
    		var _backupRegistryFolder = manif.path.substring(0,manif.path.length - manif.parent.name.length - 1);
			if(_backupRegistryFolder == getFolder().path + back)
				Y.Assert.fail("initializing backupRegistryFolder value fail");
		}
		else
		{
			Y.Assert.fail("The backup (with useUniqueNmaes=false) has not been created");
		}
    }, 
    
    //5- Method Backup with defining just useUniqueNames in the settings (to true)
    testMethodBackup_UseUniqueNamesToTrue: function () {
    	var back = "Backups/" ;
    	var config = 
    		{
        		useUniqueNames: true
    		};
    	var folderBackup = Folder(getFolder().path+back); 	//le dossier 'Backups/'
		var numBackups = folderBackup.folders.length; 		//le nombre de backup qui existe dans le dossier 'Backups/'.
		
		// la on va faire le backup
		var manif = ds.backup(config);
		if(manif.exists)
		{
			if(numBackups != folderBackup.folders.length-1)
				Y.Assert.fail("intializing useUniqueNames to true fail");
		}
		else
		{
			Y.Assert.fail("The backup (with useUniqueNmaes=true) has not been created");
		}
    },
    
    //6- Method Backup with defining just useUniqueNames in the settings (to true) : test default values
    testMethodBackup_UseUniqueNamesToTrue_DefaultValues: function () {
    	var back = "Backups/" ;
    	var config = 
    		{
        		useUniqueNames: true
    		};
		
		// la on va faire le backup
		var manif = ds.backup(config);
		if(manif.exists)
		{
			//on va tester si le backup est bien ajouté et est dans le bon endroit
	    	if(manif.parent.parent.name != back.substring(0,back.length-1))
	    		Y.Assert.fail("initializing useUniqueName value to false fail" );
	    	//on va tester l'emplacement du registryFolder
	    	var _backupRegistryFolder = manif.path.substring(0,manif.path.length - manif.parent.name.length - 1);
			if(_backupRegistryFolder == getFolder().path + back)
				Y.Assert.fail("initializing backupRegistryFolder value fail");
    	}
    	else
		{
			Y.Assert.fail("The backup (with useUniqueNmaes=true) has not been created");
		}
    },
    
    //7- Method Backup with defining full settings 
    testMethodBackupWithtFullSettings: function () {
//    	debugger;
    	var back = "Backups1/" ;
    	var config = {
        		destination: Folder(getFolder().path + back),
        		useUniqueNames: true,
        		backupRegistryFolder: Folder(getFolder().path + back)
    		}
    		
    	var manif = ds.backup(config);
    	
    	Y.Assert.areSame(manif.parent.parent.name,back.substring(0,back.length-1),"defining useUniqueName value fail" );
    	
    	var s = manif.path;
    	var _backupRegistryFolder = s.substring(0,s.length - manif.parent.name.length - 1);
		if(_backupRegistryFolder == getFolder().path + back)
			Y.Assert.fail("defining backupRegistryFolder value fail");
			
    	if(manif.parent.folders.length == 0)
    		Y.Assert.fail("defining destination value fail");
    	
    	
    	Y.Assert.areSame(manif.name,"backupManifest.json","backup() doest not return the correct file [expected: backupManifest.json]" );
    },
    
    //8- Method Backup with defining full settings 
    testMethodBackupWithtFullSettings2: function () {
    	
    	var back = "Backups1/" ;
    	var config = {
        		destination: Folder(getFolder().path + back),
        		useUniqueNames: false,
        		backupRegistryFolder: Folder(getFolder().path + back)
    		}
    		
    	var manif = ds.backup(config);
    	
    	Y.Assert.areSame(manif.parent.name,back.substring(0,back.length-1),"defining useUniqueName value fail" );
    	
    	var _backupRegistryFolder = manif.path.substring(0,manif.path.length - manif.parent.name.length - 1);
		if(_backupRegistryFolder == getFolder().path + back)
			Y.Assert.fail("defining backupRegistryFolder value fail");
			
    	if(manif.parent.folders.length == 0)
    		Y.Assert.fail("defining destination value fail");
    }, 
    
    //9- Options du backup
    testMehodBackupWithOnlyOptionsParameter: function() {
			var isGood = false;
		    function myOpenProgress(title, maxElements)
		     {
		         console.log(title+" on "+maxElements+" operations"); // log the progress events
		     }
		 
		    function myProgress(curOp, maxElements)
		    {
		        console.log("current element: "+curOp);  // log each operation
		            // events can be nested
		    }
		     
		    function myCloseProgress()
		    {
		        console.log("closed progress");// add code to handle the closing of the progress event
		    }
		     
		    function myAddProblem(problem)
		    {
		        if (problem.ErrorLevel <= 2) // we only handle fatal or regular errors
		        {
		            this.storedProblems.push(problem);  // fill the custom array
		            console.log(problem.ErrorText);  // log the error description
		        }
		    }
		    var options = {
		        'openProgress': myOpenProgress,
		        'closeProgress': myCloseProgress,
		        'progress': myProgress,            
		        'addProblem': myAddProblem,
		         
		            // you can add any custom code here, it will be passed to the 
		            // addProblem function in the 'this' keyword
		        'storedProblems':[]   // we add an array to store any problems that arise
		        };
		         
		    var manifest = ds.backup(options); 
		     
		    if (options.storedProblems.length > 0)
		    {
		        console.log(options.storedProblem.name);// code to warn the user that some problems have occurred
		    }
		    else
		    {
		        isGood = true;
		    }
    	if(!isGood)
    		Y.Assert.fail("backup with only 'options' parameter fail");
    },
    
    //10- test option's backup and destination files
    testMehodBackupWithOnlyOptionsParameter_testFiles: function() {
			var isGood = false;
		    function myOpenProgress(title, maxElements)
		     {
		         console.log(title+" on "+maxElements+" operations"); // log the progress events
		     }
		 
		    function myProgress(curOp, maxElements)
		    {
		        console.log("current element: "+curOp);  // log each operation
		            // events can be nested
		    }
		     
		    function myCloseProgress()
		    {
		        console.log("closed progress");// add code to handle the closing of the progress event
		    }
		     
		    function myAddProblem(problem)
		    {
		        if (problem.ErrorLevel <= 2) // we only handle fatal or regular errors
		        {
		            this.storedProblems.push(problem);  // fill the custom array
		            console.log(problem.ErrorText);  // log the error description
		        }
		    }
		    var options = {
		        'openProgress': myOpenProgress,
		        'closeProgress': myCloseProgress,
		        'progress': myProgress,            
		        'addProblem': myAddProblem,
		        'storedProblems':[]   // we add an array to store any problems that arise
		        };
		         
		    var manif = ds.backup(options); 
		     
		    if (options.storedProblems.length > 0)
		    {
		        console.log(options.storedProblem.name);// code to warn the user that some problems have occurred
		    }
		    else
		    {
		        isGood = true;
		    }
    	if(!isGood)
    		Y.Assert.fail("backup with only 'options' parameter fail");
    	else
    	{
    		if(manif.exists)
			{
				//on va tester si le backup est bien ajouté et est dans le bon endroit
		    	if(manif.parent.name != "Backups")
		    		Y.Assert.fail("initializing useUniqueName value to false fail" );
		    	//on va tester l'emplacement du registryFolder
		    	var _backupRegistryFolder = manif.path.substring(0,manif.path.length - manif.parent.name.length - 1);
				if(_backupRegistryFolder == getFolder().path + "Backups/")
					Y.Assert.fail("initializing backupRegistryFolder value fail");
	    	}
	    	else
			{
				Y.Assert.fail("The backup (with useUniqueNmaes=true) has not been created");
			}	
	    }
    },
    
    //11- testing backup method using 'options' and 'config' parameters
        testMehodBackupWithOptionsAndConfigParameter: function() {
			var isGood = false;
		    function myOpenProgress(title, maxElements)
		     {
		         console.log(title+" on "+maxElements+" operations"); // log the progress events
		     }
		 
		    function myProgress(curOp, maxElements)
		    {
		        console.log("current element: "+curOp);  // log each operation
		            // events can be nested
		    }
		     
		    function myCloseProgress()
		    {
		        console.log("closed progress");// add code to handle the closing of the progress event
		    }
		     
		    function myAddProblem(problem)
		    {
		        if (problem.ErrorLevel <= 2) // we only handle fatal or regular errors
		        {
		            this.storedProblems.push(problem);  // fill the custom array
		            console.log(problem.ErrorText);  // log the error description
		        }
		    }
    		var config = {
        		destination: Folder(getFolder().path + "Backups1/"),
        		useUniqueNames: true,
        		backupRegistryFolder: Folder(getFolder().path + "Backups1/")
    		}
		    var options = {
		        'openProgress': myOpenProgress,
		        'closeProgress': myCloseProgress,
		        'progress': myProgress,            
		        'addProblem': myAddProblem,
		        'storedProblems':[]   // we add an array to store any problems that arise
		        };
		    //     
		    var manifest = ds.backup(config, options); 
		     
		    if (options.storedProblems.length > 0)
		    {
		        console.log(options.storedProblem.name);// code to warn the user that some problems have occurred
		    }
		    else
		    {
		        isGood = true;
		    }
    	if(!isGood)
    		Y.Assert.fail("backup with only 'options' parameter fail");
    },
    
    //12- testing destination files of backup method using 'options' and 'config' parameters
        testMehodBackupWithOptionsAndConfigParameter_testFiles: function() {
			var isGood = false;
		    function myOpenProgress(title, maxElements)
		     {
		         console.log(title+" on "+maxElements+" operations"); // log the progress events
		     }
		 
		    function myProgress(curOp, maxElements)
		    {
		        console.log("current element: "+curOp);  // log each operation
		            // events can be nested
		    }
		     
		    function myCloseProgress()
		    {
		        console.log("closed progress");// add code to handle the closing of the progress event
		    }
		     
		    function myAddProblem(problem)
		    {
		        if (problem.ErrorLevel <= 2) // we only handle fatal or regular errors
		        {
		            this.storedProblems.push(problem);  // fill the custom array
		            console.log(problem.ErrorText);  // log the error description
		        }
		    }
    		var config = {
        		destination: Folder(getFolder().path + "Backups1/"),
        		useUniqueNames: true,
        		backupRegistryFolder: Folder(getFolder().path + "Backups1/")
    		}
		    var options = {
		        'openProgress': myOpenProgress,
		        'closeProgress': myCloseProgress,
		        'progress': myProgress,            
		        'addProblem': myAddProblem,
		        'storedProblems':[]   // we add an array to store any problems that arise
		        };
		    //     
		    var manifest = ds.backup(config, options); 
		     
		    if (options.storedProblems.length > 0)
		    {
		        console.log(options.storedProblem.name);// code to warn the user that some problems have occurred
		    }
		    else
		    {
		        isGood = true;
		    }
    	if(!isGood)
    		Y.Assert.fail("backup with only 'options' parameter fail");
			initBackups();
    }
};