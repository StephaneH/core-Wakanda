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
 * The assert module provides functions that throw AssertionError's when 
 * particular conditions are not met. 
 *
 * <pre name="code" class="js">
 * var assert = require("assert");
 * </pre>
 *
 * <p><a href="http://wiki.commonjs.org/wiki/Unit_Testing/1.0#Assert">CommonJS Assert reference</a></p>
 *
 * @module assert
 */


/**
 * <p>At present only the three keys mentioned bellow (message, actual, &amp; 
 * expected) are used and understood by the CommonJS spec.</p>
 *
 * <pre name="code" class="js">
 * new assert.AssertionError({message: message, actual: actual, expected: expected})
 * assert.AssertionError instanceof Error
 * </pre>
 *
 * <p><a href="http://wiki.commonjs.org/wiki/Unit_Testing/1.0#Assert">CommonJS Assert reference</a></p>
 *
 * @class AssertionError
 * @extends Error
 *
 * @constructor
 * @param {Object} params
 */
exports.AssertionError = function AssertionError(params) {
    
    this.name = "AssertionError";

    if (typeof params === "string") {
        this.message = params;
        return this;
    }

    this.message = params.message;
    this.actual = params.actual;
    this.expected = params.expected;

};
exports.AssertionError.prototype = new Error();
//AssertionError.prototype = Object.create(Error.prototype);



/**
 * <p>The assert module provides functions that throw AssertionError's when 
 * particular conditions are not met.</p>
 *
 * <pre name="code" class="js">
 * var assert = require("assert");
 * </pre>
 *
 * <p>All of the following functions must throw an AssertionError when a 
 * corresponding condition is not met, with a message that may be undefined if 
 * not provided. All assertion methods provide both the actual and expected 
 * values to the assertion error for display purposes. /p>
 *
 * <p><a href="http://wiki.commonjs.org/wiki/Unit_Testing/1.0#Assert">CommonJS Assert reference</a></p>
 *
 * @class Assert
 */
assert = exports;

/**
 * <p>Pure assertion tests whether a value is truthy, as determined by <code>!!guard</code>.</p>
 *
 * <pre name="code" class="js">
 * assert.ok(guard, message_opt);
 * </pre>
 *
 * <p>This statement is equivalent to <code>assert.equal(guard, true, message_opt);</code>. 
 * To test strictly for the value true, use <code>assert.strictEqual(guard, true, message_opt);</code>.</p>
 *
 * @static
 * @method ok
 * @throw AssertionError
 * @param {Boolean} guard
 * @param {String} message_opt
 */
assert.ok = function ok(guard, message_opt) {
    if (!!guard) {
        return;
    }
    // assertion failed
    throw new AssertionError(
        {
            "actual": guard,
            "expected": true,
            "message": message
        }
    );
};


/**
 * <p>The equality assertion tests shallow, coercive equality with <code>==</code>. </p>
 *
 * <pre name="code" class="js">
 * assert.equal(actual, expected, message_opt);
 * </pre>
 *
 * @static
 * @method equal
 * @throw AssertionError
 * @param {String|Number|Boolean|Array|Object|null|undefined} actual
 * @param {String|Number|Boolean|Array|Object|null|undefined} expected
 * @param {String} message_opt
 */
assert.equal = function equal(actual, expected, message_opt) {
    if (actual == expected) {
        return;
    }
    // assertion failed
    throw new AssertionError(
        {
            "actual": actual,
            "expected": expected,
            "message": message_opt
        }
    );
};


/**
 * <p>The non-equality assertion tests for whether two objects are not equal with <code>!=</code>. </p>
 *
 * <pre name="code" class="js">
 * assert.notEqual(actual, expected, message_opt);
 * </pre>
 *
 * @static
 * @method notEqual
 * @throw AssertionError
 * @param {String|Number|Boolean|Array|Object|null|undefined} actual
 * @param {String|Number|Boolean|Array|Object|null|undefined} expected
 * @param {String} message_opt
 */
assert.notEqual = function (actual, expected, message_opt) {
    if (actual == expected) {
        return;
    }
    // assertion failed
    throw new AssertionError(
        {
            "actual": actual,
            "expected": expected,
            "message": message_opt
        }
    );
};


/**
 * <p>The equivalence assertion tests a deep equality relation:</p>
 *
 * <ol>
 *   <li>All identical values are equivalent, as determined by <code>===</code>.</li>
 *   <li>If the expected value is a <code>Date</code> object, the actual value is equivalent if it is also a <code>Date</code> object that refers to the same time.</li>
 *   <li>Other pairs that do not both pass <code>typeof value == "object"</code>, equivalence is determined by <code>==</code>.</li>
 *   <li>For all other <code>Object</code> pairs, including <code>Array</code> objects, equivalence is determined by having the same number of owned properties (as verified with <code>Object.prototype.hasOwnProperty.call</code>), the same set of keys (although not necessarily the same order), equivalent values for every corresponding key, and an identical "<code>prototype</code>" property.<br>
 *      Note: this accounts for both named and indexed properties on Arrays. </li>
 * </ol>
 *
 * <pre name="code" class="js">
 * assert.deepEqual(actual, expected, message_opt);
 * </pre>
 *
 * @static
 * @method deepEqual
 * @throw AssertionError
 * @param {String|Number|Boolean|Array|Object|null|undefined} actual
 * @param {String|Number|Boolean|Array|Object|null|undefined} expected
 * @param {String} message_opt
 */
assert.deepEqual = function (actual, expected, message_opt) {
    var 
        actualOwnProperties,
        expectedOwnProperties,
        test;
        
    if (actual === expected) {
        return;
    }
    // same date
    if ((actual instanceof Date) && (expected instanceof Date)) {
        if (actual.getTime() === expected.getTime()) {
            return;
        }
    }
    // same object (even if different reference)
    if ((typeof actual != 'object') && (typeof expected != 'object')) {
        if (actual == expected) {
            return;
        }
    }
    // same prototype
    if (actual.prototype === expected.prototype) {
        // get own properties
        actualOwnProperties = Object.getOwnPropertyNames(actual);
        expectedOwnProperties = Object.getOwnPropertyNames(expected);
        // compare them
        if (actualOwnProperties.length === expectedOwnProperties.length) {
            test = actualOwnProperties.every(
                function (property) {
                    if (actual[property].prototype !== expected[property].prototype) {
                        return false;
                    }
                    if (actual[property] != expected[property]) {
                        return false;
                    }
                }
            );
            if (test) {
                return;
            }
        }
        // TODO COMPARE ARRAY LENGTH AND ITEMS
    }
    // assertion failed
    throw new AssertionError(
        {
            "actual": actual,
            "expected": expected,
            "message": message_opt
        }
    );

};


/**
 * <p>The non-equivalence assertion tests for any deep inequality.</p>
 *
 * <pre name="code" class="js">
 * assert.notDeepEqual(actual, expected, message_opt);
 * </pre>
 *
 * @static
 * @method notDeepEqual
 * @throw AssertionError
 * @param {String|Number|Boolean|Array|Object|null|undefined} actual
 * @param {String|Number|Boolean|Array|Object|null|undefined} expected
 * @param {String} message_opt
 */
assert.notDeepEqual = function (actual, expected, message_opt) {
    try {
        assert.deepEqual(actual, expected, message_opt);
    } catch (e) {
        return;
    }
    // assertion failed
    throw new AssertionError(
        {
            "actual": actual,
            "expected": expected,
            "message": message_opt
        }
    );
};


/**
 * <p>The strict equality assertion tests strict equality, as determined by <code>===</code>.</p>
 *
 * <pre name="code" class="js">
 * assert.strictEqual(actual, expected, message_opt);
 * </pre>
 *
 * @static
 * @method strictEqual
 * @throw AssertionError
 * @param {String|Number|Boolean|Array|Object|null|undefined} actual
 * @param {String|Number|Boolean|Array|Object|null|undefined} expected
 * @param {String} message_opt
 */
assert.strictEqual = function (actual, expected, message_opt) {
    if (actual === expected) {
        return;
    }
    // assertion failed
    throw new AssertionError(
        {
            "actual": actual,
            "expected": expected,
            "message": message_opt
        }
    );
};


/**
 * <p>The strict non-equality assertion tests for strict inequality, as determined by <code>!==</code>.</p>
 *
 * <pre name="code" class="js">
 * assert.notStrictEqual(actual, expected, message_opt);
 * </pre>
 *
 * @static
 * @method notStrictEqual
 * @throw AssertionError
 * @param {String|Number|Boolean|Array|Object|null|undefined} actual
 * @param {String|Number|Boolean|Array|Object|null|undefined} expected
 * @param {String} message_opt
 */
assert.notStrictEqual = function (actual, expected, message_opt) {
    if (actual !== expected) {
        return;
    }
    // assertion failed
    throw new AssertionError(
        {
            "actual": actual,
            "expected": expected,
            "message": message_opt
        }
    );
};


/**
 * <p>Expected to throw an error</p>
 *
 * <p><em>NOT IMPLEMENTED</em></p>
 *
 * <pre name="code" class="js">
 * assert.throws(block, Error_opt, message_opt);
 * </pre>
 *
 * @private
 * @static
 * @method throws
 * @throw AssertionError
 * @param {Function} block
 * @param {Object} Error_opt
 * @param {String} message_opt
 */
assert["throws"] = function (block, Error_opt, message_opt) {
    // TODO
    try {
        switch (typeof block) {
        case "function":
            block();
            break;
        case "string":
            eval(block);
            break;
        default:
        }
    } catch (e) {
        var ok;
        ok = Object.keys(Error_opt).every(
            function (key) {
                return (e[key] === Error_opt[key]);
            }
        );
        if (ok) {
            return;
        }
    }
    
    // assertion failed
    throw new AssertionError(
        {
            "block": block,
            "Error_opt": Error_opt,
            "message": message_opt
        }
    );
};