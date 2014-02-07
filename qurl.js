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

  function getSearchString(search) {
    var string = '?'
      , i = 0
      ;

    Object.keys(search).forEach(function (key) {
      if ( i !== 0 ) {
        string = string + '&';
      }
      string = string + key + '=' + search[key];
      i = i + 1;
    });

    return string;
  }
  
  Qurl.create = Qurl;
}());