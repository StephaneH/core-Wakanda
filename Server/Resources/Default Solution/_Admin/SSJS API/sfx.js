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
/**
 * The Squirrelfish Extreme provided interface
 * @module SFX
 * @see http://www.ecma-international.org/publications/standards/Ecma-262.htm
 */

/**
 * The main Object class
 *
 * @class Object
 * @constructor
 * @param {Object} value
 */
function Object( value ) {}

Object.prototype = {

    /**
     * The constructor of the Object class
     *
     * @property constructor
     * @type Function
     * @default Object
     */
    constructor: Object,

    /**
     * Return the String value that is the result of concatenating the three
     * Strings "[object ", class, and "]".
     *
     * @method toString
     * @return {String}
     */
    toString: function () {},

    /**
     * This function is provided to give all Objects a generic toLocaleString
     * interface, even though not all may use it.
     * Currently, Array, Number, and Date provide their own locale-sensitive
     * toLocaleString methods.
     *
     * @method toLocaleString
     * @return {String}
     */
    toLocaleString: function () {},

    /**
     * Return either O or another value such as the host object originally
     * passed to the constructor.
     * The specific result that is returned is implementation-defined. 
     *
     * @method valueOf
     * @return {String}
     */
    valueOf: function () {},

    /**
     * Returns a boolean indicating whether the object has the specified property.
     *
     * Every object descended from Object inherits the hasOwnProperty  method.
     * This method can be used to determine whether an object has the specified
     * property as a direct property of that object; unlike the in  operator,
     * this method does not check down the object's prototype chain.
     *
     * @method hasOwnProperty
     * @param {String} propertyName Required. The name of the property to test.
     */
    hasOwnProperty: function( propertyName ) {},

    /**
     * Tests for an object in another object's prototype chain.
     *
     * isPrototypeOf allows you to check whether or not an object exists within
     * another object's prototype chain.
     *
     * @method isPrototypeOf
     * @param {Object} object Required. The object whose prototype chain will
     * be searched
     */
    isPrototypeOf: function( object ) {},

    /**
     * Returns a boolean indicating whether the specified property is enumerable.
     *
     * Every object has a propertyIsEnumerable method. This method can determine
     * whether the specified property in an object can be enumerated by a
     * for...in  loop, with the exception of properties inherited through the
     * prototype chain. If the object does not have the specified property,
     * this method returns false.
     *
     * @method propertyIsEnumerable
     * @param {String} prop Required. The name of the property to test.
     * be searched
     * @return {Boolean}
     */
    propertyIsEnumerable: function( prop ) {}
};


/**
 * The Function class
 *
 * The last argument specifies the body (executable code) of a function;
 * any preceding arguments specify formal parameters.
 *
 * @class Function
 * @extends Object
 * @constructor
 * @param {String}* [param]
 * @param {String} [body]
 */
function Function ( param, body ) {
    
    /**
     * Number of named arguments declared for the function
     * 
     * @property length
     * @type Number
     */
    this.length = arguments.length - 1;
}

/**
 * The prototype of the Function class
 * 
 * @property prototype
 * @static
 * @type Object
 */
Function.prototype = new Object();

/**
 * The constructor of the Function class
 *
 * @property constructor
 * @type Function
 * @default Function
 */
Function.prototype.constructor = Function;

/**
 * This is a data property with a value of 1.
 *
 * @property length
 * @static
 * @type Number
 * @default 1
 */
Function.length = 1;

/**
 * An implementation-dependent representation of the function is returned.
 * This representation has the syntax of a FunctionDeclaration.
 * Note in particular that the use and placement of white space,
 * line terminators, and semicolons within the representation String is
 * implementation-dependent. 
 *
 * @method toString
 * @return {String}
 */
Function.prototype.toString = Function;






/**
 * The String class
 *
 * @class String
 * @extends Object
 * @constructor
 * @param value
 */
function String( value ) {

    this.constructor = String;

    this.length = 0;
}

/**
 * Get the character at the specified position in the string
 *
 * @method charAt
 * @param {Number} pos Required. The position of the character
 * @return {String}
 */
String.prototype.charAt = function ( pos ) {};

/**
 * Get the code of the character which is at the specified position in the string
 *
 * @method charCodeAt
 * @param {Number} pos Required. The position of the character
 * @return {Number}
 */
String.prototype.charCodeAt = function ( pos ) {};


/**
 * Concat
 *
 * @method concat
 * @param {String}* string1 Required. The position of the character
 * @return {String}
 */
String.prototype.concat = function ( string1 ) {};

/**
 * indexOf
 *
 * @method indexOf
 * @param {String} searchString Required. The searched string 
 * @param {Number} [position] The position from which the search starts
 * @return {Number}
 */
String.prototype.indexOf = function ( searchString, position ) {};

/**
 * lastIndexOf
 *
 * @method lastIndexOf
 * @param {String} searchString Required. The searched string
 * @param {Number} [position] The position from which the search starts
 * @return {Number}
 */
String.prototype.lastIndexOf = function ( searchString, position ) {};

/**
 * localeCompare
 *
 * @method localeCompare
 * @param {String} that Required. The searched string 
 * @return {Number}
 */
String.prototype.localeCompare = function ( that ) {};

/**
 * match
 *
 * @method match
 * @param {String | RegEx} regexp Required. The pattern
 * @return {Array}
 */
String.prototype.match = function ( regexp ) {};

/**
 * replace
 *
 * @method replace
 * @param {String} searchValue Required. The pattern
 * @param {String} replaceValue Required. The pattern
 * @return {String}
 */
String.prototype.replace = function ( searchValue, replaceValue ) {};

/**
 * search
 *
 * @method search
 * @param {String | RegEx} regexp Required. The pattern
 * @return {Array}
 */
String.prototype.search = function ( regexp ) {};

/**
 * slice
 *
 * @method slice
 * @param {Number} start Required.
 * @param {Number} end Required.
 * @return {String}
 */
String.prototype.slice = function ( start, end ) {};

/**
 * split
 *
 * @method split
 * @param {String} separator Required.
 * @param {Number} limit Required.
 * @return {Array}
 */
String.prototype.split = function ( separator, limit ) {};

/**
 * substr
 *
 * @method substr
 * @param {Number} start Required.
 * @param {Number} [end]
 * @return {Array}
 */
String.prototype.substr = function ( start, end ) {};

/**
 * toLowerCase
 *
 * @method toLowerCase
 * @return {String}
 */
String.prototype.toLowerCase = function () {};

/**
 * toLocaleLowerCase
 *
 * @method toLocaleLowerCase
 * @return {String}
 */
String.prototype.toLocaleLowerCase = function () {};

/**
 * toUpperCase
 *
 * @method toUpperCase
 * @return {String}
 */
String.prototype.toUpperCase = function () {};

/**
 * toLocaleUpperCase
 *
 * @method toLocaleUpperCase
 * @return {String}
 */
String.prototype.toLocaleUpperCase = function () {};


/**
 * The Boolean object is an object wrapper for a boolean value.
 *
 * @class Boolean
 * @extends Object
 * @constructor
 * @param {Object} [value]
 * @return {Boolean}
 */
function Boolean( value ) {}
Boolean.prototype = new Object();
Boolean.prototype.constructor = Boolean;


/**
 * The Number class
 *
 * @class Number
 * @extends Object
 * @constructor
 * @param {Object} value
 * @return {Number}
 */
function Number( value ) {}
Number.prototype = new Object();
Number.prototype.constructor = Number;

/**
 * toFixed
 *
 * @method toFixed
 * @param {Number} fractionDigits
 * @return {Number}
 */
Number.prototype.toFixed = function ( fractionDigits ) {};

/**
 * toExponential
 *
 * @method toExponential
 * @param {Number} fractionDigits
 * @return {Number}
 */
Number.prototype.toExponential = function ( fractionDigits ) {};

/**
 * toPrecision
 *
 * @method toPrecision
 * @param {Number} precision
 * @return {Number}
 */
Number.prototype.toPrecision = function ( precision ) {};

/**
 * MAX_VALUE
 *
 * @property MAX_VALUE
 * @static
 * @type Number
 */
Number.MAX_VALUE = 0;

/**
 * MIN_VALUE
 *
 * @property MIN_VALUE
 * @static
 * @type Number
 */
Number.MIN_VALUE = 0;

/**
 * NaN
 *
 * @property NaN
 * @static
 * @type Number
 */
Number.NaN = 0;

/**
 * NEGATIVE_INFINITY
 *
 * @property NEGATIVE_INFINITY
 * @static
 * @type Number
 */
Number.NEGATIVE_INFINITY = 0;

/**
 * POSITIVE_INFINITY
 *
 * @property POSITIVE_INFINITY
 * @static
 * @type Number
 */
Number.POSITIVE_INFINITY = 0;



/**
 * The Date class
 *
 * @class Date
 * @extends Object
 */
function Date( year, month, date, hour, minutes, seconds, ms ) {}
Date.prototype = new Object();
Date.prototype.constructor = Date;

/**
 * toString
 *
 * @method toString
 * @return {String}
 */
Date.prototype.toString = function () {};

/**
 * toDateString
 *
 * @method toDateString
 * @return {String}
 */
Date.prototype.toDateString = function () {};

/**
 * toTimeString
 *
 * @method toTimeString
 * @return {String}
 */
Date.prototype.toTimeString = function () {};

/**
 * toLocaleString
 *
 * @method toLocaleString
 * @return {String}
 */
Date.prototype.toLocaleString = function () {};

/**
 * toLocaleDateString
 *
 * @method toLocaleDateString
 * @return {String}
 */
Date.prototype.toLocaleDateString = function () {};

/**
 * toLocaleTimeString
 *
 * @method toLocaleTimeString
 * @return {String}
 */
Date.prototype.toLocaleTimeString = function () {};

/**
 * getFullYear
 *
 * @method getFullYear
 * @return {Number}
 */
Date.prototype.getFullYear = function () {}

/**
 * getUTCFullYear
 *
 * @method getUTCFullYear
 * @return {Number}
 */
Date.prototype.getUTCFullYear = function () {}

/**
 * getMonth
 *
 * @method getMonth
 * @return {Number}
 */
Date.prototype.getMonth = function () {}

/**
 * getUTCMonth
 *
 * @method getUTCMonth
 * @return {Number}
 */
Date.prototype.getUTCMonth = function () {}

/**
 * getDate
 *
 * @method getDate
 * @return {Number}
 */
Date.prototype.getDate = function () {}

/**
 * getUTCDate
 *
 * @method getUTCDate
 * @return {Number}
 */
Date.prototype.getUTCDate = function () {}

/**
 * getDay
 *
 * @method getDay
 * @return {Number}
 */
Date.prototype.getDay = function () {}

/**
 * getUTCDay
 *
 * @method getUTCDay
 * @return {Number}
 */
Date.prototype.getUTCDay = function () {}

/**
 * getHours
 *
 * @method getHours
 * @return {Number}
 */
Date.prototype.getHours = function () {}

/**
 * getUTCHours
 *
 * @method getUTCHours
 * @return {Number}
 */
Date.prototype.getUTCHours = function () {}

/**
 * getMinutes
 *
 * @method getMinutes
 * @return {Number}
 */
Date.prototype.getMinutes = function () {}

/**
 * getUTCMinutes
 *
 * @method getUTCMinutes
 * @return {Number}
 */
Date.prototype.getUTCMinutes = function () {}

/**
 * getSeconds
 *
 * @method getSeconds
 * @return {Number}
 */
Date.prototype.getSeconds = function () {}

/**
 * getUTCSeconds
 *
 * @method getUTCSeconds
 * @return {Number}
 */
Date.prototype.getUTCSeconds = function () {}

/**
 * getMilliseconds
 *
 * @method getMilliseconds
 * @return {Number}
 */
Date.prototype.getMilliseconds = function () {}

/**
 * getUTCMilliseconds
 *
 * @method getUTCMilliseconds
 * @return {Number}
 */
Date.prototype.getUTCMilliseconds = function () {}

/**
 * getTimezoneOffset
 *
 * @method getTimezoneOffset
 * @return {Number}
 */
Date.prototype.getTimezoneOffset = function () {}

/**
 * setTime
 *
 * @method setTime
 * @param {Number} time
 */
Date.prototype.setTime = function ( time ) {}

/**
 * setMilliseconds
 *
 * @method setMilliseconds
 * @param {Number} ms
 */
Date.prototype.setMilliseconds = function ( ms ) {}

/**
 * setUTCMilliseconds
 *
 * @method setUTCMilliseconds
 * @param {Number} ms
 */
Date.prototype.setUTCMilliseconds = function ( ms ) {}

/**
 * setSeconds
 *
 * @method setSeconds
 * @param {Number} sec
 * @param {Number} ms
 */
Date.prototype.setSeconds = function ( sec, ms ) {}

/**
 * setUTCSeconds
 *
 * @method setUTCSeconds
 * @param {Number} sec
 * @param {Number} ms
 */
Date.prototype.setUTCSeconds = function ( sec, ms ) {}

/**
 * setMinutes
 *
 * @method setMinutes
 * @param {Number} min
 * @param {Number} sec
 * @param {Number} ms
 */
Date.prototype.setMinutes = function ( min, sec, ms ) {}

/**
 * setUTCMinutes
 *
 * @method setUTCMinutes
 * @param {Number} min
 * @param {Number} sec
 * @param {Number} ms
 */
Date.prototype.setUTCMinutes = function ( min, sec, ms ) {}

/**
 * setHours
 *
 * @method setHours
 * @param {Number} hour
 * @param {Number} min
 * @param {Number} sec
 * @param {Number} ms
 */
Date.prototype.setHours = function ( hour, min, sec, ms ) {}

/**
 * setUTCHours
 *
 * @method setUTCHours
 * @param {Number} hour
 * @param {Number} min
 * @param {Number} sec
 * @param {Number} ms
 */
Date.prototype.setUTCHours = function ( hour, min, sec, ms ) {}

/**
 * setDate
 *
 * @method setDate
 * @param {Number} date
 */
Date.prototype.setDate = function ( date ) {}

/**
 * setUTCDate
 *
 * @method setUTCDate
 * @param {Number} date
 */
Date.prototype.setUTCDate = function ( date ) {}

/**
 * setMonth
 *
 * @method setMonth
 * @param {Number} month
 * @param {Number} date
 */
Date.prototype.setMonth = function ( month, date ) {}

/**
 * setUTCMonth
 *
 * @method setUTCMonth
 * @param {Number} month
 * @param {Number} date
 */
Date.prototype.setUTCMonth = function ( month, date ) {}

/**
 * setFullYear
 *
 * @method setFullYear
 * @param {Number} year
 * @param {Number} month
 * @param {Number} date
 */
Date.prototype.setFullYear = function ( year, month, date ) {}

/**
 * setUTCFullYear
 *
 * @method setUTCFullYear
 * @param {Number} year
 * @param {Number} month
 * @param {Number} date
 */
Date.prototype.setUTCFullYear = function ( year, month, date ) {}

/**
 * toUTCString
 *
 * @method toUTCString
 * @return {String}
 */
Date.prototype.toUTCString = function () {}

/**
 * parse
 *
 * @method parse
 * @static
 * @param {String} string Required.
 * @return {Date}
 */
Date.parse = function ( string ) {}

/**
 * UTC
 *
 * @method UTC
 * @static
 * @param {Number} year Required.
 * @param {Number} [month]
 * @param {Number} [date]
 * @param {Number} [hours]
 * @param {Number} [minutes]
 * @param {Number} [seconds]
 * @param {Number} [ms]
 * @return {Date}
 */
Date.UTC = function ( year, month, date, hours, minutes, seconds, ms ) {}


/**
 * The RegExp class
 *
 * @class RegExp
 * @extends Object
 * @constructor
 * @param {String} pattern
 * @param {String} flags
 */
function RegExp( pattern, flags ) {

    /**
     * source
     *
     * @property source
     * @type String
     */
    this.source = "";

    /**
     * global
     *
     * @property global
     * @type Boolean
     */
    this.global = false;

    /**
     * ignoreCase
     *
     * @property ignoreCase
     * @type Boolean
     */
    this.ignoreCase = false;

    /**
     * multiline
     *
     * @property multiline
     * @type Boolean
     */
    this.multiline = false;

    /**
     * lastIndex
     *
     * @property lastIndex
     * @type Boolean
     */
    this.lastIndex = 0;
}
RegExp.prototype = new Object();
RegExp.prototype.constructor = RexExp;

/**
 * exec
 * 
 * @method exec
 * @param {String} string
 * @return {Boolean}
 */
RegExp.prototype.exec = function ( string ) {};

/**
 * test
 *
 * @method test
 * @param {String} string
 * @return {Boolean}
 */
RegExp.prototype.test = function ( string ) {};





/**
 * Math
 *
 * @class Math
 * @extends Object
 */
Math = {

    /**
     * E (2.718281828459045)
     *
     * @property E
     * @type {Number}
     */
    E : 2.718281828459045,

    /**
     * LN10 (2.302585092994046)
     *
     * @property LN10
     * @type {Number}
     */
    LN10 : 2.302585092994046,

    /**
     * LN2 (0.6931471805599453)
     *
     * @property LN2
     * @type {Number}
     */
    LN2 : 0.6931471805599453,

    /**
     * LOG2E (1.4426950408889634)
     *
     * @property LOG2E
     * @type {Number}
     */
    LOG2E : 1.4426950408889634,

    /**
     * LOG10E (0.4342944819032518)
     *
     * @property LOG10E
     * @type {Number}
     */
    LOG10E : 0.4342944819032518,

    /**
     * PI (3.141592653589793)
     *
     * @property PI
     * @type {Number}
     */
    PI : 3.141592653589793,

    /**
     * SQRT1_2 (0.7071067811865476)
     *
     * @property SQRT1_2
     * @type {Number}
     */
    SQRT1_2 : 0.7071067811865476,

    /**
     * SQRT2 (1.4142135623730951)
     *
     * @property SQRT2
     * @type {Number}
     */
    SQRT2 : 1.4142135623730951,

    /**
     * abs
     *
     * @method abs
     * @param {Number} x Required.
     * @return {Number}
     */
    abs : function( x ) {},

    /**
     * acos
     *
     * @method acos
     * @param {Number} x Required.
     * @return {Number}
     */
    acos : function( x ) {},

    /**
     * asin
     *
     * @method asin
     * @param {Number} x Required.
     * @return {Number}
     */
    asin : function( x ) {},

    /**
     * atan
     *
     * @method atan
     * @param {Number} x Required.
     * @return {Number}
     */
    atan : function( x ) {},

    /**
     * atan2
     *
     * @method atan2
     * @param {Number} x Required.
     * @return {Number}
     */
    atan2 : function( x ) {},

    /**
     * ceil
     *
     * @method ceil
     * @param {Number} x Required.
     * @return {Number}
     */
    ceil : function( x ) {},

    /**
     * cos
     *
     * @method cos
     * @param {Number} x Required.
     * @return {Number}
     */
    cos : function( x ) {},

    /**
     * exp
     *
     * @method exp
     * @param {Number} x Required.
     * @return {Number}
     */
    exp : function( x ) {},

    /**
     * floor
     *
     * @method floor
     * @param {Number} x Required.
     * @return {Number}
     */
    floor : function( x ) {},

    /**
     * log
     *
     * @method log
     * @param {Number} x Required.
     * @return {Number}
     */
    log : function( x ) {},

    /**
     * max
     *
     * @method max
     * @param {Number} x Required.
     * @return {Number}
     */
    max : function( x ) {},

    /**
     * min
     *
     * @method min
     * @param {Number} x Required.
     * @return {Number}
     */
    min : function( x ) {},

    /**
     * pow
     *
     * @method pow
     * @param {Number} x Required.
     * @param {Number} y Required.
     * @return {Number}
     */
    pow : function( x, y ) {},

    /**
     * random
     *
     * @method random
     * @return {Number}
     */
    random : function() {},

    /**
     * round
     *
     * @method round
     * @param {Number} x Required.
     * @return {Number}
     */
    round : function( x ) {},

    /**
     * sin
     *
     * @method sin
     * @param {Number} x Required.
     * @return {Number}
     */
    sin : function( x ) {},

    /**
     * sqrt
     *
     * @method sqrt
     * @param {Number} x Required.
     * @return {Number}
     */
    sqrt : function( x ) {},

    /**
     * tan
     *
     * @method tan
     * @param {Number} x Required.
     * @return {Number}
     */
    tan : function( x ) {}
}





/**
 * JSON
 *
 * @class JSON
 * @extends Object
 */
JSON = {

    /**
     * Convert a JSON string into a JavaScript object
     *
     * @method parse
     * @param {String} string Required.
     * @return {Object}
     */
    parse: function (string) {},

    /**
     * Convert a JSON string into a JavaScript object
     *
     * @method stringify
     * @param {Object} object Required.
     * @return {String}
     */
    stringify: function (object) {}
}





/**
 * The Error class
 * 
 * @class Error
 * @extends Object
 */
function Error( message ) {}
Error.prototype = new Object();
Error.prototype.constructor = Error;

/**
 * name
 *
 * @property name
 * @default 'Error'
 * @type String
 */
Error.prototype.name = 'Error';

/**
 * message
 *
 * @property message
 * @default ''
 * @type String
 */
Error.prototype.message = '';


/**
 * The EvalError class
 *
 * @class EvalError
 * @extends Error
 */
function EvalError () {}
EvalError.prototype = new Error();
EvalError.prototype.constructor = EvalError;

/**
 * name
 *
 * @property name
 * @default 'EvalError'
 * @type String
 */
EvalError.prototype.name = 'EvalError';



/**
 * The RangeError class
 *
 * @class RangeError
 * @extends Error
 */
function RangeError () {}
RangeError.prototype = new Error();
RangeError.prototype.constructor = RangeError;

/**
 * name
 *
 * @property name
 * @default 'EvalError'
 * @type String
 */
RangeError.prototype.name = 'RangeError';




/**
 * The ReferenceError class
 *
 * @class ReferenceError
 * @extends Error
 */
function ReferenceError () {}
ReferenceError.prototype = new Error();
ReferenceError.prototype.constructor = ReferenceError;

/**
 * name
 *
 * @property name
 * @default 'ReferenceError'
 * @type String
 */
ReferenceError.prototype.name = 'ReferenceError';




/**
 * The SyntaxError class
 *
 * @class SyntaxError
 * @extends Error
 */
function SyntaxError () {}
SyntaxError.prototype = new Error();
SyntaxError.prototype.constructor = SyntaxError;

/**
 * name
 *
 * @property name
 * @default 'SyntaxError'
 * @type String
 */
SyntaxError.prototype.name = 'SyntaxError';




/**
 * The TypeError class
 *
 * @class TypeError
 * @extends Error
 */
function TypeError () {}
TypeError.prototype = new Error();
TypeError.prototype.constructor = TypeError;

/**
 * name
 *
 * @property name
 * @default 'TypeError'
 * @type String
 */
TypeError.prototype.name = 'TypeError';



/**
 * The URIError class
 *
 * @class URIError
 * @extends Error
 */
function URIError () {}
URIError.prototype = new Error();
URIError.prototype.constructor = URIError;

/**
 * name
 *
 * @property name
 * @default 'URIError'
 * @type String
 */
URIError.prototype.name = 'URIError';





/**
 * Global class
 *
 * @class Global
 */

/**
 * eval
 *
 * @method eval
 * @param {String} x
 */
function eval( x ) {}

/**
 * parseInt
 *
 * @method parseInt
 * @param {String} string
 * @param {Number} radix
 * @return {Number}
 */
function parseInt( string, radix ) {}

/**
 * parseFloat
 *
 * @method parseFloat
 * @param {String} string
 * @return {Number}
 */
function parseFloat( string ) {}

/**
 * isNaN
 *
 * @method isNaN
 * @param {Number} number
 * @return {Boolean}
 */
function isNaN( number ) {}

/**
 * isFinite
 *
 * @method isFinite
 * @param {Number} number
 * @return {Boolean}
 */
function isFinite( number ) {}

/**
 * decodeURI
 *
 * @method decodeURI
 * @param {String} encodedURI
 * @return {String}
 */
function decodeURI( encodedURI ) {}

/**
 * decodeURIComponent
 *
 * @method decodeURIComponent
 * @param {String} encodedURIComponent
 * @return {String}
 */
function decodeURIComponent( encodedURIComponent ) {}

/**
 * encodeURI
 *
 * @method encodeURI
 * @param {String} uri
 * @return {String}
 */
function encodeURI( uri ) {}

/**
 * encodeURIComponent
 *
 * @method encodeURIComponent
 * @param {String} uriComponent
 * @return {String}
 */
function encodeURIComponent( uriComponent ) {}


/**
 * Convert any value into a String
 *
 * @method String
 * @param {Object} value
 * @return {String}
 */
function String( value ) {}


/**
 * Convert any value into a Number
 *
 * @method Number
 * @param {Object} value
 * @return {Number}
 */
function Number( value ) {}


/**
 * Convert any value into a Boolean
 *
 * @method Boolean
 * @param {Object} value
 * @return {Boolean}
 */
function Boolean( value ) {}


/**
 * Convert any value into a Boolean
 *
 * @method Object
 * @param {Object} value
 * @return {Object}
 */
function Object( value ) {}


/**
 * Convert any value into a Boolean
 *
 * @method Function
 * @param {String}* [param]
 * @param {String} [body]
 * @return {Function}
 */
function Function ( param, body ) {}

/**
 * Convert any value into a Boolean.<br>
 * If there is only one argument and this one is a number, this function create
 * an Array with this number of undefined elements
 *
 * @method Array
 * @param {Object}* value
 * @return {Array}
 */
function Array( value ) {}


/**
 * The void unary expression
 *
 * return undefined
 *
 * @class void
 */
this['void'] = function () {}


/**
 * The null value
 *
 * @class null
 */
this['null'] = function () {};

/**
 * The undefined value
 *
 * @class undefined
 */
this['undefined'] = function () {};

/**
 * The true value
 *
 * &lt; Boolean &gt;
 *
 * @class true
 */
this['true'] = function () {};

/**
 * The false value
 *
 * &lt; Boolean &gt;
 *
 * @class false
 */
this['false'] = function () {};

