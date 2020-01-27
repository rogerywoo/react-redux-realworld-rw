import _superagent from 'superagent'
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api/';

const responseBody = res =>res.body;

const request = {
  get:url =>
    superagent.get (`${API_ROOT}${url}`).then(responseBody)
};

const Articles = {
  all: page =>
    request.get('articles?Limit=10')
}

export default{
  Articles
};
