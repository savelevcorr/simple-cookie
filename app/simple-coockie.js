function CookieStorage(maxage, path) {
    var _keys = [];

    var _cookies = (function () {
        var cookie  = null,
            p       = null,
            name    = null,
            list    = null,
            value   = null,
            cookies = {},
            all     = document.cookie;

        if (all === "") {
            return cookies;
        }

        list = all.split("; ");

        for (var i = 0, listLen = list.length; i < listLen; i++) {
            cookie = list[i];
            p      = cookie.indexOf('=');
            name   = cookie.substring(0, p);
            value  = cookie.substring(p + 1);
            cookies[name] = value;
        }

        return cookies;
    })();

    for (var _key in _cookies) {
        if (_cookies.hasOwnProperty(_key)) {
            _keys.push(_key);
        }
    }

    this.length = _keys.length;

    this.key = function(n) {
        if (n < 0 || n >= _keys.length) {
            return null;
        } else {
            return _keys[n];
        }
    };

    this.getItem = function(name) {
        return _cookies[name] || null;
    };

    this.setItem = function(key, value) {
        var cookie = null;

        if ( !(key in _cookies) ) {
            _keys.push(key);
            this.length++;
        }

        _cookies[key] = value;
        cookie = key + '=' + encodeURIComponent(value);

        if (maxage) {
            cookie += '; max-age=' + maxage;
        }

        if (path) {
            cookie += '; path+' +path;
        }

        document.cookie = cookie;
    };

    this.removeItem = function() {};
}