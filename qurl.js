var Qurl
  ;

(function () {
  'use strict';
  
  var proto
    , w = window
    ;
 
  Qurl = function (w) {
    if ( !(this instanceof Qurl) ) {
      return new Qurl(w);
    }
  }
 
  proto = Qurl.prototype;
 
  proto.query = function (key,value) {
    if ( !key ) {
      return getSearch();
    }

    if ( key && typeof(value) === 'undefined' ) {
      return getSearch()[key];
    }

    if ( key && typeof(value) !== 'undefined' ) {
      return setSearch(key,value);
    }
  };

  function getSearch() {
    var string = window.location.search
      , pairs = []
      , obj = {}
      ;

    if ( !string) {
      return {};
    }
    string = string.replace('?','');

    pairs = string.split('&');
    pairs.forEach(function (p) {
      var pair = p.split('=')
        , key = pair[0]
        , val = pair[1]
        ;

      obj[key] = val;
    });

    return obj;
  }

  function setSearch(key,value) {
    var search = getSearch()
      , string = window.location.search
      ;

    if ( value === false ) {
      delete search[key];
    }
    else {
      search[key] = value;
    }

    setSearchString(getSearchString(search));

    return search;
  }

  function setSearchString(string) {
    history.pushState({}, document.title, string);
  }

  function getSearchString(query) {
    var pairs = []
      ;

    Object.keys(query).forEach(function (key) {
      if ('undefined' === typeof query[key]) {
        // for cases where the parameter doesn't need a value
        // ?foo&bar=baz
        pairs.push(key);
      } else {
        // for all parameter values, including null and false
        // ?foo=null&bar=baz
        pairs.push(key + '=' + (query[key] || '')); 
      }
    });

    if (0 === pairs.length) {
      return '';
    } else {
      return '?' + pairs.join('&')
    }
  }
  
  Qurl.create = Qurl;
}());
