import mapPosts from './appendElements/mapPosts';

window._fetch = fetch;

window.fetch = async (...params) => {
  const res = (await window._fetch(...params)) as Response & { _json: () => Promise<any> };

  const isSelectEntrystory = JSON.parse(params[1]?.body?.toString() ?? '{}')
    .query.replaceAll('\\n', '\n')
    .trim()
    .startsWith('query SELECT_ENTRYSTORY');

  if (isSelectEntrystory) {
    res._json = res.json;
    res.json = async () => {
      const json = await res._json();
      mapPosts(json.data.discussList.list);
      return json;
    };
  }

  return res;
};
