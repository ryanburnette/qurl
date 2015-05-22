(function (exports, location) {
  'use strict';

  function Qurl (queryString, updateHistory) {
    if ( !(this instanceof Qurl) ) {
      return new Qurl(queryString);
    }

    this.queryString = queryString || location.search;
    this.updateHistory = typeof updateHistory !== 'undefined' ? updateHistory : !queryString;
  }

  Qurl.prototype.query = function (key, value, override) {
    var paramsString,
        params = getParams(this.queryString),
        typeofKey = typeof key,
        typeofValue = typeof value;

    if (typeofKey === 'string') {
      if (typeofValue === 'undefined') {
        return getParamValue(params, key);
      }

      paramsString = setParamValue(params, key, value);
    } else if (typeofKey === 'object') {
      paramsString = setParamsStringFromObject(params, key, override);
    }

    if (paramsString) {
      this.queryString = paramsString;

      if (this.updateHistory) {
        updateHistoryFromString(paramsString);
      }
    }

    return paramsString || params;
  };

  Qurl.prototype.remove = function (keys) {
    var i, max, params;

    if (!Array.isArray(keys)) {
      keys = [keys];
    }
    
    params = getParams(this.queryString);

    for (i = 0, max = keys.length; i < max; i += 1) {
      delete params[keys[i]];
    }

    this.queryString = setParamsStringFromObject(params);

    if (this.updateHistory) {
      updateHistoryFromString(this.queryString);
    }
  };

  Qurl.prototype.removeAll = function () {
    this.queryString = setParamsStringFromObject({}, true);
  };

  Qurl.prototype.toString = function () {
    var params = getParams(this.queryString);

    return getParamStringFromObject(params);
  };

  function updateHistoryFromString (paramsString) {
    history.pushState(null, null, '?' + paramsString);
  }

  function setParamValue (params, key, value) {
    params[key] = value;

    return setParamsStringFromObject(params);
  }

  function getParamValue (params, key) {
    return params[key];
  }

  function setParamsStringFromObject (params, newParamsObj, override) {
    var mergedParamsObj = newParamsObj;

    if (!override) {
      mergedParamsObj = mergeObjects(params, newParamsObj, true);
    }

    return getParamStringFromObject(mergedParamsObj);
  }

  function getParamStringFromObject (paramsObj) {
    var prop, part, max, value, joinedKeys,
        parts = [], i = 0, values = [];

    if (!paramsObj || 'object' !== typeof paramsObj) {
      throw new TypeError('Invalid arguments supplied, paramsObj must be an object.');
    }

    for (prop in paramsObj) {
      if (!paramsObj.hasOwnProperty(prop)) { continue ; }

      traverseProperty(prop, paramsObj[prop]);
    }

    for (max = parts.length; i < max; i += 1) {
      part = parts[i];
      joinedKeys = part.keys.join('.');

      value = encodeURIComponent(joinedKeys) + '=' +  encodeURIComponent(part.value);
      values.push(value);
    }

    return values.join('&');

    function traverse (obj, keyChain) {
      var value, max, i, name;

      if (Array.isArray(obj)) {
        for (i = 0, max = obj.length; i < max; i += 1) {
          value = obj[i];
          name = '[' + i + ']';

          traverseProperty(name, value, keyChain, true);
        }
      } else if ('object' === typeof obj) {
        Object.keys(obj).forEach(function (prop) {
          value = obj[prop];
          name = prop;

          traverseProperty(name, value, keyChain);          
        });
      }
    }

    function traverseProperty (propertyName, propertyValue, keyChain, appendName) {
      if (appendName) {
        keyChain = [].concat(keyChain);
        keyChain[keyChain.length - 1] += propertyName;
      } else {
        keyChain = keyChain ? [].concat(keyChain || [], propertyName) : [propertyName];
      }

      if (typeof propertyValue === 'object') {
        traverse(propertyValue, keyChain);
      } else {
        parts.push({
          keys : keyChain,
          value: propertyValue
        });
      }
    }
  }

  function getParams (queryString) {
    var max, i, parameterParts, keyParts, value,
        decodedParameter, valueAsOriginalType,
        parameters = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&'),
        params = {};

    for (i = 0, max = parameters.length; i < max; i += 1) {
      decodedParameter = decodeURIComponent(parameters[i]);

      if (!decodedParameter) { continue; }

      parameterParts = decodedParameter.split('=');
      keyParts = parameterParts[0].split('.');
      value = parameterParts[1];

      valueAsOriginalType = toOriginalType(value);
      processKeyParts(keyParts, valueAsOriginalType);
    }

    return params;

    function processKeyParts (keyParts, value, constructedParam) {
      var keyArrayIndex, keyPartValue, finalPart,
          keyPart = keyParts.shift(),
          keyNameParts = keyPart.split('['),
          keyArrayIndexPart = keyNameParts[1],
          keyNamePart = keyNameParts[0];

      if (keyArrayIndexPart) {
        keyArrayIndex = keyArrayIndexPart.slice(0, -1);
        keyParts = [].concat(keyArrayIndex, keyParts);
      }

      finalPart = !keyParts.length;

      keyPartValue = finalPart ? (value || null) : (keyArrayIndexPart ? [] : {});
      constructedParam = constructedParam || params[keyNamePart] || (params[keyNamePart] = keyPartValue);

      if (constructedParam !== null && typeof constructedParam === 'object' && constructedParam !== params[keyNamePart]) {
        constructedParam = constructedParam[keyNamePart] || (constructedParam[keyNamePart] = keyPartValue);
      }

      if (!finalPart) {
        processKeyParts(keyParts, value, constructedParam);
      }
    }
  }

  function mergeObjects (obj, objToMerge, override) {
    Object.keys(objToMerge).forEach(function (prop) {
      if (obj[prop] && !override) { return; }

      obj[prop] = objToMerge[prop];
    });

    return obj;
  }

  // coerces the value from string back to a primitive
  function toOriginalType (s) {
    if ('true' === s) {
      return true
    }
    if ('false' === s) {
      return false
    }
    if ('null' === s) {
      return null
    }
    if ('undefined' === s) {
      // for those accidents, you know
      return null
    }
    if (!isNaN(s)) {
      // no, we don't allow scientific notation
      return parseFloat(s, 10);
    }
    // must be a string
    return s;
  }
  
  // allow users to avoid new where possible
  Qurl.create = Qurl;
  
  if (typeof module !== 'undefined' && 'exports' in module) {
    module.exports = exports = Qurl;
  }
  
  exports.Qurl = Qurl;
}(window, window.location)); //jshint ignore:line
