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
var jpg2000Resolution = [320240, 640480, 800600, 1024768, 1152864, 12801024, 1280854, 1440900, 16001200];
var H = [240,480,600,768,864,1024,854,900,1200];
var W = [320,640,800,1024,1152,1280,1280,1440,1600];
var jpg2000Logic = ["SaveImageAsEntityFileObjectWithLoadImage","SaveImageAsEntityAbsolutePathWithLoadImage","SaveImageAsEntityFileObjectWithoutLoadImage","SaveImageAsEntityAbsolutePathWithoutLoadImage"];


function count() {
	var counter = 0;
	for (var p in this) if (this.hasOwnProperty(p))++counter;
	return counter;
}

function generateJSON()
{
	var jsonResult =
	{
		"imageType" : "jpg2000",
		"name" : "JPG2000test",
		"jpg2000Logic" :
		[]
	};
		for (var configCase = 0;configCase < jpg2000Logic.length;configCase++)
		{
			for (var HWCase = 0;HWCase < H.length;HWCase++)
			{
				value++;
				jsonResult.jpg2000Logic.push(
					{
						"case" : value,
						"jpg2000Case":
						{
							"file" : "" + W[HWCase] + H[HWCase] + ".jpf",
							"config" : jpg2000Logic[configCase],
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

var JPG2000LogicCase = generateJSON();

function generator(file,config,width,height)
{
	
index++;
//Init Local variable 
var MyImage = new ds.ImageWithLoadImage();
var	thepath = getFolder("path");
var	exceptions = 0;
var	e;
var pictFile = File(thepath + "images/jpg2000/" + file);

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
		var img = loadImage(thepath + "images/jpg2000/" + file);
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
		var img = thepath + "images/jpg2000/" + file;
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
console.log("No config to test for JPG2000");

//Asserts
Y.Assert.areEqual(width,MyImage.pics.width);
Y.Assert.areEqual(height,MyImage.pics.height);
};

var testCase = 
{
	name: "test API image JPG2000",
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
	 * Test methods for API SSJS IMAGE JPG2000
	 *
	 */
};

//Attention, different scope for() and function()
for (var jpg2000 = 0; jpg2000 < JPG2000LogicCase.jpg2000Logic.length; jpg2000++)
{
	testCase["testImage_" + JPG2000LogicCase.jpg2000Logic[jpg2000].case + "_" + JPG2000LogicCase.jpg2000Logic[jpg2000].jpg2000Case.config + "_" + JPG2000LogicCase.jpg2000Logic[jpg2000].jpg2000Case.file + "_" + "JPG2000"] = function()
	{
		var pjpg2000 = JPG2000LogicCase.jpg2000Logic[index].jpg2000Case.file;
		var pjpg20001 = JPG2000LogicCase.jpg2000Logic[index].jpg2000Case.config;
		var pjpg20002 = JPG2000LogicCase.jpg2000Logic[index].jpg2000Case.resolution;
		var pjpg20003 = JPG2000LogicCase.jpg2000Logic[index].jpg2000Case.width;
		var pjpg20004 = JPG2000LogicCase.jpg2000Logic[index].jpg2000Case.height;

		console.log("JPG2000 File " + pjpg2000);
		console.log("JPG2000 Config " + pjpg20001);
		console.log("JPG2000 Resolution " + pjpg20002);
		console.log("JPG2000 width " + pjpg20003);
		console.log("JPG2000 height " + pjpg20004);

		generator(pjpg2000,pjpg20001,pjpg20003,pjpg20004);
	};
};



