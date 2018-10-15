/**
 * @param {*} object
 *
 * @return {string}
 */
export function classNameOf(object) {

    return  Object.prototype.toString.call( object ).slice(8, -1);
}


/**
 * @param {*}      object
 * @param {string} key    - Property name
 *
 * @return {?Object} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor#Description
 */
export function getPropertyDescriptor(object, key) {

    var descriptor;  object = Object.create( object );

    while (object = Object.getPrototypeOf( object ))
        if (descriptor = Object.getOwnPropertyDescriptor(object, key))
            return descriptor;
}


/**
 * Equivalent to the integration of Array's map() & filter() methods
 *
 * @param {Iterable}                                           list
 * @param {function(item: *, index: number, list:Iterable): *} filter
 *     - Return `item` itself to reserve, `undefined` or `null` to ignore, or Array to merge in.
 *
 * @return {Array}
 */
export function multipleMap(list, filter) {

    const result = [ ];  filter = (filter instanceof Function)  &&  filter;

    for (let i = 0;  i < list.length;  i++) {

        let item = filter  ?  filter(list[i], i, list)  :  list[i];

        if (item != null)
            if (item instanceof Array)
                result.push(...item);
            else
                result.push( item );
    }

    return result;
}


/**
 * Merge own properties of two or more objects together into the first object
 * by their descriptor
 *
 * @param {Object}    target - An object that will receive the new properties
 *                             if `source` are passed in
 * @param {...Object} source - Additional objects containing properties to merge in
 *                             (Value of `null` or `undefined` will be skipped)
 *
 * @return {Object} The `target` parameter
 */
export function extend(target, ...source) {

    for (let object of source)  if (object instanceof Object) {

        let descriptor = Object.getOwnPropertyDescriptors( object );

        for (let key  of  Object.keys( descriptor ))
            if (
                ('value' in descriptor[key])  &&
                !(descriptor[key].value != null)
            )
                delete descriptor[key];

        if (object instanceof Function) {

            delete descriptor.name;
            delete descriptor.length;
            delete descriptor.prototype;

            let prototype = Object.getOwnPropertyDescriptors( object.prototype );

            delete prototype.constructor;

            Object.defineProperties(target.prototype, prototype);
        }

        Object.defineProperties(target, descriptor);
    }

    return target;
}


var depth = 0;

/**
 * Traverse Object-tree & return Node array through the filter
 *
 * @param {object}        node     - Object tree
 * @param {string}        fork_key - Key of children list
 * @param {MapTreeFilter} filter   - Map filter
 *
 * @return {Array}  Result list of Map filter
 */
export function mapTree(node, fork_key, filter) {

    var children = node[fork_key], list = [ ];    depth++ ;

    for (var i = 0, value;  i < children.length;  i++) {
        /**
         * @typedef {function} MapTreeFilter
         *
         * @param {object} child
         * @param {number} index
         * @param {number} depth
         *
         * @return {?object}  `Null` or `Undefined` to **Skip the Sub-Tree**,
         *                    and Any other Type to Add into the Result Array.
         */
        try {
            value = filter.call(node, children[i], i, depth);

        } catch (error) {

            depth = 0;    throw error;
        }

        if (! (value != null))  continue;

        list.push( value );

        if ((children[i] != null)  &&  (children[i][fork_key] || '')[0])
            list.push.apply(
                list,  mapTree(children[i], fork_key, filter)
            );
    }

    depth-- ;

    return list;
}


/**
 * @param {Function|Object}   target                          - Class or its prototype
 * @param {String}            key                             - Member name
 * @param {Function|Object|*} value                           - `{ set, get }` for Field accessors
 * @param {Object}            [descriptor={enumerable: true}] - Use for `Object.defineProperty()`
 *
 * @return {Object} Decorator descriptor
 */
export function decoratorOf(target, key, value, descriptor = {enumerable: true}) {

    descriptor = {
        key, descriptor,
        placement:  (target instanceof Function) ? 'static' : 'prototype'
    };

    if (value instanceof Function)
        descriptor.kind = 'method',  descriptor.descriptor.value = value;
    else if (
        (value.constructor === Object)  &&
        ((value.set || value.get) instanceof Function)
    )
        descriptor.kind = 'method',  Object.assign(descriptor.descriptor, value);
    else
        descriptor.kind = 'field',  descriptor.initializer = () => value;

    return descriptor;
}