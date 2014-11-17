function MySleep(delayInMs){
	var doSleep = function(){
		exitWait();
	}
    setTimeout(doSleep,1000);
    wait();
}

function copyFolderContents(options){
	var source = new Folder(options.source);
	var dest = new Folder(options.dest);
	
	if(!dest.exists){
		dest.create();
	}
	for(var i=0; i< source.files.length;i++){
		source.files[i].copyTo(dest.path+source.files[i].name,'Overwrite');
	}

	for(var i=0; i< source.folders.length;i++){
		var subFolder = source.folders[i];
		copyFolderContents({source:options.source+subFolder.name+'/',dest:options.dest+subFolder.name+'/'});
	}
}

/**
 * Binary compares two files. Super slow
 */
function compareFileContent(obj){
	
	var ok = true;
	var l = new File(obj.left.path);
	var r = new File(obj.right.path);
	var leftStream = BinaryStream(l);
	var rightStream = BinaryStream(r);
	try{
		Y.Assert.areEqual(leftStream.length,rightStream.length);
		var s = leftStream.getSize();
		while (s > 0){
			var leftBuf = leftStream.getBuffer(1024);
			var rightBuf = rightStream.getBuffer(1024);
		
			s -= leftBuf.length;
			for(var i = 0; i < leftBuf.length;i++){
				Y.Assert.areEqual(leftBuf[i],rightBuf[i]);
			}
		}
	}
	catch(e){
		ok = false;
	}
	finally{
		if(leftStream !=null){
			leftStream.close();
		}
		if(rightStream !=null){
			rightStream.close();
		}
	}
	return ok;
}
