
const queryString = require('query-string');

export function parseUrlWithPrefix(url, prefix) {
  let query = '?';
  let path = '/';
  if (url && url.split(prefix).length > 1) {
    const urlWithoutPrefix = url.split(prefix)[1];
    const indexOfQuerySplit = urlWithoutPrefix.indexOf('?');
    if (indexOfQuerySplit !== -1) {
      path = urlWithoutPrefix.slice(0, indexOfQuerySplit);
      query = urlWithoutPrefix.slice(indexOfQuerySplit);
    } else {
      path = urlWithoutPrefix;
    }
  }
  const params = queryString.parse(query);
  return {
    path,
    params,
  };
}
