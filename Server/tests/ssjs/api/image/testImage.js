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
var appPath = application.getFolder("path"),
    imagesFolder = Folder(appPath + 'images'),
*/

function count(){
    var counter = 0;
    for(var p in this) if(this.hasOwnProperty(p))++counter;
    return counter;
}

var	arrayCommon = ["jpg", "bmp", "gif", "png", "tif", "svg", "raw"];
	arrayJPEG = ["jpg", "jif", "jpeg", "jpe"],
	arrayPNG = ["png"],
	arrayBMP = ["bmp", "dib", "rle"],
	arrayGIF = ["gif"],
	arrayTIFF = ["tif", "tiff"], 
	arrayWMetaFile = ["emf"], //Win only 
	arrayPDF = ["pdf"], //MacOS only
	arraySVG = ["svg"], 
	arrayResolution = [320240, 640480, 800600, 1024768, 1152864, 12801024, 1280854, 1440900, 16001200],
	i = 0;
	
var testCase = {
    
     name: "test API image",
     
      _should: {
		error: {
			
			
		},
		ignore: {
		testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFileSource320240JPEG_893:true

		}
    },
   
     /*
     * Sets up data that is needed by each test.
     */
	 setUp : function () {
				
		
        //imagesFolder.create();
         
    	if (os.isWindows) {
    	//Win Stuff	
    	}
    	else if (os.isLinux) {
    	//Linux Stuff	
    	}
		else {
		//MAC Stuff
		}	 
		
	},

	/*
     * Cleans up everything that was created by setUp().
     */
	tearDown : function () {
	
	/*
	 *	ds.Image.remove();
	 *	ds.ImageWithLoadImage.remove();
	 *	ds.ImageWithoutLoadImage.remove();
	 */	i++;
		
    },
    
    
    /*
     *
     * Test methods for API SSJS IMAGE
     *
     */
	 
 	// 0 --**-- Object image exist
 	testImage_ObjectImageExist_0: function() {   
 	
 	var thepath = getFolder("path"),
		img = loadImage(thepath + "images/misc/1.png");
	var	result = typeof img;

 	Y.Assert.areSame("object", result);    
 	
      },
 	// 1 --**-- Property height exist 
 	testImage_PropertyHeightExist_1: function() {      
     
    var thepath = getFolder("path"),
		img = loadImage(thepath + "images/misc/1.png");
	var	result = typeof img.height;

 	Y.Assert.areSame("number", result);  
            
        },  
    // 2 --**-- Property length exist 
    testImage_PropertyLengthExist_2: function() { 
   
    var thepath = getFolder("path"),
		img = loadImage(thepath + "images/misc/1.png");
	var	result = typeof img.length;

 	Y.Assert.areSame("number", result); 
   
		}, 
	// 3 --**-- Object meta exist
	testImage_ObjectMetaExist_3: function() {
		
	var thepath = getFolder("path"),
		img = loadImage(thepath + "images/misc/1.png");
	var	result = typeof img.meta;

 	Y.Assert.areSame("object", result); 	
		
		},
	// 4 --**-- Property size exist 	
	testImage_PropertySizeExist_4: function() {
	 	
	 var thepath = getFolder("path"),
		 img = loadImage(thepath + "images/misc/1.png");
	 var result = typeof img.size;

 	Y.Assert.areSame("number", result);	
	 	
	  	}, 
    
    // 5 --**-- Property width exist 
    testImage_PropertyWidthExist_5: function() { 
    
    var thepath = getFolder("path"),
		img = loadImage(thepath + "images/misc/1.png");
	var	result = typeof img.width;

 	Y.Assert.areSame("number", result);
    
    	}, 
    	
    // 6 --**-- Method save() exist 
    testImage_MethodSaveExist_6: function() { 
    
    var MyImage = new ds.Image(),
    				thepath = getFolder("path"),
					img = loadImage(thepath + "images/misc/1.png");
		MyImage.pics = img;
	var	result = typeof MyImage.save();

 	Y.Assert.areSame("boolean", result);
    
		}, 
		
	// 7 --**-- Method saveMeta() exist 
	testImage_MethodSaveMetaExist_7: function() {
		
	var MyImage = new ds.Image();
    				thepath = getFolder("path"),
					img = loadImage(thepath + "images/misc/1.png"),
					newMeta = {IPTC:{Keywords:"Wakanda"}};
	var	result = typeof img.saveMeta(newMeta);

 	Y.Assert.areSame("object", result);
		
		}, 
	
	// 8 --**-- Method setPath() exist 
	testImage_MethodSethPathExist_8: function() {		
		
	var thepath = getFolder("path"),
		pictFile = File (thepath + "images/misc/1.png"), 
		myPict = loadImage (pictFile),
		thumb = myPict.thumbnail(300,200,4),
		thumbFile = File(pictFile.getParent(), pictFile.nameNoExt+"_thumb."+pictFile.extension); 
	var	result = typeof thumb.setPath(thumbFile); 

	Y.Assert.areSame("object", result);
		
		}, 
	
	// 9 --**-- Method thumbnail() exist  
	testImage_MethodThumbnailExist_9: function() { 
	
	var thepath = getFolder("path"),
		pictFile = File (thepath + "images/misc/1.png"), 
		myPict = loadImage (pictFile);
	var	result = typeof myPict.thumbnail(300,200,4);

	Y.Assert.areSame("object", result);
		},
		
	// 10 --**-- Method LoadImage() exist  
	testImage_MethodLoadImageExist_10: function() { 
	
	var MyImage = new ds.Image(),
    				thepath = getFolder("path");
	var result = typeof loadImage(thepath + "images/misc/1.png");

	Y.Assert.areSame("object", result);
	
		},
		
	// 11 --**-- Image Object : number of properties 
	testImage_NumberOfPropertiesObjectImage_11: function() { 
	
	var MyImage = new ds.Image();
    				thepath = getFolder("path"),
					img =  loadImage(thepath + "images/misc/1.png");
	var result = count.call(img);

	Y.Assert.areEqual(5, result);
	
		},
		
	// 12 --**-- Image Object width image test 	
	testImage_ImageObjectWidthMiscImageTest_12: function() { 
	
	var thepath = getFolder("path"),
		img = loadImage(thepath + "images/misc/1.png");
	var result = img.width;

 	Y.Assert.areEqual(477, result);
	
		},
		
	// 13 --**-- Image Object height image test 	
	testImage_ImageObjectHeightMiscImageTest_13: function() { 
	
	var thepath = getFolder("path"),
		img = loadImage(thepath + "images/misc/1.png");
	var result = img.height;

 	Y.Assert.areEqual(300, result);
	
		},
	// 14 --**-- Image Object length image test 	
	testImage_ImageObjectLengthMiscImageTest_14: function() { 
	
	var thepath = getFolder("path"),
		img = loadImage(thepath + "images/misc/1.png");
	var result = img.length;

 	Y.Assert.areEqual(109462, result);
	
		},

	// 15 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image test (jpeg)
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageTestjpg_15: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/misc/1.png");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
 	 Y.Assert.areEqual(true,result);
    
		},

	// 16 --**--Save the picture in an entity with a File Object with LoadImage(), with image test (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImageTestjpg_16: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/misc/1.png"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 17 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240SVG_17: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/320240.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
	},

	// 18 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240SVG_18: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/320240.svg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 19 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 16bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240BMP16bits_19: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 20 --**--Save the picture in an entity with a File Object with LoadImage(), with image 16bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240BMP16bits_20: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_16bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 21 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240BMP24bits_21: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 22 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240BMP24bits_22: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 23 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 32bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240BMP32bits_23: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
 	 Y.Assert.areEqual(true,result);
    
		},


	// 24 --**--Save the picture in an entity with a File Object with LoadImage(), with image 32bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240BMP32bits_24: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_32bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 25 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits OS/2 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240BMP24bits_OS2_25: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 26 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits OS/2 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240BMP24bits_OS2_26: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_OS-2_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },  


    // 27 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240GIF_27: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/320240.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 28 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240GIF_28: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/320240.gif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 29 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240JPEG_29: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 30 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240JPEG_30: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/320240.jpg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 31 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240JPG2000_31: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/320240.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 32 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240JPG2000_32: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/320240.jpf"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 33 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240PNG_33: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/320240.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 34 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240PNG_34: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/320240.png"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 35 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240RAW_35: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/320240.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 36 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240RAW_36: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/320240.raw"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 37 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240TIFWCMAC_37: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 38 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240TIFWCMAC_38: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 39 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240TIFWCPC_39: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 40 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240TIFWCPC_40: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 41 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240TIFLZWPC_41: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 42 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240TIFLZWPC_42: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 43 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240TIFLZWMAC_43: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 44 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240TIFLZWMAC_44: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 45 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240TIFZIPMAC_45: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 46 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240TIFZIPMAC_46: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 47 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240TIFZIPPC_47: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 48 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240TIFZIPPC_48: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },



    // 49 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240TIFJPEGJPEGPC_49: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_JPEG_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 50 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240TIFJPEGPC_50: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 51 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240TIFJPEGJPEGMAC_51: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 52 --**--Save the picture in an entity with a File Object with LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage320240TIFJPEGMAC_52: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 53 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 16bits 640*480 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480BMP16bits_53: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/640480_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 54 --**--Save the picture in an entity with a File Object with LoadImage(), with image 16bits 640*480 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480BMP16bits_54: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/640480_16bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 55 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits 640*480 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480BMP24bits_55: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/640480_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 56 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits 640*480 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480BMP24bits_56: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/640480_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 57 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 32bits 640*480 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480BMP32bits_57: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/640480_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 58 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits OS/2 640*480 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480BMP24bits_58: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/640480_OS-2_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 59 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits OS/2 640*480 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480BMP24bits_OS2_59: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/640480_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 60 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480GIT_60: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/640480.gif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 61 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480GIT_61: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/640480.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

  	// 62 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480JPEG_62: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/640480.jpg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 63 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480JPEG_63: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/640480.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 64 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480JPG2000_64: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/640480.jpf"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 65 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480JPG2000_65: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/640480.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 66 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480PNG_66: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/640480.png"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 67 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480PNG_67: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/640480.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 68 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480RAW_68: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/640480.raw"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 69 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480RAW_69: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/640480.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 70 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480SVG_70: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/640480.svg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 71 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480SVG_71: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/640480.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 72 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (tif) without Compression, format PC 
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480TIFFWCPC_72: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_without_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    	
      },

 	// 73 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (tif) without Compression, format PC 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480TIFFWCPC_73: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/640480_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 74 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (tif) without Compression, format MAC 
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480TIFFWCMAC_74: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_without_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 75 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (tif) without Compression, format MAC 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480TIFFWCMAC_75: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/640480_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 76 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (tif) with LZW Compression, format MAC 
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480TIFFWLZWMAC_76: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_LZW_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 77 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (tif) with LZW Compression, format MAC 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480TIFFWLZWMAC_78: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/640480_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 78 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (tif) with LZW Compression, format PC 
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480TIFFWLZWPC_78: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_LZW_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 79 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (tif) with LZW Compression, format PC 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480TIFFWLZWPC_79: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/640480_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 80 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (tif) with ZIP Compression, format PC 
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480TIFFWZIPPC_80: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_ZIP_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 81 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (tif) with ZIP Compression, format PC 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480TIFFWZIPPC_81: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/640480_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 82 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (tif) with ZIP Compression, format MAC 
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480TIFFWZIPMAC_82: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_ZIP_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 83 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (tif) with ZIP Compression, format MAC 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480TIFFWZIPMAC_83: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/640480_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 84 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (tif) with JPEG Compression, format MAC 
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480TIFFWJPEGMAC_84: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 85 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (tif) with JPEG Compression, format MAC 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480TIFFWJPEGMAC_85: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/640480_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 86 --**--Save the picture in an entity with a File Object with LoadImage(), with image 640*480 (tif) with JPEG Compression, format PC 
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480TIFFWJPEGPC_86: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_JPEG_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 87 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 640*480 (tif) with JPEG Compression, format PC 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480TIFFWJPEGPC_87: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/640480_JPEG_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 88 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 16bits 800*600 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600BMP16bits_88: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/800600_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    			
		},

	// 89 --**--Save the picture in an entity with a File Object with LoadImage(), with image 16bits 800*600 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600BMP16bits_89: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/800600_16bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 90 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits 800*600 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600BMP24bits_90: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/800600_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 91 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits 800*600 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600BMP24bits_91: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/800600_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 92 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 32bits 800*600 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600BMP32bits_92: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/800600_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 93 --**--Save the picture in an entity with a File Object with LoadImage(), with image 32bits 800*600 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600BMP32bits_93: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/800600_32bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 94 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits OS/2 800*600 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage640480BMP24bits_OS2_94: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/800600_OS-2_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 95 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits OS/2 800*600 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600BMP24bits_OS2_95: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/800600_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 96 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600GIT_96: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/800600.gif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 97 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600GIT_97: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/800600.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
   	  },


	// 98 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600JPG_98: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/800600.jpg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 99 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600JPG_99: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/800600.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 100 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600JPG2000_100: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/800600.jpf"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 101 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600JPG2000_101: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/800600.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 102 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600PNG_102: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/800600.png"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 103 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600PNG_103: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/800600.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 104 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600RAW_104: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/800600.raw"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 105 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600RAW_105: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/800600.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 106 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600SVG_106: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/800600.svg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 107 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600SVG_107: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/800600.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},



	// 108 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600TIFFWCPC_108: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_without_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 109 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600TIFFWCPC_109: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/800600_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 110 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600TIFFWCMAC_110: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_without_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 111 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600TIFFWCMAC_111: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/800600_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 112 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600TIFFWLZWMAC_112: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_LZW_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 113 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600TIFFWLZWMAC_113: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/800600_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 114 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600TIFFWLZWPC_114: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_LZW_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 115 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600TIFFWLZWPC_115: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/800600_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 116 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600TIFFWZIPPC_116: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_ZIP_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 117 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600TIFFWZIPPC_117: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/800600_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 118 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600TIFFWZIPMAC_118: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_ZIP_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 119 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600TIFFWZIPMAC_119: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/800600_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 120 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600TIFFWJPEGMAC_120: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 121 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600TIFFWJPEGMAC_121: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/800600_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 122 --**--Save the picture in an entity with a File Object with LoadImage(), with image 800*600 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage800600TIFFWJPEGPC_122: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_JPEG_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 123 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 800*600 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600TIFFWJPEGPC_123: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/800600_JPEG_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 124 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 16bits 1024*768 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768BMP16bits_124: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1024768_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    			
		},

	// 125 --**--Save the picture in an entity with a File Object with LoadImage(), with image 16bits 1024*768 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768BMP16bits_125: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1024768_16bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 126 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits 1024*768 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768BMP24bits_126: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1024768_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    		
		},

	// 127 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits 1024*768 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768BMP24bits_127: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1024768_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 128 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 32bits 1024*768 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768BMP32bits_128: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1024768_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 129 --**--Save the picture in an entity with a File Object with LoadImage(), with image 32bits 1024*768 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768BMP32bits_129: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1024768_32bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 130 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits OS/2 1024*768 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768BMP24bits_OS2_130: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1024768_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 131 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits OS/2 1024*768 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768BMP24bits_OS2_131: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1024768_OS-2_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 132 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768GIF_132: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/1024768.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	 
		},

	// 133 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768GIF_133: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/1024768.gif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 134 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768JPEG_134: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/1024768.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 135 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768JPEG_135: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/1024768.jpg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 136 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768JPEG2000_136: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/1024768.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 137 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768JPEG2000_137: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/1024768.jpf"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 138 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768PNG_138: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/1024768.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 139 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768PNG_139: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/1024768.png"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 140 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768RAW_140: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/1024768.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 141 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768RAW_141: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/1024768.raw"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 142 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768SVG_142: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/1024768.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    			
		},

	// 143 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768SVG_143: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/1024768.svg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 144 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768TIFFWCMAC_144: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1024768_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 145 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768TIFFWCMAC_145: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_without_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 146 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768TIFFWCPC_146: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1024768_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 147 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768TIFFWCPC_147: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_without_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 148 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768TIFFWLZWPC_148: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1024768_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 149 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768TIFFWLZWPC_149: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_LZW_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 150 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768TIFFWLZWMAC_150: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1024768_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 151 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768TIFFWLZWMAC_151: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_LZW_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 152 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768TIFFWZIPMAC_152: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1024768_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 153 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768TIFFWZIPMAC_153: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_ZIP_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 154 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768TIFFWZIPPC_154: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1024768_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 155 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768TIFFWZIPPC_155: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_ZIP_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 156 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768TIFFWJPEGPC_156: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1024768_JPEG_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 157 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768TIFFWJPEGPC_157: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_JPEG_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 158 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1024*768 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768TIFFWJPEGMAC_158: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1024768_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 159 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1024*768 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1024768TIFFWJPEGMAC_159: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 160 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 16bits 1152*864 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864BMP16bits_160: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1152864_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 161 --**--Save the picture in an entity with a File Object with LoadImage(), with image 16bits 1152*864 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864BMP16bits_161: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1152864_16bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 162 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits 1152*864 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864BMP24bits_162: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1152864_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 163 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits 1152*864 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864BMP24bits_163: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1152864_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 164 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 32bits 1152*864 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864BMP32bits_164: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1152864_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 165 --**--Save the picture in an entity with a File Object with LoadImage(), with image 32bits 1152*864 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864BMP32bits_165: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1152864_32bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 166 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits OS/2 1152*864 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864BMP24bits_OS2_166: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1152864_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 167 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits OS/2 1152*864 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864BMP24bits_OS2_167: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1152864_OS-2_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 168 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1152*864 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864GIF_168: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/1152864.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 169 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864GIF_169: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/1152864.gif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 170 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1152*864 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864JPEG_170: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/1152864.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 171 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864JPEG_171: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/1152864.jpg"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 172 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1152*864 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864JPEG2000_172: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/1152864.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 173 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864JPEG2000_173: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/1152864.jpf"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 174 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1152*864 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864PNG_174: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/1152864.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 175 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864PNG_175: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/1152864.png"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 176 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1152*864 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864RAW_176: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/1152864.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 177 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864SVG_177: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/1152864.svg"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 178 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864SVG_178: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/1152864.svg"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 179 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWCMAC_179: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_without_MAC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 180 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWCMAC_180: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_without_MAC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 181 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWCPC_181: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_without_PC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 182 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWCPC_182: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_without_PC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 183 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWLZWPC_183: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_LZW_PC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 184 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWLZWPC_184: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_LZW_PC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 185 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWLZWMAC_185: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_LZW_MAC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 186 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWLZWMAC_186: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_LZW_MAC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 187 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWZIPMAC_187: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_ZIP_MAC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 188 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWZIPMAC_188: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_ZIP_MAC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 189 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWZIPPC_189: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_ZIP_PC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 190 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWZIPPC_190: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_ZIP_PC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 191 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWJPEGPC_191: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_JPEG_PC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 192 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWJPEGPC_192: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_JPEG_PC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      }, 


    // 193 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWJPEGMAC_193: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_JPEG_MAC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 194 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1152*864 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1152864TIFFWJPEGMAC_194: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_JPEG_MAC.tif"), 
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      }, 


    // 195 --**--Save the picture in an entity with a File Object with LoadImage(), with image 16bits 1280*854 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854BMP16bits_195: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1280854_16bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 196 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 16bits 1280*854 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854BMP16bits_196: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1280854_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 197 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits 1280*854 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854BMP24bits_197: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1280854_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 198 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits 1280*854 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854BMP24bits_198: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1280854_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 199 --**--Save the picture in an entity with a File Object with LoadImage(), with image 32bits 1280*854 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854BMP32bits_199: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1280854_32bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 200 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 32bits 1280*854 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854BMP32bits_200: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1280854_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 201 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits OS/2 1280*854 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854BMP24bits_OS2_201: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1280854_OS-2_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 202 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits OS/2 1280*854 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854BMP24bits_OS2_202: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1280854_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 203 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854GIF_203: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/1280854.gif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 204 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854GIF_204: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/1280854.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 205 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854JPEG_205: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/1280854.jpg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 206 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854JPEG_206: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/1280854.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 207 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854JPEG_207: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/1280854.jpf"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 208 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854JPEG_208: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/1280854.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 209 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854PNG_209: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/1280854.png"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 210 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854PNG_210: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/1280854.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 211 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854RAW_211: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/1280854.raw"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 212 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854RAW_212: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/1280854.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 213 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854SVG_213: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/1280854.svg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 214 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854SVG_214: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/1280854.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 215 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854TIFFWCPC_215: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_without_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 216 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854TIFFWCPC_216: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1280854_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 217 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854TIFFWCMAC_217: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_without_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 218 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854TIFFWCMAC_218: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1280854_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 219 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854TIFFWLZWMAC_219: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_LZW_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 220 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854TIFFWLZWMAC_220: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1280854_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 221 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854TIFFWLZWMAC_221: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_LZW_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 222 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854TIFFWLZWMAC_222: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1280854_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 223 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854TIFFWZIPPC_223: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_ZIP_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 224 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854TIFFWZIPPC_224: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1280854_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 225 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854TIFFWZIPMAC_225: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_ZIP_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 226 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854TIFFWZIPMAC_226: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1280854_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 227 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854TIFFWJPEGPC_227: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_JPEG_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 228 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854TIFFWJPEGPC_228: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1280854_JPEG_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 229 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*854 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1280854TIFFWJPEGMAC_229: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 230 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*854 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854TIFFWJPEGMAC_230: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1280854_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 231 --**--Save the picture in an entity with a File Object with LoadImage(), with image 16bits 1280*1024 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024BMP16bits_231: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/12801024_16bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 232 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 16bits 1280*1024 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024BMP16bits_232: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/12801024_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 233 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits 1280*1024 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024BMP24bits_233: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/12801024_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 234 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits 1280*1024 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024BMP24bits_234: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/12801024_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 235 --**--Save the picture in an entity with a File Object with LoadImage(), with image 32bits 1280*1024 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024BMP32bits_235: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/12801024_32bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 236 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 32bits 1280*1024 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024BMP32bits_236: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/12801024_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 237 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits OS/2 1280*1024 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024BMP24bits_237: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/12801024_OS-2_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 238 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits OS/2 1280*1024 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024BMP24bits_238: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/12801024_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 239 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024GIF_239: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/12801024.gif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 240 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024GIF_240: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/12801024.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 241 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024JPEG_241: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/12801024.jpg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 242 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024JPEG_242: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/12801024.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 243 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024JPG2000_243: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/12801024.jpf"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 244 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024JPG2000_244: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/12801024.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 245 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024PNG_245: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/12801024.png"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 246 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024PNG_246: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/12801024.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 247 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024RAW_247: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/12801024.raw"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 248 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024RAW_248: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/12801024.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 249 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024SVG_249: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/12801024.svg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 250 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024SVG_250: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/12801024.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 251 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024TIFFWCMAC_251: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_without_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 252 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024TIFFWCMAC_252: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/12801024_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 253 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024TIFFWCPC_253: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_without_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 254 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024TIFFWCPC_254: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/12801024_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 255 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024TIFFWLZWPC_255: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_LZW_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 256 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024TIFFWLZWPC_256: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/12801024_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 257 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024TIFFWLZWMAC_257: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_LZW_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 258 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024TIFFWLZWMAC_258: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/12801024_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 259 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024TIFFWZIPPC_259: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_ZIP_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 260 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024TIFFWZIPPC_260: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/12801024_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 261 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024TIFFWZIPMAC_261: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_ZIP_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 262 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024TIFFWZIPMAC_262: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/12801024_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	 
		},

	// 263 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024TIFFWJPEGMAC_263: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 264 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024TIFFWJPEGMAC_264: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/12801024_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 265 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1280*1024 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage12801024TIFFWJPEGPC_265: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 266 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1280*1024 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024TIFFWJPEGPC_266: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/12801024_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 267 --**--Save the picture in an entity with a File Object with LoadImage(), with image 16bits 1440*900 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900BMP16bits_267: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1440900_16bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 268 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 16bits 1440*900 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900BMP16bits_268: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1440900_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 269 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits 1440*900 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900BMP24bits_269: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1440900_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 270 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits 1440*900 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900BMP24bits_270: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1440900_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 271 --**--Save the picture in an entity with a File Object with LoadImage(), with image 32bits 1440*900 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900BMP32bits_271: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1440900_32bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 272 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 32bits 1440*900 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900BMP32bits_272: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1440900_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 273 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits OS/2 1440*900 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900BMP24bits_273: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1440900_OS-2_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 274 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits OS/2 1440*900 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900BMP24bits_274: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/1440900_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 275 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900GIF_275: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/1440900.gif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 276 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900GIF_276: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/1440900.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 277 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900JPEG_277: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/1440900.jpg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 278 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900JPEG_278: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/1440900.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 279 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900JPG2000_279: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/1440900.jpf"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 280 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900JPG2000_280: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/1440900.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 281 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900PNG_281: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/1440900.png"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 282 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900PNG_282: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/1440900.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 283 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900RAW_283: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/1440900.raw"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 284 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900RAW_285: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/1440900.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 285 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900SVG_285: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/1440900.svg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 286 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900SVG_286: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/1440900.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 287 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900TIFFWCMAC_287: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_without_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 288 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900TIFFWCMAC_288: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1440900_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 289 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900TIFFWCPC_289: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_without_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 290 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900TIFFWCPC_290: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1440900_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 291 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900TIFFWLZWPC_291: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_LZW_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 292 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900TIFFWLZWPC_292: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1440900_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 293 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900TIFFWLZWMAC_293: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_LZW_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 294 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900TIFFWLZWMAC_294: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1440900_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 295 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900TIFFWZIPPC_295: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_ZIP_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 296 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900TIFFWZIPPC_296: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1440900_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	 
		},

	// 297 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900TIFFWZIPMAC_297: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_ZIP_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 298 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900TIFFWZIPMAC_298: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1440900_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 299 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900TIFFWJPEGMAC_299: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 300 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900TIFFWJPEGMAC_300: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/12801024_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 301 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1440*900 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage1440900TIFFWJPEGPC_301: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 302 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1440*900 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage1440900TIFFWJPEGPC_302: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/1440900_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 303 --**--Save the picture in an entity with a File Object with LoadImage(), with image 16bits 1600*1200 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200BMP16bits_303: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/16001200_16bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 304 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 16bits 1600*1200 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200BMP16bits_305: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/16001200_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 305 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits 1600*1200 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200BMP24bits_305: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/16001200_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 306 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits 1600*1200 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200BMP24bits_306: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/16001200_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 307 --**--Save the picture in an entity with a File Object with LoadImage(), with image 32bits 1600*1200 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200BMP32bits_307: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/16001200_32bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 308 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 32bits 1600*1200 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200BMP32bits_308: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/16001200_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 309 --**--Save the picture in an entity with a File Object with LoadImage(), with image 24bits OS/2 1600*1200 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200BMP24bits_309: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/16001200_OS-2_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 310 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 24bits OS/2 1600*1200 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200BMP24bits_310: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/16001200_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 311 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200GIF_311: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/16001200.gif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 312 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200GIF_312: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/16001200.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 313 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200JPEG_313: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/16001200.jpg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 314 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200JPEG_314: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/16001200.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 315 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200JPG2000_315: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/16001200.jpf"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 316 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200JPG2000_316: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/16001200.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 317 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200PNG_317: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/16001200.png"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 318 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200PNG_318: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/16001200.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 319 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200RAW_319: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/16001200.raw"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 320 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200RAW_320: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/16001200.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 321 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200SVG_321: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/16001200.svg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 322 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200SVG_322: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/16001200.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 323 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200TIFFWCMAC_323: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_without_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 324 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200TIFFWCMAC_324: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/16001200_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 325 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200TIFFWCPC_325: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_without_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 326 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200TIFFWCPC_326: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/16001200_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 327 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200TIFFWLZWPC_327: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_LZW_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 328 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200TIFFWLZWPC_328: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/16001200_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 329 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200TIFFWLZWMAC_329: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_LZW_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 330 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200TIFFWLZWMAC_330: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/16001200_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 331 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200TIFFWZIPPC_331: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_ZIP_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 332 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200TIFFWZIPPC_332: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/16001200_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 333 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200TIFFWZIPMAC_333: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_ZIP_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 334 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200TIFFWZIPMAC_334: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/16001200_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 335 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200TIFFWJPEGMAC_335: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 336 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200TIFFWJPEGMAC_336: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/16001200_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 337 --**--Save the picture in an entity with a File Object with LoadImage(), with image 1600*1200 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImage16001200TIFFWJPEGPC_337: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 338 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image 1600*1200 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200TIFFWJPEGPC_338: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/16001200_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 339 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image test (jpeg)
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageTestjpg_339: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/misc/1.png";
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 340 --**-- Save the picture in an entity with a File Object without LoadImage(), with image test (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageTestjpg_340: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/misc/1.png"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 341 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240SVG_341: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/320240.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
	},

	// 342 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240SVG_342: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/320240.svg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 343 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 16bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240BMP16bits_343: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 344 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 16bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240BMP16bits_344: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_16bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 345 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240BMP24bits_345: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 346 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240BMP24bits_346: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 347 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 32bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240BMP32bits_347: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},


	// 348 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 32bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240BMP32bits_348: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_32bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 349 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits OS/2 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240BMP24bits_OS2_349: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
 	 Y.Assert.areEqual(true,result);
    
		},


	// 350 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits OS/2 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240BMP24bits_OS2_350: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_OS-2_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },  


    // 351 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240GIF_351: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/320240.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
 	 Y.Assert.areEqual(true,result);
    
		},

	// 352 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240GIF_352: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/320240.gif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 353 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240JPEG_353: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/320240.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 354 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240JPEG_354: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/320240.jpg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
     
      },

    // 355 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240JPG2000_355: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/320240.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 356 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240JPG2000_356: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/320240.jpf"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
     
      },


    // 357 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240PNG_357: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/320240.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 358 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240PNG_358: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/320240.png"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 359 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240RAW_359: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/320240.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 360 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240RAW_360: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/320240.raw"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 361 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240TIFWCMAC_361: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 362 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240TIFWCMAC_362: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 363 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240TIFWCPC_363: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 364 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240TIFWCPC_364: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 365 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240TIFLZWPC_365: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 366 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240TIFLZWPC_366: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 367 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240TIFLZWMAC_367: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 368 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240TIFLZWMAC_368: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 369 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240TIFZIPMAC_369: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 370 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240TIFZIPMAC_370: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 371 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240TIFZIPPC_371: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 372 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240TIFZIPPC_372: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },



    // 373 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240TIFJPEGJPEGPC_373: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_JPEG_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 374 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240TIFJPEGPC_374: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 375 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage320240TIFJPEGJPEGMAC_375: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 376 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage320240TIFJPEGMAC_376: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 377 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 16bits 640*480 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480BMP16bits_377: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/640480_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 378 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 16bits 640*480 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480BMP16bits_378: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/640480_16bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 379 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits 640*480 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480BMP24bits_379: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/640480_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 380 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits 640*480 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480BMP24bits_380: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/640480_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 381 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 32bits 640*480 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480BMP32bits_381: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/640480_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},

	// 382 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits OS/2 640*480 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480BMP24bits_382: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/640480_OS-2_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 383 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits OS/2 640*480 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480BMP24bits_OS2_383: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/640480_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
 	 Y.Assert.areEqual(true,result);
    
		},

	// 384 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480GIT_384: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/640480.gif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 385 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480GIT_385: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/640480.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},

  	// 386 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480JPEG_386: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/640480.jpg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 387 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480JPEG_387: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/640480.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},

	// 388 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480JPG2000_388: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/640480.jpf"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 389 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480JPG2000_389: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/640480.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},


	// 390 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480PNG_390: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/640480.png"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 391 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480PNG_391: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/640480.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},


	// 392 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480RAW_392: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/640480.raw"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 393 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480RAW_393: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/640480.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},


	// 394 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480SVG_394: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/640480.svg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 395 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480SVG_395: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/640480.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},


	// 396 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (tif) without Compression, format PC 
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480TIFFWCPC_396: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_without_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 397 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (tif) without Compression, format PC 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480TIFFWCPC_397: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/640480_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},


	// 398 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (tif) without Compression, format MAC 
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480TIFFWCMAC_398: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_without_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 399 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (tif) without Compression, format MAC 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480TIFFWCMAC_399: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/640480_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},


	// 400 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (tif) with LZW Compression, format MAC 
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480TIFFWLZWMAC_400: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_LZW_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 401 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (tif) with LZW Compression, format MAC 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480TIFFWLZWMAC_401: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/640480_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},

	// 402 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (tif) with LZW Compression, format PC 
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480TIFFWLZWPC_402: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_LZW_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 403 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (tif) with LZW Compression, format PC 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480TIFFWLZWPC_403: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/640480_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},


	// 404 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (tif) with ZIP Compression, format PC 
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480TIFFWZIPPC_404: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_ZIP_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 405 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (tif) with ZIP Compression, format PC 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480TIFFWZIPPC_405: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/640480_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},


	// 406 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (tif) with ZIP Compression, format MAC 
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480TIFFWZIPMAC_406: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_ZIP_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 407 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (tif) with ZIP Compression, format MAC 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480TIFFWZIPMAC_407: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/640480_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
     Y.Assert.areEqual(true,result);
    
		},


	// 408 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (tif) with JPEG Compression, format MAC 
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480TIFFWJPEGMAC_408: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 409 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (tif) with JPEG Compression, format MAC 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480TIFFWJPEGMAC_409: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/640480_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 410 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 640*480 (tif) with JPEG Compression, format PC 
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480TIFFWJPEGPC_410: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/640480_JPEG_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

 	// 411 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 640*480 (tif) with JPEG Compression, format PC 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage640480TIFFWJPEGPC_411: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/640480_JPEG_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 412 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 16bits 800*600 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600BMP16bits_412: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/800600_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    		
		},

	// 413 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 16bits 800*600 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600BMP16bits_413: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/800600_16bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 414 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits 800*600 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600BMP24bits_414: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/800600_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 415 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits 800*600 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600BMP24bits_415: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/800600_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 416 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 32bits 800*600 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600BMP32bits_416: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/800600_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    			
		},

	// 417 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 32bits 800*600 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600BMP32bits_417: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/800600_32bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
	Y.Assert.areEqual(true,result);
        
      },


    // 418 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits OS/2 800*600 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage640480BMP24bits_OS2_418: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/800600_OS-2_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 419 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits OS/2 800*600 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600BMP24bits_OS2_419: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/800600_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 420 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600GIT_420: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/800600.gif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
  	Y.Assert.areEqual(true,result);
      
      },


    // 421 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600GIT_421: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/800600.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 422 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600JPG_422: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/800600.jpg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
  	Y.Assert.areEqual(true,result);
      
      },


    // 423 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600JPG_423: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/800600.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 424 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600JPG2000_424: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/800600.jpf"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
  	Y.Assert.areEqual(true,result);
      
      },


    // 425 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600JPG2000_425: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/800600.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 426 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600PNG_426: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/800600.png"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
  	Y.Assert.areEqual(true,result);
      
      },


    // 427 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600PNG_427: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/800600.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 428 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600RAW_428: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/800600.raw"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
  	Y.Assert.areEqual(true,result);
      
      },


    // 429 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600RAW_429: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/800600.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 430 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600SVG_430: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/800600.svg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
  	Y.Assert.areEqual(true,result);
      
      },


    // 431 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600SVG_431: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/800600.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},



	// 432 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600TIFFWCPC_432: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_without_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
  	Y.Assert.areEqual(true,result);
      
      },


    // 433 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600TIFFWCPC_433: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/800600_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 434 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600TIFFWCMAC_434: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_without_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
	Y.Assert.areEqual(true,result);
        
      },


    // 435 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600TIFFWCMAC_435: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/800600_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 436 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600TIFFWLZWMAC_436: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_LZW_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
	Y.Assert.areEqual(true,result);
        
      },


    // 437 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600TIFFWLZWMAC_437: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/800600_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 438 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600TIFFWLZWPC_438: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_LZW_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
 	Y.Assert.areEqual(true,result);
       
      },


    // 439 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600TIFFWLZWPC_439: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/800600_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 440 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600TIFFWZIPPC_440: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_ZIP_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 441 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600TIFFWZIPPC_441: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/800600_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 442 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600TIFFWZIPMAC_442: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_ZIP_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
   	Y.Assert.areEqual(true,result);
     
      },


    // 443 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600TIFFWZIPMAC_443: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/800600_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 444 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600TIFFWJPEGMAC_444: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 445 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600TIFFWJPEGMAC_445: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/800600_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},

	// 446 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 800*600 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage800600TIFFWJPEGPC_446: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/800600_JPEG_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
   	Y.Assert.areEqual(true,result);
     
      },


    // 447 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 800*600 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage800600TIFFWJPEGPC_447: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/800600_JPEG_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    
		},


	// 448 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 16bits 1024*768 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768BMP16bits_448: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1024768_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 449 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 16bits 1024*768 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768BMP16bits_449: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1024768_16bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
 	Y.Assert.areEqual(true,result);
       
      },


    // 450 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits 1024*768 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768BMP24bits_450: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1024768_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    		
		},

	// 451 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits 1024*768 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768BMP24bits_451: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1024768_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
  	Y.Assert.areEqual(true,result);
      
      },


    // 452 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 32bits 1024*768 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768BMP32bits_452: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1024768_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    		
		},

	// 453 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 32bits 1024*768 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768BMP32bits_453: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1024768_32bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
 	Y.Assert.areEqual(true,result);
       
      },


    // 454 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits OS/2 1024*768 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768BMP24bits_OS2_454: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1024768_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 455 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits OS/2 1024*768 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768BMP24bits_OS2_455: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1024768_OS-2_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
   	Y.Assert.areEqual(true,result);
     
      },


    // 456 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768GIF_456: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/1024768.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    		
		},

	// 457 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768GIF_457: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/1024768.gif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 458 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768JPEG_458: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/1024768.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    			
		},

	// 459 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768JPEG_459: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/1024768.jpg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 460 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768JPEG2000_460: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/1024768.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 461 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768JPEG2000_461: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/1024768.jpf"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 462 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768PNG_462: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/1024768.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 463 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768PNG_463: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/1024768.png"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
   	Y.Assert.areEqual(true,result);
     
      },


    // 464 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768RAW_464: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/1024768.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 465 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768RAW_465: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/1024768.raw"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 466 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768SVG_466: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/1024768.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 467 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768SVG_467: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/1024768.svg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 468 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768TIFFWCMAC_468: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1024768_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 469 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768TIFFWCMAC_469: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_without_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 470 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768TIFFWCPC_470: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1024768_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 471 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768TIFFWCPC_471: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_without_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 472 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768TIFFWLZWPC_472: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1024768_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 473 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768TIFFWLZWPC_473: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_LZW_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 474 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768TIFFWLZWMAC_474: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1024768_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 475 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768TIFFWLZWMAC_475: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_LZW_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 476 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768TIFFWZIPMAC_476: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1024768_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 477 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768TIFFWZIPMAC_477: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_ZIP_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 478 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768TIFFWZIPPC_478: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1024768_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 479 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768TIFFWZIPPC_479: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_ZIP_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 480 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768TIFFWJPEGPC_480: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1024768_JPEG_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 481 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768TIFFWJPEGPC_481: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_JPEG_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 482 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1024*768 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1024768TIFFWJPEGMAC_482: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1024768_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 483 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1024*768 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1024768TIFFWJPEGMAC_483: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1024768_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 484 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 16bits 1152*864 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1152864BMP16bits_484: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1152864_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 485 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 16bits 1152*864 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864BMP16bits_485: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1152864_16bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 486 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits 1152*864 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1152864BMP24bits_486: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1152864_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 487 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits 1152*864 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864BMP24bits_487: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1152864_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 488 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 32bits 1152*864 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1152864BMP32bits_488: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1152864_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 489 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 32bits 1152*864 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864BMP32bits_489: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1152864_32bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 490 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits OS/2 1152*864 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1152864BMP24bits_OS2_490: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1152864_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 491 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits OS/2 1152*864 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864BMP24bits_OS2_491: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1152864_OS-2_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 492 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1152*864 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1152864GIF_492: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/1152864.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 493 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864GIF_493: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/1152864.gif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 494 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1152*864 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1152864JPEG_494: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/1152864.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 495 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864JPEG_495: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/1152864.jpg"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 496 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1152*864 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1152864JPEG2000_496: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/1152864.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 497 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864JPEG2000_497: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/1152864.jpf"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 498 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1152*864 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1152864PNG_498: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/1152864.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 499 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864PNG_499: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/1152864.png"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 500 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1152*864 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1152864RAW_500: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/1152864.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 501 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864SVG_501: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/1152864.svg"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
     
      },

    // 502 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864SVG_502: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/1152864.svg"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 503 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWCMAC_503: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_without_MAC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 504 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWCMAC_504: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_without_MAC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 505 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWCPC_505: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_without_PC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 506 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWCPC_506: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_without_PC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 507 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWLZWPC_507: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_LZW_PC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 508 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWLZWPC_508: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_LZW_PC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 509 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWLZWMAC_509: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_LZW_MAC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
     
      },

    // 510 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWLZWMAC_510: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_LZW_MAC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 511 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWZIPMAC_511: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_ZIP_MAC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 512 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWZIPMAC_512: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_ZIP_MAC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 513 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWZIPPC_513: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_ZIP_PC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 514 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWZIPPC_514: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_ZIP_PC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },


    // 515 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWJPEGPC_515: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_JPEG_PC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 516 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWJPEGPC_516: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_JPEG_PC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      }, 


    // 517 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWJPEGMAC_517: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_JPEG_MAC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 518 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1152*864 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1152864TIFFWJPEGMAC_518: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1152864_JPEG_MAC.tif"), 
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      }, 


    // 519 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 16bits 1280*854 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854BMP16bits_519: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1280854_16bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 520 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 16bits 1280*854 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854BMP16bits_520: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1280854_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 521 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits 1280*854 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854BMP24bits_521: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1280854_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 522 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits 1280*854 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854BMP24bits_522: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1280854_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 523 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 32bits 1280*854 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854BMP32bits_523: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1280854_32bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 524 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 32bits 1280*854 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854BMP32bits_524: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1280854_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 525 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits OS/2 1280*854 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854BMP24bits_OS2_525: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1280854_OS-2_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 526 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits OS/2 1280*854 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854BMP24bits_OS2_526: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1280854_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 527 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854GIF_527: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/1280854.gif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 528 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854GIF_528: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/1280854.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 529 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854JPEG_529: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/1280854.jpg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 530 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854JPEG_530: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/1280854.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 531 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854JPEG_531: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/1280854.jpf"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 532 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854JPEG_532: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/1280854.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 533 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854PNG_533: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/1280854.png"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 534 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854PNG_534: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/1280854.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 535 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854RAW_535: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/1280854.raw"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 536 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854RAW_536: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/1280854.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 537 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854SVG_537: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/1280854.svg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 538 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854SVG_538: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/1280854.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 539 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854TIFFWCPC_539: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_without_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 540 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854TIFFWCPC_540: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1280854_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 541 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854TIFFWCMAC_541: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_without_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 542 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854TIFFWCMAC_542: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1280854_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 543 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854TIFFWLZWMAC_543: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_LZW_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 544 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854TIFFWLZWMAC_544: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1280854_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 545 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854TIFFWLZWMAC_545: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_LZW_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 546 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854TIFFWLZWMAC_546: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1280854_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 547 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854TIFFWZIPPC_547: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_ZIP_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 548 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854TIFFWZIPPC_548: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1280854_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 549 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854TIFFWZIPMAC_549: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_ZIP_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 550 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854TIFFWZIPMAC_550: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1280854_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 551 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854TIFFWJPEGPC_551: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_JPEG_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 552 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854TIFFWJPEGPC_552: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1280854_JPEG_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 553 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*854 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1280854TIFFWJPEGMAC_553: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1280854_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 554 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*854 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1280854TIFFWJPEGMAC_554: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1280854_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 555 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 16bits 1280*1024 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024BMP16bits_555: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/12801024_16bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 556 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 16bits 1280*1024 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024BMP16bits_556: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/12801024_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 557 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits 1280*1024 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024BMP24bits_557: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/12801024_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 558 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits 1280*1024 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024BMP24bits_558: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/12801024_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 559 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 32bits 1280*1024 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024BMP32bits_559: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/12801024_32bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 560 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 32bits 1280*1024 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024BMP32bits_560: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/12801024_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 561 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits OS/2 1280*1024 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024BMP24bits_561: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/12801024_OS-2_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 562 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits OS/2 1280*1024 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024BMP24bits_562: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/12801024_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 563 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024GIF_563: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/12801024.gif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 564 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024GIF_564: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/12801024.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 565 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024JPEG_565: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/12801024.jpg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 566 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024JPEG_566: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/12801024.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 567 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024JPG2000_567: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/12801024.jpf"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 568 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024JPG2000_568: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/12801024.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 569 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024PNG_569: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/12801024.png"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
     
      },

    // 570 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024PNG_570: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/12801024.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 571 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024RAW_571: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/12801024.raw"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 572 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024RAW_572: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/12801024.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 573 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024SVG_573: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/12801024.svg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
     
      },

    // 574 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024SVG_574: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/12801024.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 575 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024TIFFWCMAC_575: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_without_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 576 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024TIFFWCMAC_576: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/12801024_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 577 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024TIFFWCPC_577: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_without_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 578 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024TIFFWCPC_578: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/12801024_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	 
		},

	// 579 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024TIFFWLZWPC_579: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_LZW_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 580 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024TIFFWLZWPC_580: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/12801024_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 581 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024TIFFWLZWMAC_581: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_LZW_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 582 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024TIFFWLZWMAC_582: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/12801024_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 583 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024TIFFWZIPPC_583: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_ZIP_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 584 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024TIFFWZIPPC_584: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/12801024_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 585 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024TIFFWZIPMAC_585: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_ZIP_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 586 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024TIFFWZIPMAC_586: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/12801024_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 587 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024TIFFWJPEGMAC_587: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 588 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024TIFFWJPEGMAC_588: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/12801024_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 589 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1280*1024 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage12801024TIFFWJPEGPC_589: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 590 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1280*1024 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage12801024TIFFWJPEGPC_590: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/12801024_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 591 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 16bits 1440*900 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900BMP16bits_591: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1440900_16bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 592 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 16bits 1440*900 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900BMP16bits_592: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1440900_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 593 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits 1440*900 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900BMP24bits_593: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1440900_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 594 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits 1440*900 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900BMP24bits_594: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1440900_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 595 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 32bits 1440*900 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900BMP32bits_595: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1440900_32bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 596 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 32bits 1440*900 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900BMP32bits_596: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1440900_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 597 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits OS/2 1440*900 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900BMP24bits_597: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/1440900_OS-2_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 598 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits OS/2 1440*900 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900BMP24bits_598: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/1440900_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 599 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900GIF_599: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/1440900.gif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 600 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900GIF_600: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/1440900.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	 
		},


	// 601 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900JPEG_601: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/1440900.jpg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 602 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900JPEG_602: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/1440900.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 603 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900JPG2000_603: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/1440900.jpf"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
     
      },

    // 604 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900JPG2000_604: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/1440900.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 605 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900PNG_605: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/1440900.png"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 606 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900PNG_606: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/1440900.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 607 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900RAW_607: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/1440900.raw"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 608 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900RAW_608: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/1440900.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 609 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900SVG_609: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/1440900.svg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 610 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900SVG_610: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/1440900.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 611 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900TIFFWCMAC_611: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_without_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 612 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900TIFFWCMAC_612: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1440900_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 613 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900TIFFWCPC_613: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_without_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 614 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900TIFFWCPC_614: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1440900_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 615 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900TIFFWLZWPC_615: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_LZW_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
     
      },

    // 616 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900TIFFWLZWPC_616: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1440900_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 617 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900TIFFWLZWMAC_617: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_LZW_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 618 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900TIFFWLZWMAC_618: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1440900_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 619 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900TIFFWZIPPC_619: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_ZIP_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 620 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900TIFFWZIPPC_620: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1440900_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 621 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900TIFFWZIPMAC_621: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/1440900_ZIP_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 622 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900TIFFWZIPMAC_622: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1440900_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 623 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900TIFFWJPEGMAC_623: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 624 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900TIFFWJPEGMAC_624: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/12801024_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 625 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1440*900 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage1440900TIFFWJPEGPC_625: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/12801024_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 626 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1440*900 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage1440900TIFFWJPEGPC_626: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/1440900_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 627 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 16bits 1600*1200 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200BMP16bits_627: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/16001200_16bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 628 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 16bits 1600*1200 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200BMP16bits_628: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/16001200_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 629 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits 1600*1200 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200BMP24bits_629: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/16001200_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 630 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits 1600*1200 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200BMP24bits_630: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/16001200_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 631 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 32bits 1600*1200 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200BMP32bits_631: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/16001200_32bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 632 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 32bits 1600*1200 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200BMP32bits_632: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/16001200_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 633 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 24bits OS/2 1600*1200 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200BMP24bits_633: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/16001200_OS-2_24bit.bmp"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 634 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 24bits OS/2 1600*1200 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200BMP24bits_634: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/16001200_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 635 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200GIF_635: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/16001200.gif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
     
      },

    // 636 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200GIF_636: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/16001200.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},


	// 637 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200JPEG_637: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/16001200.jpg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 638 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200JPEG_638: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/16001200.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 639 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200JPG2000_639: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/16001200.jpf"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 640 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200JPG2000_640: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/16001200.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 641 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200PNG_641: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/16001200.png"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 642 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200PNG_642: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/16001200.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 643 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200RAW_643: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/16001200.raw"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 644 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200RAW_644: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/16001200.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 645 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200SVG_645: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/16001200.svg"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 646 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200SVG_646: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/16001200.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 647 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200TIFFWCMAC_647: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_without_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 648 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (tiff) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200TIFFWCMAC_648: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/16001200_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 649 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200TIFFWCPC_649: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_without_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 650 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (tiff) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200TIFFWCPC_650: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/16001200_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 651 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200TIFFWLZWPC_651: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_LZW_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 652 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (tiff) with LZW Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200TIFFWLZWPC_652: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/16001200_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	 
		},

	// 653 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200TIFFWLZWMAC_653: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_LZW_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 654 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (tiff) with LZW Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200TIFFWLZWMAC_654: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/16001200_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 655 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200TIFFWZIPPC_655: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_ZIP_PC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 656 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (tiff) with ZIP Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200TIFFWZIPPC_656: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/16001200_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 657 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200TIFFWZIPMAC_657: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_ZIP_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 658 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (tiff) with ZIP Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200TIFFWZIPMAC_658: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/16001200_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 659 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200TIFFWJPEGMAC_659: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);
    
      },

    // 660 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (tiff) with JPEG Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200TIFFWJPEGMAC_660: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/16001200_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
    	
		},

	// 661 --**-- Save the picture in an entity with a File Object without LoadImage(), with image 1600*1200 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImage16001200TIFFWJPEGPC_661: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/16001200_JPEG_MAC.tif"), 	
				 img = pictFile
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areSame(0,exceptions);
 	Y.Assert.isNotNull(MyImage.pics);
    Y.Assert.areEqual(true,result);

      },

    // 662 --**-- Save the picture in an entity with an abolute Path without LoadImage(), with image 1600*1200 (tiff) with JPEG Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImage16001200TIFFWJPEGPC_662: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/16001200_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(0,exceptions);
	 Y.Assert.isNotNull(MyImage.pics);
	 Y.Assert.areEqual(true,result);
		
		},

	// 663 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240SVG_663: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/320240.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
	 Y.Assert.areEqual(MyImage.pics.height,240);

	},

	// 664 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240SVG_664: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/320240.svg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 665 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 16bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240BMP16bits_665: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
		
		},

	// 666 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 16bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240BMP16bits_666: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_16bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areEqual(MyImage.pics.width,320);
 	Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 667 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 24bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240BMP24bits_667: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
		
		},

	// 668 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 24bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240BMP24bits_668: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 669 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 32bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240BMP32bits_669: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 670 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 32bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240BMP32bits_670: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_32bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 671 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 24bits OS/2 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240BMP24bits_OS2_671: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 672 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 24bits OS/2 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240BMP24bits_OS2_672: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_OS-2_24bit.bmp"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },  


    // 673 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240GIF_673: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/320240.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},

	// 674 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240GIF_674: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/320240.gif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 675 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240JPEG_675: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},

	// 676 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240JPEG_676: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/320240.jpg"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 677 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240JPG2000_677: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/320240.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 678 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240JPG2000_678: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/320240.jpf"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 679 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240PNG_679: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/320240.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},

	// 680 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240PNG_680: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/320240.png"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 681 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240RAW_681: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/320240.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 682 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240RAW_682: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/320240.raw"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 683 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFWCMAC_683: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 684 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFWCMAC_684: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 685 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFWCPC_685: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 686 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFWCPC_686: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 687 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFLZWPC_687: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 688 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFLZWPC_688: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 689 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFLZWMAC_689: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 690 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFLZWMAC_690: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 691 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFZIPMAC_691: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 692 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFZIPMAC_692: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 693 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFZIPPC_693: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 694 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFZIPPC_694: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },



    // 695 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFJPEGJPEGPC_695: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_JPEG_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 696 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFJPEGPC_696: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_PC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 697 --**-- Check width & height of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFJPEGJPEGMAC_697: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 698 --**-- Check width & height of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFJPEGMAC_698: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_MAC.tif"), 	
				 img = loadImage (pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 699 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240SVG_699: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/320240.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
	 Y.Assert.areEqual(MyImage.pics.height,240);

	},

	// 700 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240SVG_700: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/320240.svg"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 701 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 16bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240BMP16bits_701: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
		
		},

	// 702 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 16bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240BMP16bits_702: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_16bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.areEqual(MyImage.pics.width,320);
 	Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 703 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 24bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240BMP24bits_703: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
		
		},

	// 704 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 24bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240BMP24bits_704: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_24bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 705 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 32bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240BMP32bits_705: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 706 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 32bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240BMP32bits_706: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_32bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 707 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 24bits OS/2 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240BMP24bits_OS2_707: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 708 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 24bits OS/2 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240BMP24bits_OS2_708: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_OS-2_24bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },  


    // 709 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240GIF_709: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/320240.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},

	// 710 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240GIF_710: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/320240.gif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 711 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240JPEG_711: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/320240.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},

	// 712 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240JPEG_712: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/320240.jpg"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 713 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240JPG2000_713: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/320240.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 714 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240JPG2000_714: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/320240.jpf"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 715 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240PNG_715: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/320240.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},

	// 716 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240PNG_716: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/320240.png"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },

    // 717 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240RAW_717: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/320240.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 718 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240RAW_718: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/320240.raw"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 719 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFWCMAC_719: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 720 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFWCMAC_720: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 721 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFWCPC_721: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 722 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFWCPC_722: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 723 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFLZWPC_723: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 724 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFLZWPC_724: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 725 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFLZWMAC_725: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 726 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFLZWMAC_726: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 727 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFZIPMAC_727: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 728 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFZIPMAC_728: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 729 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFZIPPC_729: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 730 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFZIPPC_730: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },



    // 731 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFJPEGJPEGPC_731: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_JPEG_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 732 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFJPEGPC_732: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      },


    // 733 --**-- Check width & height of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFJPEGJPEGMAC_733: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},


	// 734 --**-- Check width & height of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFJPEGMAC_734: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);
    
      }, 

    // 735 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240SVG_735: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/320240.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };


	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

	},

	// 736 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240SVG_736: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/320240.svg"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
 	 Y.Assert.isNotUndefined(MyImage.pics.size);
     Y.Assert.isTrue(MyImage.pics.size !== 0);

    },

    // 737 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 16bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240BMP16bits_737: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
		
		},

	// 738 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 16bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240BMP16bits_738: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_16bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.isNotNull(MyImage.pics.size);
	Y.Assert.isNotUndefined(MyImage.pics.size);
	Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 739 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 24bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240BMP24bits_739: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
		
		},

	// 740 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 24bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240BMP24bits_740: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_24bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 741 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 32bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240BMP32bits_741: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 742 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 32bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240BMP32bits_742: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_32bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 743 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 24bits OS/2 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240BMP24bits_OS2_743: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 744 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 24bits OS/2 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240BMP24bits_OS2_744: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_OS-2_24bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },  


    // 745 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240GIF_745: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/320240.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},

	// 746 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240GIF_746: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/320240.gif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 747 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240JPEG_747: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/320240.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},

	// 748 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240JPEG_748: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/320240.jpg"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 749 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240JPG2000_749: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/320240.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
		},


	// 750 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240JPG2000_750: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/320240.jpf"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 751 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240PNG_751: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/320240.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},

	// 752 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240PNG_752: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/320240.png"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 753 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240RAW_753: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/320240.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 754 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240RAW_754: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/320240.raw"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 755 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240TIFWCMAC_755: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 756 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240TIFWCMAC_756: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 757 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240TIFWCPC_757: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 758 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240TIFWCPC_758: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 759 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240TIFLZWPC_759: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 760 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240TIFLZWPC_760: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 761 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240TIFLZWMAC_761: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 762 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240TIFLZWMAC_762: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 763 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240TIFZIPMAC_763: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 764 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240TIFZIPMAC_764: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 765 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240TIFZIPPC_765: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 766 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240TIFZIPPC_766: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },



    // 767 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240TIFJPEGJPEGPC_767: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_JPEG_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 768 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240TIFJPEGPC_768: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 769 --**-- Check size of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240TIFJPEGJPEGMAC_769: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 770 --**-- Check size of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckSize320240TIFJPEGMAC_770: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      }, 

    // 771 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240SVG_771: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/320240.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };


	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

	},

	// 772 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240SVG_772: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/320240.svg"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
 	 Y.Assert.isNotUndefined(MyImage.pics.size);
     Y.Assert.isTrue(MyImage.pics.size !== 0);

    },

    // 773 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 16bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240BMP16bits_773: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
		
		},

	// 774 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 16bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240BMP16bits_774: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_16bit.bmp"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.isNotNull(MyImage.pics.size);
	Y.Assert.isNotUndefined(MyImage.pics.size);
	Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 775 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 24bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240BMP24bits_775: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
		
		},

	// 776 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 24bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240BMP24bits_776: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_24bit.bmp"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 777 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 32bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240BMP32bits_777: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 778 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 32bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240BMP32bits_778: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_32bit.bmp"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 779 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 24bits OS/2 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240BMP24bits_OS2_779: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 780 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 24bits OS/2 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240BMP24bits_OS2_780: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_OS-2_24bit.bmp"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },  


    // 781 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240GIF_781: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/320240.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},

	// 782 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240GIF_782: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/320240.gif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 783 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240JPEG_783: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},

	// 784 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240JPEG_784: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/320240.jpg"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 785 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240JPG2000_785: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/320240.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
		},


	// 786 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240JPG2000_786: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/320240.jpf"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 787 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240PNG_787: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/320240.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},

	// 788 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240PNG_788: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/320240.png"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 789 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240RAW_789: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/320240.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 790 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240RAW_790: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/320240.raw"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 791 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240TIFWCMAC_791: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 792 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240TIFWCMAC_792: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_MAC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 793 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240TIFWCPC_793: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 794 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240TIFWCPC_794: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_PC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 795 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240TIFLZWPC_795: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 796 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240TIFLZWPC_796: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_PC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 797 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240TIFLZWMAC_797: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 798 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240TIFLZWMAC_798: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_MAC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 799 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240TIFZIPMAC_799: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 800 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240TIFZIPMAC_800: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_MAC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 801 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240TIFZIPPC_801: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 802 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240TIFZIPPC_802: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_PC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },



    // 803 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240TIFJPEGJPEGPC_803: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_JPEG_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 804 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240TIFJPEGPC_804: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_PC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },


    // 805 --**-- Check size of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240TIFJPEGJPEGMAC_805: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);

		},


	// 806 --**-- Check size of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240TIFJPEGMAC_806: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_MAC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.size);
	 Y.Assert.isNotUndefined(MyImage.pics.size);
	 Y.Assert.isTrue(MyImage.pics.size !== 0);
    
      },

    // 807 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240SVG_807: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/svg/320240.svg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };


	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

	},

	// 808 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (svg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240SVG_808: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/320240.svg"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
 	 Y.Assert.isNotUndefined(MyImage.pics.length);
     Y.Assert.isTrue(MyImage.pics.length !== 0);

    },

    // 809 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 16bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240BMP16bits_809: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_16bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
		
		},

	// 810 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 16bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240BMP16bits_810: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_16bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.isNotNull(MyImage.pics.length);
	Y.Assert.isNotUndefined(MyImage.pics.length);
	Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    // 811 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 24bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240BMP24bits_811: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
		
		},

	// 812 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 24bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240BMP24bits_812: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_24bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    // 813 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 32bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240BMP32bits_813: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_32bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 814 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 32bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240BMP32bits_814: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_32bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 815 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 24bits OS/2 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240BMP24bits_OS2_815: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/bmp/320240_OS-2_24bit.bmp";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 816 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 24bits OS/2 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240BMP24bits_OS2_816: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_OS-2_24bit.bmp"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },  


    // 817 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240GIF_817: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/gif/320240.gif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},

	// 818 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (gif)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240GIF_818: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/320240.gif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    // 819 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240JPEG_819: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpeg/320240.jpg";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},

	// 820 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240JPEG_820: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/320240.jpg"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    // 821 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240JPG2000_821: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/jpg2000/320240.jpf";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
		},


	// 822 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240JPG2000_822: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/320240.jpf"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 823 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240PNG_823: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/png/320240.png";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},

	// 824 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (png)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240PNG_824: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/320240.png"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    // 825 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240RAW_825: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/raw/320240.raw";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 826 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (raw)
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240RAW_826: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/320240.raw"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 827 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240TIFWCMAC_827: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_without_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 828 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240TIFWCMAC_828: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 829 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240TIFWCPC_829: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_without_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 830 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240TIFWCPC_830: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 831 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240TIFLZWPC_831: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_LZW_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 832 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240TIFLZWPC_832: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 833 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240TIFLZWMAC_833: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_LZW_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 834 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240TIFLZWMAC_834: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 835 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240TIFZIPMAC_835: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_ZIP_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 836 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240TIFZIPMAC_836: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 837 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240TIFZIPPC_837: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_ZIP_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 838 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240TIFZIPPC_838: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },



    // 839 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240TIFJPEGJPEGPC_839: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_JPEG_PC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 840 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240TIFJPEGPC_840: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_PC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 841 --**-- Check length of the picture saved in a File on disk without LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240TIFJPEGJPEGMAC_841: function() { 
	
	var MyImage = new ds.ImageWithoutLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = thepath + "images/tiff/320240_JPEG_MAC.tif";
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 842 --**-- Check length of the picture saved in a File Object without LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckLength320240TIFJPEGMAC_842: function() { 
	
 	var MyImage = new ds.ImageWithoutLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_MAC.tif"), 	
				 img = pictFile;
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      }, 

    // 843 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (svg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240SVG_843: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/svg/320240.svg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };


	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

	},

	// 844 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (svg)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240SVG_844: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/svg/320240.svg"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
 	 Y.Assert.isNotUndefined(MyImage.pics.length);
     Y.Assert.isTrue(MyImage.pics.length !== 0);

    },

    // 845 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 16bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240BMP16bits_845: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_16bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
		
		},

	// 846 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 16bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240BMP16bits_846: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_16bit.bmp"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	Y.Assert.isNotNull(MyImage.pics.length);
	Y.Assert.isNotUndefined(MyImage.pics.length);
	Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    // 847 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 24bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240BMP24bits_847: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
		
		},

	// 848 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 24bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240BMP24bits_848: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_24bit.bmp"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    // 849 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 32bits 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240BMP32bits_849: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_32bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 850 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 32bits 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240BMP32bits_850: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_32bit.bmp"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 851 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 24bits OS/2 320*240 (bmp) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240BMP24bits_OS2_851: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/bmp/320240_OS-2_24bit.bmp");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 852 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 24bits OS/2 320*240 (bmp)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240BMP24bits_OS2_852: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/bmp/320240_OS-2_24bit.bmp"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },  


    // 853 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (gif) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240GIF_853: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/gif/320240.gif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.areEqual(MyImage.pics.width,320);
 	 Y.Assert.areEqual(MyImage.pics.height,240);

		},

	// 854 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (gif)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240GIF_854: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/gif/320240.gif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    // 855 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (jpeg) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240JPEG_855: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},

	// 856 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240JPEG_856: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpeg/320240.jpg"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    // 857 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (jpg2000) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240JPG2000_857: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpg2000/320240.jpf");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
		},


	// 858 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (jpg2000)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240JPG2000_858: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/jpg2000/320240.jpf"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 859 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (png) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240PNG_859: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/png/320240.png");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},

	// 860 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (png)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240PNG_860: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/png/320240.png"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    // 861 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (raw) 
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240RAW_861: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/raw/320240.raw");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 862 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (raw)
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240RAW_862: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/raw/320240.raw"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 863 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240TIFWCMAC_863: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_without_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 864 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) without Compression, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240TIFWCMAC_864: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_MAC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 865 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240TIFWCPC_865: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_without_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 866 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) without Compression, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240TIFWCPC_866: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_without_PC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 867 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240TIFLZWPC_867: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_LZW_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 868 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression LZW, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240TIFLZWPC_868: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_PC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 869 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240TIFLZWMAC_869: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_LZW_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 870 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression LZW, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240TIFLZWMAC_870: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_LZW_MAC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 871 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240TIFZIPMAC_871: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_ZIP_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 872 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression ZIP, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240TIFZIPMAC_872: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_MAC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 873 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240TIFZIPPC_873: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_ZIP_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 874 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression ZIP, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240TIFZIPPC_874: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_ZIP_PC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },



    // 875 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240TIFJPEGJPEGPC_875: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_JPEG_PC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 876 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression JPEG, format PC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240TIFJPEGPC_876: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_PC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },


    // 877 --**-- Check length of the picture saved in a File on disk with LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240TIFJPEGJPEGMAC_877: function() { 
	
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/tiff/320240_JPEG_MAC.tif");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);

		},


	// 878 --**-- Check length of the picture saved in a File Object with LoadImage(), with image 320*240 (tif) with Compression JPEG, format MAC
	testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240TIFJPEGMAC_878: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
					thepath = getFolder("path"),
					exceptions = 0,
					e;
	 	try {

			var	 pictFile = File (thepath + "images/tiff/320240_JPEG_MAC.tif"), 	
				 img = loadImage(pictFile);
				 MyImage.pics = img;
				 MyImage.info = i;
	 			 result = MyImage.save();

	 	} catch (e) {

	 		exceptions++;
	 		console.log("we caught : " + e);

	 	}
 		
 	 Y.Assert.isNotNull(MyImage.pics.length);
	 Y.Assert.isNotUndefined(MyImage.pics.length);
	 Y.Assert.isTrue(MyImage.pics.length !== 0);
    
      },

    /*
     *
		Property for Meta Format missing in EXIF :
			- Flash/Fired
			- Flash/functionPresent 
			- Flash/Mode
			- Flash/RedEyeReduction
			- Flash/ReturnLight
			- Gamma
     *
     */

    // 879 --**-- Check meta (Format EXIF), property ApertureValue of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFApertureValue320240JPEG_879: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(6.65625,MyImage.pics.meta.EXIF.ApertureValue);

		},


	// 880 --**-- Check meta (Format EXIF), property BrightnessValue of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFBrightnessValue320240JPEG_880: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.BrightnessValue);

		},


	// 881 --**-- Check meta (Format EXIF), property ColorSpace of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFColorSpace320240JPEG_881: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(1,MyImage.pics.meta.EXIF.ColorSpace);

		},

	// 882 --**-- Check meta (Format EXIF), property ComponentsConfiguration of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFComponentsConfiguration320240JPEG_882: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("1;2;3;0",MyImage.pics.meta.EXIF.ComponentsConfiguration);

		},

	// 883 --**-- Check meta (Format EXIF), property Contrast of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFContrast320240JPEG_883: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.Contrast);

		},

	// 884 --**-- Check meta (Format EXIF), property CustomRendered of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFCustomRendered320240JPEG_884: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.CustomRendered);

		},

	// 885 --**-- Check meta (Format EXIF), property DateTimeDigitized of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFDateTimeDigitized320240JPEG_885: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("2004-09-11T12:38:06Z",MyImage.pics.meta.EXIF.DateTimeDigitized);

		},

	// 886 --**-- Check meta (Format EXIF), property DateTimeOriginal of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFDateTimeOriginal320240JPEG_886: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("2004-09-11T12:38:06Z",MyImage.pics.meta.EXIF.DateTimeOriginal);

		},

	// 887 --**-- Check meta (Format EXIF), property DigitalZoomRatio of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFDigitalZoomRatio320240JPEG_887: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.DigitalZoomRatio);

		},

	// 888 --**-- Check meta (Format EXIF), property ExifVersion of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExifVersion320240JPEG_888: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("0210",MyImage.pics.meta.EXIF.ExifVersion);

		},

	// 889 --**-- Check meta (Format EXIF), property ExposureBiasValue of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureBiasValue320240JPEG_889: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.ExposureBiasValue);

		},

	// 890 --**-- Check meta (Format EXIF), property ExposureIndex of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureIndex320240JPEG_890: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.ExposureIndex);

		},

	// 891 --**-- Check meta (Format EXIF), property ExposureMode of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureMode320240JPEG_891: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.ExposureMode);

		},

	// 892 --**-- Check meta (Format EXIF), property ExposureTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureTime320240JPEG_892: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0.00625,MyImage.pics.meta.EXIF.ExposureTime);

		},

	// 893 --**-- Check meta (Format EXIF), property FileSource of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFileSource320240JPEG_893: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("3",MyImage.pics.meta.EXIF.FileSource);

		},

	// 894 --**-- Check meta (Format EXIF), property Flash of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFlash320240JPEG_894: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.Flash);

		},

	// 895 --**-- Check meta (Format EXIF), property FlashEnergy of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFlashEnergy320240JPEG_895: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.Flash);

		},

	// 896 --**-- Check meta (Format EXIF), property FlashPixVersion of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFlashPixVersion320240JPEG_896: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("0100",MyImage.pics.meta.EXIF.FlashPixVersion);

		},

	// 897 --**-- Check meta (Format EXIF), property FNumber of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFNumber320240JPEG_897: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(10,MyImage.pics.meta.EXIF.FNumber);

		},

	// 898 --**-- Check meta (Format EXIF), property FocalLength of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalLength320240JPEG_898: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(10.8125,MyImage.pics.meta.EXIF.FocalLength);

		},

	// 899 --**-- Check meta (Format EXIF), property FocalLenIn35mmFilm of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalLenIn35mmFilm320240JPEG_899: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.FocalLenIn35mmFilm);

		},

	// 900 --**-- Check meta (Format EXIF), property FocalPlaneResolutionUnit of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalPlaneResolutionUnit320240JPEG_900: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(2,MyImage.pics.meta.EXIF.FocalPlaneResolutionUnit);

		},

	// 901 --**-- Check meta (Format EXIF), property FocalPlaneXResolution of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalPlaneXResolution320240JPEG_901: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(7766.9902912621,MyImage.pics.meta.EXIF.FocalPlaneXResolution);

		},

	// 902 --**-- Check meta (Format EXIF), property FocalPlaneYResolution of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalPlaneYResolution320240JPEG_902: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(7741.935483871,MyImage.pics.meta.EXIF.FocalPlaneYResolution);

		},

	// 903 --**-- Check meta (Format EXIF), property GainControl of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFGainControl320240JPEG_903: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.GainControl);

		},

	// 904 --**-- Check meta (Format EXIF), property ImageUniqueID of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFImageUniqueID320240JPEG_904: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("0",MyImage.pics.meta.EXIF.ImageUniqueID);

		},

	// 905 --**-- Check meta (Format EXIF), property ISOSpeedRatings of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFISOSpeedRatings320240JPEG_905: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(69,MyImage.pics.meta.EXIF.ISOSpeedRatings);

		},

	// 906 --**-- Check meta (Format EXIF), property LightSource of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFLightSource320240JPEG_906: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.LightSource);

		},

	// 907 --**-- Check meta (Format EXIF), property MakerNote of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFMakerNote320240JPEG_907: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.EXIF.MakerNote);

		},

	// 908 --**-- Check meta (Format EXIF), property MaxApertureValue of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFMaxApertureValue320240JPEG_908: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(2.9708557128906,MyImage.pics.meta.EXIF.MaxApertureValue);

		},

	// 909 --**-- Check meta (Format EXIF), property MeteringMode of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFMeteringMode320240JPEG_909: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(5,MyImage.pics.meta.EXIF.MeteringMode);

		},

	// 910 --**-- Check meta (Format EXIF), property PixelXDimension of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFPixelXDimension320240JPEG_910: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(320,MyImage.pics.meta.EXIF.PixelXDimension);

		},

	// 911 --**-- Check meta (Format EXIF), property PixelYDimension of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFPixelYDimension320240JPEG_911: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(240,MyImage.pics.meta.EXIF.PixelYDimension);

		},

	// 912 --**-- Check meta (Format EXIF), property RelatedSoundFile of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFRelatedSoundFile320240JPEG_912: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("0",MyImage.pics.meta.EXIF.RelatedSoundFile);

		},

	// 913 --**-- Check meta (Format EXIF), property Saturation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSaturation320240JPEG_913: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.Saturation);

		},

	// 914 --**-- Check meta (Format EXIF), property SceneCaptureType of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSceneCaptureType320240JPEG_914: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.SceneCaptureType);

		},

	// 915 --**-- Check meta (Format EXIF), property SceneType of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSceneType320240JPEG_915: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.SceneType);

		},

	// 916 --**-- Check meta (Format EXIF), property SensingMethod of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSensingMethod320240JPEG_916: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(2,MyImage.pics.meta.EXIF.SensingMethod);

		},

	// 917 --**-- Check meta (Format EXIF), property Sharpness of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSharpness320240JPEG_917: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.Sharpness);

		},

	// 918 --**-- Check meta (Format EXIF), property ShutterSpeedValue of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFShutterSpeedValue320240JPEG_918: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(7.3125,MyImage.pics.meta.EXIF.ShutterSpeedValue);

		},

	// 919 --**-- Check meta (Format EXIF), property SpectralSensitivity of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSpectralSensitivity320240JPEG_919: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("0",MyImage.pics.meta.EXIF.SpectralSensitivity);

		},

	// 920 --**-- Check meta (Format EXIF), property SubjectArea of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectArea320240JPEG_920: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("0;0",MyImage.pics.meta.EXIF.SubjectArea);

		},

	// 921 --**-- Check meta (Format EXIF), property SubjectDistance of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectDistance320240JPEG_921: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(65.535,MyImage.pics.meta.EXIF.SubjectDistance);

		},

	// 922 --**-- Check meta (Format EXIF), property SubjectDistRange of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectDistRange320240JPEG_922: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.SubjectDistRange);

		},

	// 923 --**-- Check meta (Format EXIF), property SubjectLocation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectLocation320240JPEG_923: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.SubjectLocation);

		},

	// 924 --**-- Check meta (Format EXIF), property UserComment of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFUserComment320240JPEG_924: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.EXIF.UserComment);

		},

	// 925 --**-- Check meta (Format EXIF), property WhiteBalance of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFWhiteBalance320240JPEG_925: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.EXIF.WhiteBalance);

		},

    /*
     *
		Property for Meta Format missing in IPTC :
			- Edit Status
			- ImageOrientation
			- ImageType
			- ObjectCycle
	
     *
     */

    // 926 --**-- Check meta (Format IPTC), property Byline of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCByline320240JPEG_926: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.Byline);

		},

	// 927 --**-- Check meta (Format IPTC), property BylineTitle of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCBylineTitle320240JPEG_927: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.BylineTitle);

		},

	// 928 --**-- Check meta (Format IPTC), property CaptionAbstract of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCaptionAbstract320240JPEG_928: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.CaptionAbstract);

		},

	// 929 --**-- Check meta (Format IPTC), property Category of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCategory320240JPEG_929: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.Category);

		},

	// 930 --**-- Check meta (Format IPTC), property City of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCity320240JPEG_930: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.City);

		},

	// 931 --**-- Check meta (Format IPTC), property Contact of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCContact320240JPEG_931: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.Contact);

		},

	// 932 --**-- Check meta (Format IPTC), property ContentLocationCode of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCContentLocationCode320240JPEG_932: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.ContentLocationCode);

		},

	// 933 --**-- Check meta (Format IPTC), property ContentLocationName of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCContentLocationName320240JPEG_933: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.ContentLocationName);

		},

	// 934 --**-- Check meta (Format IPTC), property Credit of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCredit320240JPEG_934: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.Credit);

		},

	// 935 --**-- Check meta (Format IPTC), property DateTimeCreated of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCDateTimeCreated320240JPEG_935: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("2004-09-11T12:38:06Z",MyImage.pics.meta.IPTC.DateTimeCreated);

		},

	// 936 --**-- Check meta (Format IPTC), property DigitalCreationDateTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCDigitalCreationDateTime320240JPEG_936: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("2004-09-11T12:38:06Z",MyImage.pics.meta.IPTC.DigitalCreationDateTime);

		},

	// 937 --**-- Check meta (Format IPTC), property ExpirationDateTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCExpirationDateTime320240JPEG_937: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("0000-00-00T00:00:00Z",MyImage.pics.meta.IPTC.ExpirationDateTime);

		},

	// 938 --**-- Check meta (Format IPTC), property FixtureIdentifier of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCFixtureIdentifier320240JPEG_938: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.FixtureIdentifier);

		},

	// 939 --**-- Check meta (Format IPTC), property Headline of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCHeadline320240JPEG_939: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.Headline);

		},

	// 940 --**-- Check meta (Format IPTC), property Keywords of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCKeywords320240JPEG_940: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.Keywords);

		},

	// 941 --**-- Check meta (Format IPTC), property LanguageIdentifier of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCLanguageIdentifier320240JPEG_941: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.LanguageIdentifier);

		},

	// 942 --**-- Check meta (Format IPTC), property ObjectAttributeReference of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCObjectAttributeReference320240JPEG_942: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.ObjectAttributeReference);

		},

	// 943 --**-- Check meta (Format IPTC), property ObjectName of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCObjectName320240JPEG_943: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.ObjectName);

		},

	// 944 --**-- Check meta (Format IPTC), property OriginalTransmissionReference of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCOriginalTransmissionReference320240JPEG_944: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.OriginalTransmissionReference);

		},

	// 945 --**-- Check meta (Format IPTC), property OriginatingProgram of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCOriginatingProgram320240JPEG_945: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.OriginatingProgram);

		},

	// 946 --**-- Check meta (Format IPTC), property ProgramVersion of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCProgramVersion320240JPEG_946: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.ProgramVersion);

		},

	// 947 --**-- Check meta (Format IPTC), property ProvinceState of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCProvinceState320240JPEG_947: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.ProvinceState);

		},

	// 948 --**-- Check meta (Format IPTC), property ReleaseDateTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCReleaseDateTime320240JPEG_948: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("0000-00-00T00:00:00Z",MyImage.pics.meta.IPTC.ReleaseDateTime);

		},

	// 949 --**-- Check meta (Format IPTC), property Scene of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCScene320240JPEG_949: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("011000",MyImage.pics.meta.IPTC.Scene);

		},

	// 950 --**-- Check meta (Format IPTC), property Source of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSource320240JPEG_950: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.Source);

		},

	// 951 --**-- Check meta (Format IPTC), property Source of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSource320240JPEG_951: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.Source);

		},

	// 952 --**-- Check meta (Format IPTC), property SpecialInstructions of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSpecialInstructions320240JPEG_952: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.SpecialInstructions);

		},

	// 953 --**-- Check meta (Format IPTC), property StarRating of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCStarRating320240JPEG_953: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("0",MyImage.pics.meta.IPTC.StarRating);

		},

	// 954 --**-- Check meta (Format IPTC), property SubjectReference of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSubjectReference320240JPEG_954: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("00000000",MyImage.pics.meta.IPTC.SubjectReference);

		},

	// 955 --**-- Check meta (Format IPTC), property SubLocation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSubLocation320240JPEG_955: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.SubLocation);

		},

	// 956 --**-- Check meta (Format IPTC), property SupplementalCategory of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSupplementalCategory320240JPEG_956: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.SupplementalCategory);

		},

	// 957 --**-- Check meta (Format IPTC), property Urgency of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCUrgency320240JPEG_957: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("0",MyImage.pics.meta.IPTC.Urgency);

		},

	// 958 --**-- Check meta (Format IPTC), property WriterEditor of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCWriterEditor320240JPEG_958: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.IPTC.WriterEditor);

		},

	/*
     *
		Property for Meta Format missing in TIFF :
			- Compression 
			
     *
     */

    // 959 --**-- Check meta (Format TIFF), property Artist of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFArtist320240JPEG_959: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.TIFF.Artist);

		},

	// 960 --**-- Check meta (Format TIFF), property Copyright of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFCopyright320240JPEG_960: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.TIFF.Copyright);

		},

	// 961 --**-- Check meta (Format TIFF), property DateTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFDateTime320240JPEG_961: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("2013-03-29T17:05:42Z",MyImage.pics.meta.TIFF.DateTime);

		},

	// 962 --**-- Check meta (Format TIFF), property DocumentName of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFDocumentName320240JPEG_962: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.TIFF.DocumentName);

		},

	// 963 --**-- Check meta (Format TIFF), property HostComputer of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFHostComputer320240JPEG_963: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.TIFF.HostComputer);

		},

	// 964 --**-- Check meta (Format TIFF), property ImageDescription of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFImageDescription320240JPEG_964: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.TIFF.ImageDescription);

		},

	// 965 --**-- Check meta (Format TIFF), property Make of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFMake320240JPEG_965: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("Canon",MyImage.pics.meta.TIFF.Make);

		},

	// 966 --**-- Check meta (Format TIFF), property Model of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFModel320240JPEG_966: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("Canon PowerShot S110",MyImage.pics.meta.TIFF.Model);

		},

	// 967 --**-- Check meta (Format TIFF), property Orientation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFOrientation320240JPEG_967: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(1,MyImage.pics.meta.TIFF.Orientation);

		},

	// 968 --**-- Check meta (Format TIFF), property PhotometricInterpretation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFPhotometricInterpretation320240JPEG_968: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(2,MyImage.pics.meta.TIFF.PhotometricInterpretation);

		},

	// 969 --**-- Check meta (Format TIFF), property ResolutionUnit of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFResolutionUnit320240JPEG_969: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(2,MyImage.pics.meta.TIFF.ResolutionUnit);

		},

	// 970 --**-- Check meta (Format TIFF), property Software of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFSoftware320240JPEG_970: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("Adobe Photoshop CS6 (Windows)",MyImage.pics.meta.TIFF.Software);

		},

	// 971 --**-- Check meta (Format TIFF), property XResolution of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFXResolution320240JPEG_971: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(72,MyImage.pics.meta.TIFF.XResolution);

		},

	// 972 --**-- Check meta (Format TIFF), property YResolution of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFYResolution320240JPEG_972: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(72,MyImage.pics.meta.TIFF.YResolution);

		},

	/*
     *
		Property for Meta Format missing in GPS :
			- DestBearingRef
			- DestDistanceRef
			- DestLatitude/Deg
			- DestLatitude/Dir
			- DestLatitude/Min
			- DestLatitude/Sec
			- DestLongitude/Deg
			- DestLongitude/Dir
			- DestLongitude/Min 
			- DestLongitude/Sec
			- VersionID

     *
     */


    // 973 --**-- Check meta (Format GPS), property Altitude of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSAltitude320240JPEG_973: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.GPS.Altitude);

		},

	// 974 --**-- Check meta (Format GPS), property AltitudeRef of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSAltitudeRef320240JPEG_974: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.GPS.AltitudeRef);

		},

	// 975 --**-- Check meta (Format GPS), property AreaInformation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSAreaInformation320240JPEG_975: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.GPS.AreaInformation);

		},

	// 976 --**-- Check meta (Format GPS), property DateTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDateTime320240JPEG_976: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("2013-03-29T17:05:42Z",MyImage.pics.meta.GPS.DateTime);

		},

	// 977 --**-- Check meta (Format GPS), property DestBearing of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestBearing320240JPEG_977: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.GPS.DestBearing);

		},

	// 978 --**-- Check meta (Format GPS), property DestDistance of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestDistance320240JPEG_978: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.GPS.DestDistance);

		},

	// 979 --**-- Check meta (Format GPS), property DestLatitude of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestLatitude320240JPEG_979: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("00,00,0N",MyImage.pics.meta.GPS.DestLatitude);

		},

	// 980 --**-- Check meta (Format GPS), property DestLongitude of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestLongitude320240JPEG_980: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("00,00,0E",MyImage.pics.meta.GPS.DestLongitude);

		},

	// 981 --**-- Check meta (Format GPS), property Differential of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDifferential320240JPEG_981: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.GPS.Differential);

		},

	// 982 --**-- Check meta (Format GPS), property DOP of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDOP320240JPEG_982: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.GPS.DOP);

		},

	// 983 --**-- Check meta (Format GPS), property ImgDirection of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSImgDirection320240JPEG_983: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.GPS.ImgDirection);

		},

	// 984 --**-- Check meta (Format GPS), property ImgDirectionRef of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSImgDirectionRef320240JPEG_984: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("M",MyImage.pics.meta.GPS.ImgDirectionRef);

		},	

	// 985 --**-- Check meta (Format GPS), property Latitude of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSLatitude320240JPEG_985: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("00,00,0N",MyImage.pics.meta.GPS.Latitude);

		},	

	// 986 --**-- Check meta (Format GPS), property Longitude of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSLongitude320240JPEG_986: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("00,00,0W",MyImage.pics.meta.GPS.Longitude);

		},	

	// 987 --**-- Check meta (Format GPS), property MapDatum of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSMapDatum320240JPEG_987: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.GPS.MapDatum);

		},

	// 988 --**-- Check meta (Format GPS), property MeasureMode of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSMeasureMode320240JPEG_988: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("2",MyImage.pics.meta.GPS.MeasureMode);

		},

	// 989 --**-- Check meta (Format GPS), property ProcessingMethod of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSProcessingMethod320240JPEG_989: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.GPS.ProcessingMethod.toString());

		},

	// 990 --**-- Check meta (Format GPS), property Satellites of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSSatellites320240JPEG_990: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("test",MyImage.pics.meta.GPS.Satellites);

		},

	// 991 --**-- Check meta (Format GPS), property Speed of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSSpeed320240JPEG_991: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.GPS.Speed);

		},

	// 992 --**-- Check meta (Format GPS), property SpeedRef of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSSpeedRef320240JPEG_992: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("K",MyImage.pics.meta.GPS.SpeedRef);

		},

	// 993 --**-- Check meta (Format GPS), property Status of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSStatus320240JPEG_993: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("A",MyImage.pics.meta.GPS.Status);

		},

	// 994 --**-- Check meta (Format GPS), property Track of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSTrack320240JPEG_994: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame(0,MyImage.pics.meta.GPS.Track);

		},

	// 995 --**-- Check meta (Format GPS), property TrackRef of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSTrack320240JPEG_995: function() { 
	
 	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e;

    	try {

			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
	 	 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	 	Y.Assert.areSame("T",MyImage.pics.meta.GPS.TrackRef);

		},


	// 996 --**-- Check new meta saved (Format IPTC), random property of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageNewMetaFormatIPTCKeyword320240JPEG_996: function() { 
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e,
    				newFolderTest = Folder (thepath + "images/testNewMeta/"),
    				pictureToCopy = new File (thepath + "images/jpeg/320240.jpg"),
    				meta = { IPTC:{ Keywords: "vacation" } };


	    //Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }

	    //Copy the pictures 
	    pictureToCopy.copyTo (thepath + "images/testNewMeta/320240_copy.jpg", "Overwrite"); 

	    try {

			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			//Save the meta into the picture
			img.saveMeta(meta); 
			//Save the picture with the meta locally 
			img.save(thepath + "images/testNewMeta/320240_copy.jpg");

			//Re-Load the Image to get the good meta information	
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			MyImage.pics = img;
			MyImage.info = i;
		 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	Y.Assert.areSame("vacation",MyImage.pics.meta.IPTC.Keywords); 	

	var pictureToRemove = new File (thepath + "images/testNewMeta/320240_copy.jpg");
		pictureToRemove.remove(); 

	  	},


	// 997 --**-- Check new meta saved (Format EXIF), random property of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageNewMetaFormatEXIFApertureValue320240JPEG_997: function() { 
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e,
    				newFolderTest = Folder (thepath + "images/testNewMeta/"),
    				pictureToCopy = new File (thepath + "images/jpeg/320240.jpg"),
    				meta = { EXIF:{ApertureValue: 45}};


	    //Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }

	    //Copy the pictures 
	    pictureToCopy.copyTo (thepath + "images/testNewMeta/320240_copy.jpg", "Overwrite"); 

	    try {

			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			//Save the meta into the picture
			img.saveMeta(meta); 
			//Save the picture with the meta locally 
			img.save(thepath + "images/testNewMeta/320240_copy.jpg");

			//Re-Load the Image to get the good meta information	
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			MyImage.pics = img;
			MyImage.info = i;
		 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	Y.Assert.areSame(45,MyImage.pics.meta.EXIF.ApertureValue); 	

	var pictureToRemove = new File (thepath + "images/testNewMeta/320240_copy.jpg");
		pictureToRemove.remove(); 

	  	},

	// 998 --**-- Check new meta saved (Format GPS), random property of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageNewMetaFormatGPSAltitude320240JPEG_998: function() { 
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e,
    				newFolderTest = Folder (thepath + "images/testNewMeta/"),
    				pictureToCopy = new File (thepath + "images/jpeg/320240.jpg"),
    				meta = { GPS:{Altitude: 10}};


	    //Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }

	    //Copy the pictures 
	    pictureToCopy.copyTo (thepath + "images/testNewMeta/320240_copy.jpg", "Overwrite"); 

	    try {

			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			//Save the meta into the picture
			img.saveMeta(meta); 
			//Save the picture with the meta locally 
			img.save(thepath + "images/testNewMeta/320240_copy.jpg");

			//Re-Load the Image to get the good meta information	
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			MyImage.pics = img;
			MyImage.info = i;
		 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	Y.Assert.areSame(10,MyImage.pics.meta.GPS.Altitude); 

	var pictureToRemove = new File (thepath + "images/testNewMeta/320240_copy.jpg");
		pictureToRemove.remove();	 

	  	},	

	// 999 --**-- Check new meta saved (Format TIFF), random property of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageNewMetaFormatTIFFArtist320240JPEG_999: function() { 
	var MyImage = new ds.ImageWithLoadImage(),
    				thepath = getFolder("path"),
    				exceptions = 0,
    				e,
    				newFolderTest = Folder (thepath + "images/testNewMeta/"),
    				pictureToCopy = new File (thepath + "images/jpeg/320240.jpg"),
    				meta = { TIFF:{Artist: "test"}};


	    //Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }

	    //Copy the pictures 
	    pictureToCopy.copyTo (thepath + "images/testNewMeta/320240_copy.jpg", "Overwrite"); 

	    try {

			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			//Save the meta into the picture
			img.saveMeta(meta);
			//Save the picture with the meta locally 
			img.save(thepath + "images/testNewMeta/320240_copy.jpg");

			//Re-Load the Image to get the good meta information	
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			MyImage.pics = img;
			MyImage.info = i;
		 	result = MyImage.save(); 

	 	 } catch (e) {

	 	 	exceptions++; 	
	 	 	console.log("we caught : " + e);

	 	 };

	Y.Assert.areSame("test",MyImage.pics.meta.TIFF.Artist); 	

	var pictureToRemove = new File (thepath + "images/testNewMeta/320240_copy.jpg");
		pictureToRemove.remove(); 

	  	}, 

	// 1000 --**-- Manipulate picture locally to a thumbnail as Default Mode (6, Scaled to fit proportionnaly centered)
	testImage_SaveImageManipulatedLocallyAsThumbnailDefaultMode_1000: function() { 
	var thepath = getFolder("path"),
		e,
		exceptions = 0,
		newFolderTest = Folder (thepath + "images/testThumbnail/"), 
		pictureToCopy = new File (thepath + "images/jpeg/320240.jpg");

		//Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }

		//Copy the pictures 
		pictureToCopy.copyTo (thepath + "images/testThumbnail/320240_copy.jpg", "Overwrite"); 	    

			try {

				img = loadImage(thepath + "images/testThumbnail/320240_copy.jpg");
				thumbPicture = img.thumbnail(100,100);
				//Save The picture locally
				thumbPicture.save(thepath + "images/testThumbnail/320240_thumb_10075_6_default.jpg"); 	

			} catch (e) { 

				exceptions++; 
				console.log("we caught :" + e); 

			}

				img = loadImage(thepath + "images/testThumbnail/320240_thumb_10075_6_default.jpg");
				result1 = img.height; 
				result2 = img.width;
			
		Y.Assert.areSame(75,result1);
		Y.Assert.areSame(100,result2); 
		Y.Assert.areSame(0,exceptions);

		var pictureToRemove = new File (thepath + "images/testThumbnail/320240_copy.jpg"),
			pictureToRemoveBis = new File (thepath + "images/testThumbnail/320240_thumb_10075_6_default.jpg"); 
		pictureToRemove.remove();
		pictureToRemoveBis.remove();

	  	}, 

	// 1001 --**-- Manipulate picture locally to a thumbnail as scaled to fit Mode (2, Scaled to fit)
	testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitMode_1001: function() { 
	var thepath = getFolder("path"),
		e,
		exceptions = 0,
		newFolderTest = Folder (thepath + "images/testThumbnail/"), 
		pictureToCopy = new File (thepath + "images/jpeg/320240.jpg");

		//Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }

		//Copy the pictures 
		pictureToCopy.copyTo (thepath + "images/testThumbnail/320240_copy.jpg", "Overwrite"); 	    

			try {

				img = loadImage(thepath + "images/testThumbnail/320240_copy.jpg");
				thumbPicture = img.thumbnail(100,100,2);
				//Save The picture locally
				thumbPicture.save(thepath + "images/testThumbnail/320240_thumb_100100_2.jpg"); 	

			} catch (e) { 

				exceptions++; 
				console.log("we caught :" + e); 

			}

				img = loadImage(thepath + "images/testThumbnail/320240_thumb_100100_2.jpg");
				result1 = img.height; 
				result2 = img.width;
			
		Y.Assert.areSame(100,result1);
		Y.Assert.areSame(100,result2); 
		Y.Assert.areSame(0,exceptions);

		var pictureToRemove = new File (thepath + "images/testThumbnail/320240_copy.jpg"),
			pictureToRemoveBis = new File (thepath + "images/testThumbnail/320240_thumb_100100_2.jpg"); 
		pictureToRemove.remove();
		pictureToRemoveBis.remove();

	  	},

	// 1002 --**-- Manipulate picture locally to a thumbnail as scaled to fit propertionally Mode (5, Scaled to fit proportionnaly)
	testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitProportionallyMode_1002: function() { 
	var thepath = getFolder("path"),
		e,
		exceptions = 0,
		newFolderTest = Folder (thepath + "images/testThumbnail/"), 
		pictureToCopy = new File (thepath + "images/jpeg/320240.jpg");

		//Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }

		//Copy the pictures 
		pictureToCopy.copyTo (thepath + "images/testThumbnail/320240_copy.jpg", "Overwrite"); 	    

			try {

				img = loadImage(thepath + "images/testThumbnail/320240_copy.jpg");
				thumbPicture = img.thumbnail(100,100,5);
				//Save The picture locally
				thumbPicture.save(thepath + "images/testThumbnail/320240_thumb_10075_5.jpg"); 	

			} catch (e) { 

				exceptions++; 
				console.log("we caught :" + e); 

			}

				img = loadImage(thepath + "images/testThumbnail/320240_thumb_10075_5.jpg");
				result1 = img.height; 
				result2 = img.width;
			
		Y.Assert.areSame(75,result1);
		Y.Assert.areSame(100,result2); 
		Y.Assert.areSame(0,exceptions);

		var pictureToRemove = new File (thepath + "images/testThumbnail/320240_copy.jpg"),
			pictureToRemoveBis = new File (thepath + "images/testThumbnail/320240_thumb_10075_5.jpg"); 
		pictureToRemovepictureToRemove.remove();
		pictureToRemoveBis.remove();

	  	},


	// 1003 --**-- Manipulate picture locally to a thumbnail as scaled to fit propertionally centered Mode (6, Scaled to fit proportionnaly centered)
	testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitProportionallyCenteredMode_1003: function() { 
	var thepath = getFolder("path"),
		e,
		exceptions = 0,
		newFolderTest = Folder (thepath + "images/testThumbnail/"), 
		pictureToCopy = new File (thepath + "images/jpeg/320240.jpg");

		//Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }

		//Copy the pictures 
		pictureToCopy.copyTo (thepath + "images/testThumbnail/320240_copy.jpg", "Overwrite"); 	    

			try {

				img = loadImage(thepath + "images/testThumbnail/320240_copy.jpg");
				thumbPicture = img.thumbnail(100,100,6);
				//Save The picture locally
				thumbPicture.save(thepath + "images/testThumbnail/320240_thumb_10075_6.jpg"); 	

			} catch (e) { 

				exceptions++; 
				console.log("we caught :" + e); 

			}

				img = loadImage(thepath + "images/testThumbnail/320240_thumb_10075_6.jpg");
				result1 = img.height; 
				result2 = img.width;
			
		Y.Assert.areSame(75,result1);
		Y.Assert.areSame(100,result2); 
		Y.Assert.areSame(0,exceptions);

		var pictureToRemove = new File (thepath + "images/testThumbnail/320240_copy.jpg"),
			pictureToRemoveBis = new File (thepath + "images/testThumbnail/320240_thumb_10075_6.jpg"); 
		pictureToRemovepictureToRemove.remove();
		pictureToRemoveBis.remove();

	  	},


	// 1004 --**-- Save a picture locally as copy with a String (Absolute file to path)
	testImage_SaveImageOnDiskLogic1_1004: function() { 
	var thepath = getFolder("path"),
		e,
		exceptions = 0,
		newFolderTest = Folder (thepath + "images/testSaveOnDisk/");

		//Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }

		try {

				img = loadImage(thepath + "images/jpeg/320240.jpg");
				//Save The picture locally
				img.save(thepath + "images/testSaveOnDisk/320240_saveLogic1.jpg",".jpg"); 	

		} catch (e) { 

				exceptions++; 
				console.log("we caught :" + e); 

		}

		result = new File (thepath + "images/testSaveOnDisk/320240_saveLogic1.jpg");

		Y.Assert.isTrue(result.exists);
		Y.Assert.areSame(0,exceptions);

		var pictureToRemove = new File (thepath + "images/testSaveOnDisk/320240_saveLogic1.jpg");
			pictureToRemove.remove();


	  	},


	// 1005 --**-- Save a picture locally as copy with a File object in file 
	testImage_SaveImageOnDiskLogic2_1005: function() { 
	var thepath = getFolder("path"),
		e,
		exceptions = 0,
		newFolderTest = Folder (thepath + "images/testSaveOnDisk/");

		//Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }


	    try {
	    		img = loadImage(thepath + "images/jpeg/320240.jpg");
				//Save The picture locally
				img.save(File (thepath + "images/testSaveOnDisk/320240_saveLogic2.jpg",".jpg")); 	

		} catch (e) { 

				exceptions++; 
				console.log("we caught :" + e); 

		}

	result = new File (thepath + "images/testSaveOnDisk/320240_saveLogic2.jpg");

	Y.Assert.isTrue(result.exists);
	Y.Assert.areSame(0,exceptions);

	var pictureToRemove = new File (thepath + "images/testSaveOnDisk/320240_saveLogic2.jpg");
			pictureToRemove.remove();

		}, 

	// 1006 --**-- Save a picture with a new path  
	testImage_SaveAPictureWithASetNewPath_1006: function() { 
	var thepath = getFolder("path"),
		e,
		exceptions = 0,
		newFolderTest = Folder (thepath + "images/testSaveOnDisk/"),
		MyImage = new ds.ImageWithLoadImage();

		//Folder exist? 
	    if (newFolderTest.exists == false) {

	    	newFolderTest.create();

	    } else {

	    	//Folder already exist

	    }

	    try {
	    		img = loadImage(thepath + "images/jpeg/320240.jpg");
	    		img.setPath(thepath + "images/testSaveOnDisk/320240.jpg");
				MyImage.pics = img;
		 		MyImage.save();	

		} catch (e) { 

				exceptions++; 
				console.log("we caught :" + e); 

		}

	result = new File (thepath + "images/testSaveOnDisk/320240_newpath.jpg");

	Y.Assert.isTrue(result.exists);
	Y.Assert.areSame(0,exceptions);
	Y.Assert.isNotNull(MyImage.pics);
	

	var pictureToRemove = new File (thepath + "images/testSaveOnDisk/320240_newpath.jpg");
		pictureToRemove.remove();

		}

    };
 	    
    /*
    //create the console
    (new Y.Test.Console({
        newestOnTop : false,
        filters: {
            pass: true,
            fail: true
        }
    })).render('#testLogger');

    Y.Test.Runner.add(Y.example.test.ExampleSuite);

    //run the tests
    Y.Test.Runner.run();
    */
    
  if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}  