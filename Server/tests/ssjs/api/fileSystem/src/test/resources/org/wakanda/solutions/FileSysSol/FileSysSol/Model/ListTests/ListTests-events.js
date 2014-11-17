

model.ListTests.result.onGet = function() {
var currentfilesystem = this.var;
var fs = FileSystemSync( ''+currentfilesystem);
var rootFolder = fs.path;
return ''+rootFolder;
//return "toto";
};
