import _superagent from 'superagent'
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api/';

const responseBody = res =>res.body;

const request = {
  get:url =>
    superagent.get (`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.save(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
};

const Articles = {
  all: page =>
    request.get('articles?Limit=10')
}

const Auth = {
  current: () => 
    request.get('/user'),

  login: (email, password) => {
    return  request.post('users/login', {user: {email, password}});
  },

  register: (username, email, password) => {
    request.post('/users', {user: {username, email, password }});
  },

  save: user => {
    request.put('/users', {user});
  }
}

let token = null;
let tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

export default{
  Articles,
  Auth,
  setToken: _token => {token = _token},
  clearToken: () => {token = null}
};
