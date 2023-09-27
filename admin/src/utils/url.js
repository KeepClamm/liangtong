const URL_REGEXP =
  /*12       3    45     6 7         8          9 A        B   C                   D  E        F 0   */
  /* proto         user    pass      host         port     path                       query      frag */
  /^((\w+):)?(\/\/((\w+)?(:(\w+))?@)?([^/?:]+)(:(\d+))?)?(\/?([^/?#][^?#]*)?)?(\?([^#]+))?(#(\w*))?/;

class URL {
  constructor(str) {
    const res = URL_REGEXP.exec(str);

    this.url = res[0];
    this.scheme = res[2];
    this.user = res[5];
    this.password = res[7];
    this.host = res[8];
    this.port = res[10];
    this.path = res[11] || '';
    this.query = res[14] || '';
    this.fragment = res[16];
  }

  get canonicalPath() {
    let path = this.path;

    if (
      this.host &&
      this.host.length > 0 &&
      this.host !== 'localhost' &&
      this.host.indexOf('.') === -1
    ) {
      // Treat the host with a single word as a path component
      path = this.host + (path[0] === '/' ? '' : '/') + path;
    }

    // Strip off trailing slash
    if (path.length > 1 && path[path.length - 1] === '/') {
      path = path.slice(0, path.length - 1);
    }

    // Append leading slash
    if (path[0] !== '/') {
      path = '/' + path;
    }

    return decodeURIComponent(path);
  }

  get queryItems() {
    const query = {};

    const pairs = this.query.split('&');
    for (let i = 0; i < pairs.length; ++i) {
      const pair = pairs[i].split('=');

      const key = decodeURIComponent(pair[0]);
      const value = decodeURIComponent(pair[1] || '');

      if (key && key.length > 0) {
        if (!query[key]) {
          query[key] = value;
        } else if (Array.isArray(query[key])) {
          query[key] = query[key].concat(value);
        } else {
          query[key] = [].concat(query[key], value);
        }
      }
    }

    return query;
  }
};

export default URL
