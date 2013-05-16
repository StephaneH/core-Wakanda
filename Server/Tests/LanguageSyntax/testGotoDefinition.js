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

var tests = {
				type: "GotoDefinition",
				list: {
						test1 : {
									selection: "var1",
									file:   "clientSide/gotodef_client_01.js",
									line:	1,
									results : [
												{
													name: "var1",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 1
												}
											  ]
							 	},
						test2 : {
									selection: "p1",
									file:   "clientSide/gotodef_client_01.js",
									line:	4,
									results : [
												{
													name: "p1",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 15
												}
											  ]
							 	},
						test3 : {
									selection: "p3_1",
									file:   "clientSide/gotodef_client_01.js",
									line:	8,
									results : [ ] // No result
							 	},
						test4 : {
									selection: "var1",
									file:   "clientSide/gotodef_client_01.js",
									line:	12,
									results : [
												{
													name: "var1",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 1
												}
											  ]
							 	},
						test5 : {
									selection: "obj1",
									file:   "clientSide/gotodef_client_01.js",
									line:	13,
									results : [
												{
													name: "obj1",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 2
												}
											  ]
							 	},
						test6 : {
									selection: "obj1.p1",
									file:   "clientSide/gotodef_client_01.js",
									line:	13,
									results : [
												{
													name: "p1",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 4
												}
											  ]
							 	},
						test7 : {
									selection: "obj1.p3.p3_1",
									file:   "clientSide/gotodef_client_01.js",
									line:	14,
									results : [
												{
													name: "p3_1",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 8
												}
											  ]
							 	},
						test8 : {
									selection: "p1",
									file:   "clientSide/gotodef_client_01.js",
									line:	15,
									results : [
												{
													name: "p1",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 15
												}
											  ]
							 	},
						test9 : {
									selection: "obj1.p4",
									file:   "clientSide/gotodef_client_01.js",
									line:	16,
									results : [
												{
													name: "p4",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 16
												}
											  ]
							 	},
						test10 : {
									selection: "obj1.p4",
									file:   "clientSide/gotodef_client_01.js",
									line:	17,
									results : [
												{
													name: "p4",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 16
												}
											  ]
							 	},
						test11 : {
									selection: "bar1",
									file:   "clientSide/gotodef_client_01.js",
									line:	21,
									results : [
												{
													name: "bar1",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 19
												}
											  ]
							 	},
						test12 : {
									selection: "bar1",
									file:   "clientSide/gotodef_client_01.js",
									line:	24,
									results : [] // No result
							 	},
						test13 : {
									selection: "var2",
									file:   "clientSide/gotodef_client_02.js",
									line:	21,
									results : [
												{
													name: "var2",
													file: "Definitions/clientSide/gotodef_client_02.js",
													line: 3
												}
											  ]
							 	},
						test14 : {
									selection: "obj2",
									file:   "clientSide/gotodef_client_02.js",
									line:	15,
									results : [
												{
													name: "obj2",
													file: "Definitions/clientSide/gotodef_client_02.js",
													line: 4
												}
											  ]
							 	},
						test15 : {
									selection: "obj2.p1",
									file:   "clientSide/gotodef_client_02.js",
									line:	15,
									results : [
												{
													name: "p1",
													file: "Definitions/clientSide/gotodef_client_02.js",
													line: 6
												}
											  ]
							 	},
						// FIX ME : broken test
						// test16 : {
									// selection: "obj1",
									// file:   "clientSide/gotodef_client_02.js",
									// line:	19,
									// results : [
												// {
													// name: "obj1",
													// file: "./Definitions/clientSide/gotodef_client_01.js",
													// line: 2
												// }
											  // ]
							 	// },
						test17 : {
									selection: "var2",
									file:   "clientSide/gotodef_client_02.js",
									line:	37,
									results : [
												{
													name: "var2",
													file: "Definitions/clientSide/gotodef_client_02.js",
													line: 24
												}
											  ]
							 	},
						test18 : {
									selection: "obj2",
									file:   "clientSide/gotodef_client_02.js",
									line:	38,
									results : [
												{
													name: "obj2",
													file: "Definitions/clientSide/gotodef_client_02.js",
													line: 25
												}
											  ]
							 	},
						// FIX ME : broken test
						// test19 : {
									// selection: "var3",
									// file:   "clientside/gotodef_client_03.js",
									// line:	2,
									// results : [
												// {
													// name: "var3",
													// file: "./definitions/clientside/gotodef_client_03.js",
													// line: 2
												// }
											  // ]
							 	// },
						// FIX ME : broken test
						// test20 : {
									// selection: "var3",
									// file:   "clientSide/gotodef_client_03.js",
									// line:	5,
									// results : [
												// {
													// name: "var3",
													// file: "./Definitions/clientSide/gotodef_client_03.js",
													// line: 2
												// }
											  // ]
							 	// },
						test21 : {
									selection: "fct_1",
									file:   "clientSide/gotodef_client_03.js",
									line:	6,
									results : [
												{
													name: "fct_1",
													file: "Definitions/clientSide/gotodef_client_02.js",
													line: 1
												}
											  ]
							 	},
						test22 : {
									selection: "foo_multiple",
									file:   "clientSide/gotodef_client_03.js",
									line:	7,
									results : [
												{
													name: "foo_multiple",
													file: "Definitions/clientSide/gotodef_client_03.js",
													line: 3
												}
											  ]
							 	},
						test23 : {
									selection: "foo_multiple",
									file:   "clientSide/gotodef_client_04.js",
									line:	1,
									results : [
												{
													name: "foo_multiple",
													file: "Definitions/clientSide/gotodef_client_01.js",
													line: 19
												},
												{
													name: "foo_multiple",
													file: "Definitions/clientSide/gotodef_client_02.js",
													line: 35
												},
												{
													name: "foo_multiple",
													file: "Definitions/clientSide/gotodef_client_03.js",
													line: 3
												},
											  ]
							 	},
						test24 : {
									selection: "var_server1",
									file:   "clientSide/gotodef_client_04.js",
									line:	2,
									results : [] // No result
							 	},
						test25 : {
									selection: "var_server1",
									file:   "serverSide/gotodef_server_01.js",
									line:	3,
									results : [
												{
													name: "var_server1",
													file: "Definitions/serverSide/gotodef_server_01.js",
													line: 1
												}
											  ]
								},
						// FIX ME : obsolete
						test26 : {
									selection: "ds.Model1",
									file:   "serverSide/gotodef_server_01.js",
									line:	4,
									results : [] // No result
								},
						test27 : {
									selection: "methods.Model1.method1",
									file:   "serverSide/gotodef_server_01.js",
									line:	5,
									results : [
												{
													name: "method1",
													file: "Definitions/serverSide/p1.waModel.js",
													line: 6
												}
											  ]
								},
						test28 : {
									selection: "methods",
									file:   "serverSide/gotodef_server_01.js",
									line:	5,
									results : [
												{
													name: "methods",
													file: "Definitions/serverSide/p1.waModel.js",
													line: 2
												}
											  ]
								},
						test29 : {
									selection: "methods.Model1",
									file:   "serverSide/gotodef_server_01.js",
									line:	5,
									results : [
												{
													name: "Model1",
													file: "Definitions/serverSide/p1.waModel.js",
													line: 4
												}
											  ]
								},
						test30 : {
									selection: "methods.Model1.method1",
									file:   "serverSide/gotodef_server_01.js",
									line:	5,
									results : [
												{
													name: "method1",
													file: "Definitions/serverSide/p1.waModel.js",
													line: 6
												}
											  ]
								},
						test31 : {
									selection: "methods.Mo",
									file:   "serverSide/gotodef_server_01.js",
									line:	5,
									results : [ ] // No  result
								},
						test32 : {
									selection: "thods.Model1",
									file:   "serverSide/gotodef_server_01.js",
									line:	5,
									results : [ ] // No  result
								},
						test33 : {
									selection: "bar2",
									file:   "clientSide/gotodef_client_01.js",
									line:	25,
									results : [
												{
													name: "bar2",
													file: "Definitions/clientSide/gotodef_client_02.js",
													line: 39
												}
											  ]
								},
						test34 : {
									selection: "server2",
									file:   "serverSide/gotodef_server_02.js",
									line:	2,
									results : [
												{
													name: "server2",
													file: "Definitions/serverSide/gotodef_server_01.js",
													line: 6
												}
											  ]
								},
						test35 : {
									selection: "server2.p1",
									file:   "serverSide/gotodef_server_02.js",
									line:	2,
									results : [
												{
													name: "p1",
													file: "Definitions/serverSide/gotodef_server_01.js",
													line: 7
												}
											  ]
								},
						test36 : {
									selection: "server2.p1.p2",
									file:   "serverSide/gotodef_server_02.js",
									line:	2,
									results : [
												{
													name: "p2",
													file: "Definitions/serverSide/gotodef_server_02.js",
													line: 2
												}
											  ]
								},
						}
			};	

var testCase = {
	name: "Goto definition tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);

