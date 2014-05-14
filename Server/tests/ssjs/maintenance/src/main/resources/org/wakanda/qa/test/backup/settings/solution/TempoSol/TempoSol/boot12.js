

// Journal desactivated
// Case: backup with default paramters

var testSolutionName = "mainSol";
var projectPath = getFolder().path+"../../"+testSolutionName+"/"+testSolutionName+"/";

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
    // add code to handle the closing of the progress event
}

function myAddProblem(problem)
{
    if (problem.ErrorLevel <= 2) // we only handle fatal or regular errors
    {
        this.storedProblems.push(problem);  // fill the custom array
        console.log(problem.ErrorText);  // log the error description
    }
}

var modelFile = File(projectPath + "Model.waModel");
var modelData = File(projectPath + "DataFolder/data.waData");


var config = {
    useUniqueNames:true, 
    backupRegistryFolder: Folder(projectPath+"MyBackups/")
    };
    

var options = {
    'openProgress': myOpenProgress,
    'closeProgress': myCloseProgress,
    'progress': myProgress,            
    'addProblem': myAddProblem,
    
        // you can add any custom code here, it will be passed to the 
        // addProblem function in the 'this' keyword
    'storedProblems':[]   // we add an array to store any problems that arise
    };
    
var manifest = null;
var messages = new Array(); // 
try{
	manifest = backupDataStore(modelFile, modelData, config, options);
}catch(e){
	for (var i = 0; i < e.messages.length; i++) {
		messages[i] = e.messages[i];
	};
}

var file = File(projectPath + "myFile.txt");
var stream = TextStream(file, "write");  // open the stream in write mode
for (var i = 0; i < messages.length; i++) {
		stream.write(messages[i]);
		if(i+1 < messages.length)
			stream.write("\n");
	};
stream.close(); // do not forget to close the stream


