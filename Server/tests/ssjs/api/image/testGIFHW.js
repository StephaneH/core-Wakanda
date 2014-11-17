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
//Init Global variable 
var value = 0;
var index = 0;
var gifResolution = [320240, 640480, 800600, 1024768, 1152864, 12801024, 1280854, 1440900, 16001200];
var H = [240,480,600,768,864,1024,854,900,1200];
var W = [320,640,800,1024,1152,1280,1280,1440,1600];
var gifLogic = ["SaveImageAsEntityFileObjectWithLoadImage","SaveImageAsEntityAbsolutePathWithLoadImage","SaveImageAsEntityFileObjectWithoutLoadImage","SaveImageAsEntityAbsolutePathWithoutLoadImage"];


function count() {
	var counter = 0;
	for (var p in this) if (this.hasOwnProperty(p))++counter;
	return counter;
}

function generateJSON()
{
	var jsonResult =
	{
		"imageType" : "gif",
		"name" : "GIFtest",
		"gifLogic" :
		[]
	};
		for (var configCase = 0;configCase < gifLogic.length;configCase++)
		{
			for (var HWCase = 0;HWCase < H.length;HWCase++)
			{
				value++;
				jsonResult.gifLogic.push(
					{
						"case" : value,
						"gifCase":
						{
							"file" : "" + W[HWCase] + H[HWCase] + ".gif",
							"config" : gifLogic[configCase],
							"height" : H[HWCase],
							"width" : W[HWCase],
							"resolution" : "" + W[HWCase] + H[HWCase]
						}
					}
				);	
			};
		};
	return jsonResult;
}; 

var GIFLogicCase = generateJSON();

function generator(file,config,width,height)
{
	
index++;
//Init Local variable 
var MyImage = new ds.ImageWithLoadImage();
var	thepath = getFolder("path");
var	exceptions = 0;
var	e;
var pictFile = File(thepath + "images/gif/" + file);

if (config == "SaveImageAsEntityFileObjectWithLoadImage")
{
// Case : SaveImageAsEntityFileObjectWithLoadImage
	try 
	{
		var	img = loadImage(pictFile);
		MyImage.pics = img;
		MyImage.info = index;
		result = MyImage.save();
	} 
	catch (e) 
	{
		exceptions++;
		console.log("we caught : " + e);
	};
}
else if (config == "SaveImageAsEntityAbsolutePathWithLoadImage")
{
// Case : SaveImageAsEntityAbsolutePathWithLoadImage
	try 
	{
		var img = loadImage(thepath + "images/gif/" + file);
		MyImage.pics = img;
		MyImage.info = index;
		result = MyImage.save();
	} 
	catch (e) 
	{
		exceptions++;
		console.log("we caught : " + e);
	};
}
else if (config == "SaveImageAsEntityFileObjectWithoutLoadImage")
{
// Case : SaveImageAsEntityFileObjectWithoutLoadImage
	try 
	{
		var img = pictFile;
		MyImage.pics = img;
		MyImage.info = index;
		result = MyImage.save();
		} 
		catch (e) 
		{
			exceptions++;
			console.log("we caught : " + e);
		};
}
else if (config == "SaveImageAsEntityAbsolutePathWithoutLoadImage")
{
// Case : SaveImageAsEntityAbsolutePathWithoutLoadImage
	try 
	{
		var img = thepath + "images/gif/" + file;
		MyImage.pics = img;
		MyImage.info = index;
		result = MyImage.save();
	} 
	catch (e) 
	{
		exceptions++;
		console.log("we caught : " + e);
	};
}
else
console.log("No config to test for GIF");

//Asserts
Y.Assert.areEqual(width,MyImage.pics.width);
Y.Assert.areEqual(height,MyImage.pics.height);
};

var testCase = 
{
	name: "test API image GIF",
	_should: {
		error: {},
		ignore: {}
	},	
	/*
	 * Sets up data that is needed by each test.
	 */ 
	setUp: function() 
	{
		//imagesFolder.create();
	},
	/*
	 * Cleans up everything that was created by setUp().
	 */
	tearDown: function() 
	{
		
		//ds.Image.remove();
		//ds.ImageWithLoadImage.remove();
		//ds.ImageWithoutLoadImage.remove();
		 
	}
	/*
	 *
	 * Test methods for API SSJS IMAGE GIF
	 *
	 */
};

//Attention, different scope for() and function()
for (var gif = 0; gif < GIFLogicCase.gifLogic.length; gif++)
{
	testCase["testImage_" + GIFLogicCase.gifLogic[gif].case + "_" + GIFLogicCase.gifLogic[gif].gifCase.config + "_" + GIFLogicCase.gifLogic[gif].gifCase.file + "_" + "GIF"] = function()
	{
		var pgif = GIFLogicCase.gifLogic[index].gifCase.file;
		var pgif1 = GIFLogicCase.gifLogic[index].gifCase.config;
		var pgif2 = GIFLogicCase.gifLogic[index].gifCase.resolution;
		var pgif3 = GIFLogicCase.gifLogic[index].gifCase.width;
		var pgif4 = GIFLogicCase.gifLogic[index].gifCase.height;

		console.log("GIF File " + pgif);
		console.log("GIF Config " + pgif1);
		console.log("GIF Resolution " + pgif2);
		console.log("GIF width " + pgif3);
		console.log("GIF height " + pgif4);

		generator(pgif,pgif1,pgif3,pgif4);
	};
};



