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
var tiffOption = ["without_MAC","without_PC","LZW_PC","LZW_MAC","ZIP_MAC","ZIP_PC","JPEG_PC","JPEG_MAC"];
var tifResolution = [320240, 640480, 800600, 1024768, 1152864, 12801024, 1280854, 1440900, 16001200];
var H = [240,480,600,768,864,1024,854,900,1200];
var W = [320,640,800,1024,1152,1280,1280,1440,1600];
var tifLogic = ["SaveImageAsEntityFileObjectWithLoadImage","SaveImageAsEntityAbsolutePathWithLoadImage","SaveImageAsEntityFileObjectWithoutLoadImage","SaveImageAsEntityAbsolutePathWithoutLoadImage"];


function count() {
	var counter = 0;
	for (var p in this) if (this.hasOwnProperty(p))++counter;
	return counter;
}

function generateJSON()
{
	var jsonResult =
	{
		"imageType" : "tif",
		"name" : "TIFtest",
		"tifLogic" :
		[]
	};
		for (var configCase = 0;configCase < tifLogic.length;configCase++)
		{
			for (var optionCase = 0;optionCase < tiffOption.length;optionCase++)
			{
				for (var HWCase = 0;HWCase < H.length;HWCase++)
				{
					value++;
					jsonResult.tifLogic.push(
						{
							"case" : value,
							"tifCase":
							{
								"file" : "" + W[HWCase] + H[HWCase] + "_" + tiffOption[optionCase] + ".tif",
								"config" : tifLogic[configCase],
								"height" : H[HWCase],
								"width" : W[HWCase],
								"resolution" : "" + W[HWCase] + H[HWCase]
							}
						}
					);	
				};
			};		
		};
	return jsonResult;
};

var TIFLogicCase = generateJSON();

function generator(file,config)
{
	
index++;
//Init Local variable 
var MyImage = new ds.ImageWithLoadImage();
var	thepath = getFolder("path");
var	exceptions = 0;
var	e;
var pictFile = File(thepath + "images/tiff/" + file);

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
		var img = loadImage(thepath + "images/tiff/" + file);
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
		var img = thepath + "images/tiff/" + file;
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
console.log("No config to test for TIF");
debugger;
//Asserts
Y.Assert.isNotNull(MyImage.pics.size);
Y.Assert.isNotUndefined(MyImage.pics.size);
Y.Assert.isTrue(MyImage.pics.size !== 0);
};

var testCase = 
{
	name: "test API image TIFF",
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
		
		// ds.Image.remove();
		// ds.ImageWithLoadImage.remove();
		// ds.ImageWithoutLoadImage.remove();
		 
	}
	/*
	 *
	 * Test methods for API SSJS IMAGE TIFF
	 *
	 */
};

//Attention, different scope for() and function()
for (var tif = 0; tif < TIFLogicCase.tifLogic.length; tif++)
{
	testCase["testImage_" + TIFLogicCase.tifLogic[tif].case + "_" + TIFLogicCase.tifLogic[tif].tifCase.config + "_" + TIFLogicCase.tifLogic[tif].tifCase.file + "_" + "TIF"] = function()
	{
		var ptif = TIFLogicCase.tifLogic[index].tifCase.file;
		var ptif1 = TIFLogicCase.tifLogic[index].tifCase.config;
		var ptif2 = TIFLogicCase.tifLogic[index].tifCase.resolution;
		var ptif3 = TIFLogicCase.tifLogic[index].tifCase.width;
		var ptif4 = TIFLogicCase.tifLogic[index].tifCase.height;

		console.log("TIF File " + ptif);
		console.log("TIF Config " + ptif1);
		console.log("TIF Resolution " + ptif2);
		console.log("TIF width " + ptif3);
		console.log("TIF height " + ptif4);

		generator(ptif,ptif1,ptif3,ptif4);
	};
};
