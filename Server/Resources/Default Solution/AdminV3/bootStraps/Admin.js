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
/**

* @author admin

*/



function Log(file)  // Constructor function definition
{
    var log =
    {
        appendToLog: function (myMessage)   // append function
        {
            var file = this.logFile;
            if (file != null)
            {
                if (!file.exists)  // if the file does not exist
                    file.create();  // create it
                var stream = TextStream(file, "write");  // open the stream in write mode
                stream.write(myMessage+"\n"); // append the message to the end of stream
                stream.close(); // do not forget to close the stream
            }
        },
         
        init: function(file)  // to initialize the log
        {
            this.logFile = file;
            if (file.exists)
                file.remove();
            file.create();
        },
         
        set: function(file)  // to create the log file
        {
            if (typeof file == "string") // only text files can be created
                file = File(file); 
            this.logFile = file; 
        },
         
        logFile: null
    }
     
    log.set(file); 
     
    return log;
}

function Readfile(request,response){
var reg1=new RegExp("[=]+", "g");
var tab1 =request.urlQuery.split(reg1);

var reg=new RegExp("[ ]+", "g");
var tab = request.urlQuery.split(reg);
var app = solution.getApplicationByName( tab[1] );

	var file = File(app.ds.getDataFolder().path + 'Logs/' + tab1[1]);
	var stream = TextStream(file, "read"); 
	var str = stream.read();
	
	return str;

}



function DeleteFile(request,response)
{
var file = JSON.parse(request.body);

       if  (file.sol_name!=solution.name){
         var recentOpened = internal.recentlyOpenedSolution();

        var recentSolution = null;

        for (var pos = 0 ; (pos < recentOpened.length) ; ++pos)
            {
	if ((recentSolution == null) && (recentOpened[pos].name == file.sol_name))
		recentSolution = recentOpened[pos];
        }  
        
        if ((recentSolution != null) && (typeof recentSolution != 'undefined'))
         {
             
             try
	{
		var sol = internal.openSolution(  recentSolution.solutionFile.path, 2);
		if ((sol != null) && (typeof sol != 'undefined'))
		{
                       var reg=new RegExp("[ ]+", "g");
                            var tab =file.name.split(reg);
                            var app = sol.getApplicationByName( tab[1] );
                             if ((app.getItemsWithRole("data") == null) || (typeof app.getItemsWithRole("data") == 'undefined')) {
                                 
                                 return 'Not Done';
                                 
                             }
                            var datapath = app.getItemsWithRole("data").path;
                            datapath = datapath.replace(app.getItemsWithRole("data").name, "");
                            var DelFile = File(datapath+ 'Logs/' + file.name);
                            DelFile.remove();
                            return 'Done';
		}
	}
	
	catch (e)
	{
	}
	
	finally
	{
         if ((sol != null) && (typeof sol != 'undefined'))
                 {
                sol.close();
		sol = null;
                 }
	}
         }       
	
}else{

                            var reg=new RegExp("[ ]+", "g");
                            var tab =file.name.split(reg);
                            var app = solution.getApplicationByName( tab[1] );
                              if ((app.getItemsWithRole("data") == null) || (typeof app.getItemsWithRole("data") == 'undefined')) {
                                 
                                 return 'Not Done';
                                 
                             }
                            
                            var datapath = app.getItemsWithRole("data").path;
                            datapath = datapath.replace(app.getItemsWithRole("data").name, "");
                            var DelFile = File(datapath+ 'Logs/' + file.name);
                            DelFile.remove();
                            return 'Done';

}




}

function Files(request,response)
{
var application = JSON.parse(request.body);


 if  (application.sol_name!=solution.name){
         var recentOpened = internal.recentlyOpenedSolution();

        var recentSolution = null;

        for (var pos = 0 ; (pos < recentOpened.length) ; ++pos)
            {
	if ((recentSolution == null) && (recentOpened[pos].name == application.sol_name))
		recentSolution = recentOpened[pos];
        }  
        
        if ((recentSolution != null) && (typeof recentSolution != 'undefined'))
         {
             
             try
	{
		var sol = internal.openSolution(  recentSolution.solutionFile.path, 2);
		if ((sol != null) && (typeof sol != 'undefined'))
		{
                    var app = sol.getApplicationByName( application.name );
                    
                       if ((app.getItemsWithRole("data")==null) || (typeof app.getItemsWithRole("data") == 'undefined')) {
                                 
                                 
                                 var obj = {};
                                 obj.files =[];
                                return JSON.stringify(obj);
                                 
                             }
                    
                    
                    var datapath = app.getItemsWithRole("data").path;
                    datapath = datapath.replace(app.getItemsWithRole("data").name, "");

                    var folderlog = Folder(datapath + 'Logs');

                    var obj = {};
                    obj.files =[];				 
							 folderlog.forEachFile(function(file) 
							 {
							 	
							 	var f   = {};
							 	f.name = file.name
							 	f.date = file.creationDate
                                                                f.path = file.path
                                                                obj.files.push(f); // store the file path
							 });
 				
			  
                    return JSON.stringify(obj);
		}
	}
	
	catch (e)
	{
	}
	
	finally
	{
		  if ((sol != null) && (typeof sol != 'undefined'))
                 {
 	
                        sol.close();
                        sol = null;	
                        
                 }      
	}
         }       
	
}else{
                var app = solution.getApplicationByName( application.name );
                
                
                   if ((app.getItemsWithRole("data") == null) || (typeof app.getItemsWithRole("data") == 'undefined')) {
                                 
                                 var obj = {};
                                 obj.files =[];
                                 return  JSON.stringify(obj);
                                
                                 
                             }
                var datapath = app.getItemsWithRole("data").path;
                datapath = datapath.replace(app.getItemsWithRole("data").name, "");

                var folderlog = Folder(datapath + 'Logs');

                var obj = {};
                obj.files =[];				 
							 folderlog.forEachFile(function(file) 
							 {
							 	
							 	var f   = {};
							 	f.name = file.name
							 	f.date = file.creationDate
                                                                f.path = file.path
                                                                obj.files.push(f); // store the file path
							 });
 				
			  
                        return JSON.stringify(obj);
 
    }
}


//Repair Function


function Repair(request,response)
{
var application = JSON.parse(request.body);
	var app ;	
    function myOpenProgress(title, maxElements)
     {
		  log.appendToLog(title+" on "+maxElements+" elements");
          this.storedProblems.push(title+" on "+maxElements+" elements"); // log the progress events
     }
 
    function myProgress(curElement, maxElements)
    {
			//log.appendToLog("current element: "+curElement);  // log each element
            // events can be nested
    }
     
    function myCloseProgress()
    {
           // add code to handle the closing of the progress event
    }
     
    function myAddProblem(problem)
    {
       
            this.storedProblems.push(problem);  // fill the custom array
			log.appendToLog(problem.ErrorText);
            
    }
     



var 
recentSols = internal.recentlyOpenedSolution(),
result = {};
/**
 * solutions : contains all the recent solutions
 */
result.solutions = [];



for(var i = 0, sol; sol = recentSols[i] ; i++){
	
	var item = {};
	
	item.name = sol.name;
	
	item.projects = [];
	
	try{
		if(solution.name === sol.name){
			sol = solution;
		}	else{
			sol = internal.openSolution( sol.solutionFile.path, 2);
		}
		
		if ((sol != null) && (typeof sol != 'undefined')){
		
		
			 app = sol.getApplicationByName( application.name );
                         
                            if ((app.getItemsWithRole("data") == null) || (typeof app.getItemsWithRole("data") == 'undefined')) {
                                 
                                  var options = { 
                                                        'storedProblems':[] 
                                                 }
                                                 return JSON.stringify(options.storedProblems);
                                 
                             }
                                            modelFile =   File(app.getItemsWithRole("catalog").path);
                      var modelData ;
                      modelData =  File(app.getItemsWithRole("data").path);
					  var datapath = app.getItemsWithRole("data").path;
                      datapath = datapath.replace(app.getItemsWithRole("data").name, "");


                        var  folderM = Folder(datapath + 'repaired');
	 
	  
                  if (!folderM.exists) //check for subfolder named Documents
                        try {
                        folderM.create(); //if not there, create it
                        }
                        catch (e) { //if you can't create it, then error out
                        return {error: 5, errorMessage: ' could not create doc folder'};
                        }
      
       var repairDest = File(datapath + 'repaired/repaired.waData');



                      var log,folderlog;

                      folderlog = Folder(datapath + 'Logs');
	 
	  
	  if (!folderlog.exists) //check for subfolder named Documents
		try {
		folderlog.create(); //if not there, create it
		}
		catch (e) { //if you can't create it, then error out
		return {error: 5, errorMessage: ' could not create doc folder'};
		}

	  var logname,currentdate;
	  var date = new Date();
	  var currentdate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+'T'+date.getHours()+'.'+date.getMinutes()+'.'+date.getSeconds();
	  var shortdate = date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
          logname = 'repair '+app.name+' '+currentdate+ '.waLog';
	  var log = new Log(datapath +'Logs/'+ logname );
	
     
            var options = { 
                'openProgress': myOpenProgress,
                'closeProgress': myCloseProgress,
                'progress': myProgress,            
                'addProblem': myAddProblem,

                    // you can add any custom code here, it will be passed to the 
                    // addProblem function in the 'this' keyword
                'storedProblems':[] // we add an array to store any problems that arise
                }

             app.repairDataStore(modelFile, modelData, options, repairDest); 
     
       if (options.storedProblems.length > 0)
    {
    	
    	    
           log.appendToLog(options.storedProblems.length +" errors found");
           var res = {errors : options.storedProblems , file : { name : log.logFile.name , date : log.logFile.creationDate , path : log.logFile.path }};
          return JSON.stringify(res)
    }
    else
    {
           log.appendToLog("no errors found");
            var res = {errors : options.storedProblems , file : { name : log.logFile.name , date : log.logFile.creationDate , path : log.logFile.path }};
          return JSON.stringify(res)
    }
                         
		}
	
		}catch(e){
		console.log(e)
	}finally{
		try{
			
			if(solution.name != sol.name){
				sol.close();
		}
		
		}catch(e){}
	}
	
	
}

}






// Compact Function


function Compact(request,response)
{
var application = JSON.parse(request.body);
	var app ;	
    function myOpenProgress(title, maxElements)
     {
		  log.appendToLog(title+" on "+maxElements+" elements");
          this.storedProblems.push(title+" on "+maxElements+" elements"); // log the progress events
     }
 
    function myProgress(curElement, maxElements)
    {
			//log.appendToLog("current element: "+curElement);  // log each element
            // events can be nested
    }
     
    function myCloseProgress()
    {
           // add code to handle the closing of the progress event
    }
     
    function myAddProblem(problem)
    {
       
            this.storedProblems.push(problem);  // fill the custom array
			log.appendToLog(problem.ErrorText);
            
    }
     



var 
recentSols = internal.recentlyOpenedSolution(),
result = {};
/**
 * solutions : contains all the recent solutions
 */
result.solutions = [];



for(var i = 0, sol; sol = recentSols[i] ; i++){
	
	var item = {};
	
	item.name = sol.name;
	
	item.projects = [];
	
	try{
		if(solution.name === sol.name){
			sol = solution;
		}	else{
			sol = internal.openSolution( sol.solutionFile.path, 2);
		}
		
		if ((sol != null) && (typeof sol != 'undefined')){
		
		
			 app = sol.getApplicationByName( application.name );
                         
                            if ((app.getItemsWithRole("data") == null) || (typeof app.getItemsWithRole("data") == 'undefined')) {
                                 
                                  var options = { 
                                                        'storedProblems':[] 
                                                 }
                                                 return JSON.stringify(options.storedProblems);
                                 
                             }
                        var modelFile;
      modelFile =   File(app.getItemsWithRole("catalog").path);
      var modelData ;
      modelData =  File(app.getItemsWithRole("data").path);
      
      
    var datapath = app.getItemsWithRole("data").path;
    datapath = datapath.replace(app.getItemsWithRole("data").name, "");
      
      
    var  folderM = Folder(datapath + 'compacted');
	 
	  
	  if (!folderM.exists) //check for subfolder named Documents
		try {
		folderM.create(); //if not there, create it
		}
		catch (e) { //if you can't create it, then error out
		return {error: 5, errorMessage: ' could not create doc folder'};
		}
      
      
      
      
      
      
      
      
      var compactDest = File(datapath + 'compacted/compacted.waData');
      
      
      
	  var log,folderlog;
	  
	  folderlog = Folder(datapath + 'Logs');
	 
	  
	  if (!folderlog.exists) //check for subfolder named Documents
		try {
		folderlog.create(); //if not there, create it
		}
		catch (e) { //if you can't create it, then error out
		return {error: 5, errorMessage: ' could not create doc folder'};
		}

	  var logname,currentdate;
	  var date = new Date();
	  var currentdate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+'T'+date.getHours()+'.'+date.getMinutes()+'.'+date.getSeconds();
	  var shortdate = date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
          logname = 'compact '+app.name+' '+currentdate+ '.waLog';
	  var log = new Log(datapath +'Logs/'+ logname );
	
     
    var options = { 
        'openProgress': myOpenProgress,
        'closeProgress': myCloseProgress,
        'progress': myProgress,            
        'addProblem': myAddProblem,
         
            // you can add any custom code here, it will be passed to the 
            // addProblem function in the 'this' keyword
        'storedProblems':[] // we add an array to store any problems that arise
        }
         
     app.compactDataStore(modelFile, modelData, options, compactDest); 
     
     
       if (options.storedProblems.length > 0)
    {
    	
    	    
           log.appendToLog(options.storedProblems.length +" errors found");
           var res = {errors : options.storedProblems , file : { name : log.logFile.name , date : log.logFile.creationDate , path : log.logFile.path }};
          return JSON.stringify(res)
    }
    else
    {
           log.appendToLog("no errors found");
           var res = {errors : options.storedProblems , file : { name : log.logFile.name , date : log.logFile.creationDate , path : log.logFile.path }};
          return JSON.stringify(res)
    }
                         
		}
	
		}catch(e){
		console.log(e)
	}finally{
		try{
			
			if(solution.name != sol.name){
				sol.close();
		}
		
		}catch(e){}
	}
	
	
}

}





// Verify function 

function Verify(request,response)
{
var application = JSON.parse(request.body);
	var app ;	
    function myOpenProgress(title, maxElements)
     {
		  log.appendToLog(title+" on "+maxElements+" elements");
          this.storedProblems.push(title+" on "+maxElements+" elements"); // log the progress events
     }
 
    function myProgress(curElement, maxElements)
    {
			//log.appendToLog("current element: "+curElement);  // log each element
            // events can be nested
    }
     
    function myCloseProgress()
    {
           // add code to handle the closing of the progress event
    }
     
    function myAddProblem(problem)
    {
       
            this.storedProblems.push(problem);  // fill the custom array
			log.appendToLog(problem.ErrorText);
            
    }
     



var 
recentSols = internal.recentlyOpenedSolution(),
result = {};
/**
 * solutions : contains all the recent solutions
 */
result.solutions = [];



for(var i = 0, sol; sol = recentSols[i] ; i++){
	
	var item = {};
	
	item.name = sol.name;
	
	item.projects = [];
	
	try{
		if(solution.name === sol.name){
			sol = solution;
		}	else{
			sol = internal.openSolution( sol.solutionFile.path, 2);
		}
		
		if ((sol != null) && (typeof sol != 'undefined')){
		
		
			 app = sol.getApplicationByName( application.name );
                         
                            if ((app.getItemsWithRole("data") == null) || (typeof app.getItemsWithRole("data") == 'undefined')) {
                                 
                                  var options = { 
                                                        'storedProblems':[] 
                                                 }
                                                 return JSON.stringify(options.storedProblems);
                                 
                             }
                          var modelFile;
                          modelFile =   File(app.getItemsWithRole("catalog").path);
                          var modelData ;
                          modelData =  File(app.getItemsWithRole("data").path);
      
      
      var datapath = app.getItemsWithRole("data").path;
      datapath = datapath.replace(app.getItemsWithRole("data").name, "");
      
      
      
	 var log,folderlog;
	  
	  folderlog = Folder(datapath + 'Logs');
	 
	  
	  if (!folderlog.exists) //check for subfolder named Documents
		try {
		folderlog.create(); //if not there, create it
		}
		catch (e) { //if you can't create it, then error out
		return {error: 5, errorMessage: ' could not create doc folder'};
		}

	  var logname,currentdate;
	  var date = new Date();
	  var currentdate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+'T'+date.getHours()+'.'+date.getMinutes()+'.'+date.getSeconds();
	  var shortdate = date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
          logname = 'verify '+app.name+' '+currentdate+ '.waLog';
	  var log = new Log(datapath +'Logs/'+ logname );
	
     
    var options = {
        'openProgress': myOpenProgress,
        'closeProgress': myCloseProgress,
        'progress': myProgress,            
        'addProblem': myAddProblem,
         
            // you can add any custom code here, it will be passed to the 
            // addProblem function in the 'this' keyword
        'storedProblems':[] // we add an array to store any problems that arise
        }
         
    app.verifyDataStore(modelFile, modelData, options);  
     
     
       if (options.storedProblems.length > 0)
    {
    	
    	    
           log.appendToLog(options.storedProblems.length +" errors found");
           var res = {errors : options.storedProblems , file : { name : log.logFile.name , date : log.logFile.creationDate , path : log.logFile.path }};
          return JSON.stringify(res)
    }
    else
    {
           log.appendToLog("no errors found");
           var res = {errors : options.storedProblems , file : { name : log.logFile.name , date : log.logFile.creationDate , path : log.logFile.path }};
          return JSON.stringify(res)
    }
                         
		}
	
		}catch(e){
		console.log(e)
	}finally{
		try{
			
			if(solution.name != sol.name){
				sol.close();
		}
		
		}catch(e){}
	}
	
	
}

}