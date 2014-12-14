/**
 * @example
 * the Eiffel Tower -> The Eiffel Tower
 */
define([
    'underscore'
], function( _ ) {
    _.mixin({ 'capitalize': function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } });
});