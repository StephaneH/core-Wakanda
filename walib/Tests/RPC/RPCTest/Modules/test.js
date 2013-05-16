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
exports.addition = function addition (a, b, c) {	return a + b + c;};exports.soustraction = function soustraction (a, b, c) {	return a - b - c;};exports.nop = function nop () {	return 'nop';};exports.mirror = function mirror (string) {	return string.toString().split('').reverse().join('');};exports.oops = function oops () {	throw new Error('Something bad happened :-(');};exports.inType = function inType (obj) {	return typeof obj;};exports.outType = function outType (type) {	switch (type) {		case 'string':			return 'foo';			break;		case 'number':			return 42;			break;		case 'boolean':			return true;			break;		case 'object':			return { foo: 'bar' };			break;		case 'function':			return function foo (bar) { return bar; };			break;		default:			return null;			break;	}};