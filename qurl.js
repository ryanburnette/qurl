(function (exports) {
    'use strict';

    function Qurl() {
    }

    Qurl.create = function () {
        return new Qurl();
    };

    var proto = Qurl.prototype;

    proto.query = function (key, value) {
        if (!key) {
            return getSearch();
        }

        if (key && typeof(value) === 'undefined') {
            return getSearch()[key];
        }

        if (key && typeof(value) !== 'undefined') {
            return setSearch(key, value);
        }
    };

    function getSearch() {
        var string = window.location.search, pairs, obj = {};

        if (!string) {
            return obj;
        }
        string = string.replace('?', '');

        pairs = string.split('&');
        pairs.forEach(function (p) {
            var pair = decodeURIComponent(p).split('=');
            obj[pair[0]] = pair[1];
        });

        return obj;
    }

    function setSearch(key, value) {
        var search = getSearch();

        if (value === false) {
            delete search[key];
        } else {
            search[key] = value;
        }

        setSearchString(getSearchString(search));

        return search;
    }

    function setSearchString(string) {
        if (history.pushState) {
            history.pushState({}, document.title, string);
        }
    }

    function getSearchString(query) {
        var pairs = [];

        Object.keys(query).forEach(function (key) {
            if (typeof query[key] === 'undefined') {
                pairs.push(key);
            } else {
                pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key] || ''));
            }
        });

        if (pairs.length === 0) {
            return '?';
        } else {
            return '?' + pairs.join('&');
        }
    }

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return Qurl;
        });
    } else {
        exports.Qurl = Qurl;
    }
}(this));
