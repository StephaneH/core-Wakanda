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
include("Utils/utils.js");
include("Results/DataClass1Completion.js");

var tests = {
				type: "Completion",
				list: {
						"test 1 : EM static completion without ds: DataClass1. (text)" :{
									mode: 		"text",
									source:		"DataClass1.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_static_text_results
							 	},
						"test 2 : EM static completion without ds: DataClass1. (displayText)" :{
									mode: 		"displayText",
									source:		"DataClass1.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_static_displaytext_results
							 	},
						"test 3 : EM static completion with ds: DataClass1. (text)" :{
									mode: 		"text",
									source:		"ds.DataClass1.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_static_text_results
							 	},
						"test 4 : EM static completion with ds: DataClass1. (displayText)" :{
									mode: 		"displayText",
									source:		"ds.DataClass1.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_static_displaytext_results
							 	},
						"test 5 : EM entity completion without ds: DataClass1.createEntity(). (text)" :{
									mode: 		"text",
									source:		"DataClass1.createEntity().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_text_results
							 	},
						"test 6 : EM entity completion without ds: DataClass1.createEntity(). (displayText)" :{
									mode: 		"displayText",
									source:		"DataClass1.createEntity().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_displaytext_results
							 	},
						"test 7 : EM entity completion with ds: DataClass1.createEntity(). (text)" :{
									mode: 		"text",
									source:		"ds.DataClass1.createEntity().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_text_results
							 	},
						"test 8 : EM entity completion with ds: DataClass1.createEntity(). (displayText)" :{
									mode: 		"displayText",
									source:		"ds.DataClass1.createEntity().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_displaytext_results
							 	},
						"test 9 : EM entity completion without ds: DataClass1.first(). (text)" :{
									mode: 		"text",
									source:		"DataClass1.first().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_text_results
							 	},
						"test 10 : EM entity completion without ds: DataClass1.first(). (displayText)" :{
									mode: 		"displayText",
									source:		"DataClass1.first().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_displaytext_results
							 	},
						"test 11 : EM entity completion with ds: DataClass1.first(). (text)" :{
									mode: 		"text",
									source:		"ds.DataClass1.first().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_text_results
							 	},
						"test 12 : EM entity completion with ds: DataClass1.first(). (displayText)" :{
									mode: 		"displayText",
									source:		"ds.DataClass1.first().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_displaytext_results
							 	},
						"test 13 : EM entity completion without ds: DataClass1.find(). (text)" :{
									mode: 		"text",
									source:		"DataClass1.find().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_text_results
							 	},
						"test 14 : EM entity completion without ds: DataClass1.find(). (displayText)" :{
									mode: 		"displayText",
									source:		"DataClass1.find().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_displaytext_results
							 	},
						"test 15 : EM entity completion with ds: DataClass1.find(). (text)" :{
									mode: 		"text",
									source:		"ds.DataClass1.find().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_text_results
							 	},
						"test 16 : EM entity completion with ds: DataClass1.find(). (displayText)" :{
									mode: 		"displayText",
									source:		"ds.DataClass1.find().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_displaytext_results
							 	},
						"test 17 : EM entity completion without ds: DataClass1(). (text)" :{
									mode: 		"text",
									source:		"DataClass1().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_text_results
							 	},
						"test 18 : EM entity completion without ds: DataClass1(). (displayText)" :{
									mode: 		"displayText",
									source:		"DataClass1().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_displaytext_results
							 	},
						"test 19 : EM entity completion with ds: DataClass1(). (text)" :{
									mode: 		"text",
									source:		"ds.DataClass1().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_text_results
							 	},
						"test 20 : EM entity completion with ds: DataClass1(). (displayText)" :{
									mode: 		"displayText",
									source:		"ds.DataClass1().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_displaytext_results
							 	},
						"test 21 : EM collection completion without ds: DataClass1.query(). (text)" :{
									mode: 		"text",
									source:		"DataClass1.query().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_text_results
								},
						"test 22 : EM collection completion without ds: DataClass1.query(). (displayText)" :{
									mode: 		"displayText",
									source:		"DataClass1.query().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_displaytext_results
							 	},
						"test 23 : EM collection completion with ds: ds.DataClass1.query(). (text)" :{
									mode: 		"text",
									source:		"ds.DataClass1.query().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_text_results
							 	},
						"test 24 : EM collection completion with ds: ds.DataClass1.query(). (displayText)" :{
									mode: 		"displayText",
									source:		"ds.DataClass1.query().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_displaytext_results
							 	},
						"test 25 : EM collection completion without ds: DataClass1.createEntityCollection(). (text)" :{
									mode: 		"text",
									source:		"DataClass1.createEntityCollection().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_text_results
								},
						"test 26 : EM collection completion without ds: DataClass1.createEntityCollection(). (displayText)" :{
									mode: 		"displayText",
									source:		"DataClass1.createEntityCollection().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_displaytext_results
							 	},
						"test 27 : EM collection completion with ds: ds.DataClass1.createEntityCollection(). (text)" :{
									mode: 		"text",
									source:		"ds.DataClass1.createEntityCollection().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_text_results
							 	},
						"test 28 : EM collection completion with ds: ds.DataClass1.createEntityCollection(). (displayText)" :{
									mode: 		"displayText",
									source:		"ds.DataClass1.createEntityCollection().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_displaytext_results
							 	},

						"test 29 : EM collection completion without ds: DataClass1.orderBy(). (text)" :{
									mode: 		"text",
									source:		"DataClass1.orderBy().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_text_results
								},
						"test 30 : EM collection completion without ds: DataClass1.orderBy(). (displayText)" :{
									mode: 		"displayText",
									source:		"DataClass1.orderBy().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_displaytext_results
							 	},
						"test 31 : EM collection completion with ds: ds.DataClass1.orderBy(). (text)" :{
									mode: 		"text",
									source:		"ds.DataClass1.orderBy().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_text_results
							 	},
						"test 32 : EM collection completion with ds: ds.DataClass1.orderBy(). (displayText)" :{
									mode: 		"displayText",
									source:		"ds.DataClass1.orderBy().",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_displaytext_results
							 	},
						"test 33 : EM entity completion on DataClass1 instance with ds (text)" :{
									mode: 		"text",
									source:		"ds1.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_text_results
							 	},
						"test 34 : EM entity completion on DataClass1 instance with ds (displayText)" :{
									mode: 		"displayText",
									source:		"ds1.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_displaytext_results
							 	},
						"test 35 : EM entity completion on DataClass1 instance without ds (text)" :{
									mode: 		"text",
									source:		"ds2.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_text_results
							 	},
						"test 36 : EM entity completion on DataClass1 instance without ds (displayText)" :{
									mode: 		"displayText",
									source:		"ds2.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_entity_displaytext_results
							 	},
						
						"test 37 : EM collection completion on DataClass1 instance with ds (text)" :{
									mode: 		"text",
									source:		"ds3.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_text_results
							 	},
						"test 38 : EM collection completion on DataClass1 instance with ds (displayText)" :{
									mode: 		"displayText",
									source:		"ds3.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_displaytext_results
							 	},
						"test 39 : EM collection completion on DataClass1 instance without ds (text)" :{
									mode: 		"text",
									source:		"ds4.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_text_results
							 	},
						"test 40 : EM collection completion on DataClass1 instance without ds (displayText)" :{
									mode: 		"displayText",
									source:		"ds4.",
									file:   	"TestFiles/test_01.js",
									line:		1,
									results : 	dataclass1_collection_displaytext_results
							 	}
								
						}
			};	

var testCase = {
	name: "Entity Models completion tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);
