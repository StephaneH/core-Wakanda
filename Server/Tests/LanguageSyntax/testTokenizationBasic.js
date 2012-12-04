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
				type: "Tokenization",
				list: {
						testWhitespace : {
										source: " ",
										tokens: ["whitespace"]
							 		 },
						testWhitespace2 : {
										source: "	",
										tokens: ["whitespace"]
							 		 },
						testNumber1 : {
										source: "123.",
										tokens: ["number"]
							 		 },
						testNumber2 : {
										source: "123.0005",
										tokens: ["number"]
							 		 },
						testNumber3 : {
										source: "1123.0e12",
										tokens: ["number"]
							 		 },
						testNumber4 : {
										source: "121.012e-35",
										tokens: ["number"]
							 		 },
						testNumber5 : {
										source: "1121212.0e+11",
										tokens: ["number"]
							 		 },
						testNumber6 : {
										source: ".213231",
										tokens: ["number"]
							 		 },
						testNumber7 : {
										source: ".1e155",
										tokens: ["number"]
							 		 },
						testNumber8 : {
										source: ".1333e+13",
										tokens: ["number"]
							 		 },
						testNumber9 : {
										source: ".1e-1",
										tokens: ["number"]
							 		 },
						testNumber10 : {
										source: "112323",
										tokens: ["number"]
							 		 },
						testNumber11 : {
										source: "112e13",
										tokens: ["number"]
							 		 },
						testNumber12 : {
										source: "1231e+11",
										tokens: ["number"]
							 		 },
						testNumber13 : {
										source: "31e-13",
										tokens: ["number"]
							 		 },
						testNumber14 : {
										source: "0x123abc",
										tokens: ["number"]
							 		 },
						testNumber15 : {
										source: "0X456DEF",
										tokens: ["number"]
							 		 },
						testNumber16 : {
										source: "000",
										tokens: ["invalid","invalid","number"]
							 		 },
						testNumber17 : {
										source: ".",
										tokens: ["punctuation"]
							 		 },
						testNumber18 : {
										source: "3in",
										tokens: ["number"]
							 		 },
						testPunctuation : {
										source: ";+-*/%",
										tokens: ["punctuation","punctuation","punctuation","punctuation","punctuation","punctuation"]
							 		 },
						
						testComparaison1 : {
										source: "==",
										tokens: ["comparaison"]
							 		 },
						testComparaison2 : {
										source: "!=",
										tokens: ["comparaison"]
							 		 },
						testComparaison3 : {
										source: ">=",
										tokens: ["comparaison"]
							 		 },
						testComparaison4 : {
										source: "<=",
										tokens: ["comparaison"]
							 		 },			 
						testComparaison5 : {
										source: "===",
										tokens: ["comparaison"]
							 		 },
						testComparaison6 : {
										source: "!==",
										tokens: ["comparaison"]
							 		 },
						testIdentifier1 : {
										source: "legalIdent",
										tokens: ["name"]
							 		 },
						testIdentifier2 : {
										source: "_legalIdent",
										tokens: ["name"]
							 		 },
						testIdentifier3 : {
										source: "$legalIdent",
										tokens: ["name"]
							 		 },
						testIdentifier4 : {
										source: "3illegalIdent",
										tokens: ["invalid"]
							 		 },
						testIdentifier4 : {
										source: "illegal-identifier",
										tokens: ["name","punctuation","name"]
							 		 },
						testString1 : {
										source: "\"foo\"",
										tokens: ["string"]
							 		 },
						testString2 : {
										source: "'bar'",
										tokens: ["string"]
							 		 },
						testString3 : {
										source: "\"test that should work \\\ntiti\"",
										tokens: ["string"]
							 		 },
						testString4 : {
										source: "\"This\nis \\u0061 \\x74est.\tHow \\'well\\' does it work?\"",
										tokens: ["string"]
							 		 },
						testString5 : {
										source: "\"test that should not work",
										tokens: []
							 		 },
						testString6 : {
										source: "'test that should not work",
										tokens: []
							 		 },
						testString7 : {
										source: "'test that should not work\"",
										tokens: []
							 		 },
						testString8 : {
										source: "\"test that should not work'",
										tokens: []
							 		 },
						testString9 : {
										source: "\"test that should work \\",
										tokens: ["open_string"]
							 		 },
						testString10 : {
										source: "\"test that should work \\on two lines\\",
										tokens: ["open_string"]
							 		 },
									 
						 testComment1 : {
										source: "/* This is a comment and it should work in theory*/",
										tokens: ["comment"]
							 		 },
						testComment2 : {
										source: "// This is a single line comment and should work",
										tokens: ["comment"]
							 		 },
						testComment3 : {
										source: "/* This is an open comment that's not terminated",
										tokens: ["open_comment"]
							 		 },
						testComment4 : {
										source: "/* This is an open comment that's not terminated\nthis is the termination of the previous comment.*/",
										tokens: ["comment"]
							 		 },
						testComment5 : {
										source: "// This is a single line comment also, but\n// it is followed by a second single-line comment.",
										tokens: ["comment", "comment"]
							 		 },
						 testComment5 : {
										source: "// This is a single line comment also, but\n// it is followed by a second single-line comment.",
										tokens: ["comment", "comment"]
							 		 },
						 testKeyword : {
										source: "break",
										tokens: ["javascript_keyword"]
							 		 },
						 testFutureKeyword : {
										source: "abstract",
										tokens: ["javascript_future_reserved_keyword"]
							 		 },
						  testComplex1 : {
										source: "var foo;",
										tokens: ["javascript_keyword", "whitespace", "name", "punctuation"]
							 		 },
						 testComplex2 : {
										source: "function foo( i, j )",
										tokens: ["javascript_keyword", "whitespace", "name", "punctuation", "whitespace", "name", "punctuation", "whitespace", "name", "whitespace", "punctuation"]
							 		 },
						 testComplex3 : {
										source: "if (1.0e-12 + 14 === 'some string' && functionCall()) { var j++; }",
										tokens: ["javascript_keyword", "whitespace","punctuation","number","whitespace","punctuation","whitespace","number","whitespace","comparaison","whitespace","string","whitespace","punctuation","whitespace","name","punctuation","punctuation","punctuation","whitespace","punctuation","whitespace","javascript_keyword","whitespace","name","punctuation","punctuation","whitespace","punctuation"]
							 		 },
						}
			};	

var testCase = {
	name: "Basic tokenization tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);