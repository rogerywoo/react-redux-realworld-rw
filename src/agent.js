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
  del:url =>
    superagent.del (`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
};

const Articles = {
  all: page =>
    request.get('/articles?Limit=10'),
  get: slug =>
    request.get(`/articles/${slug}`),
  byAuthor: (author, page) =>
    request.get(`/articles?author=${encodeURIComponent(author)}&limit=5`),
  delete: slug =>
    request.del(`/articles/${slug}`),
  favoriteBy: (author, page) =>
    request.get(`/articles?favorited=${encodeURIComponent(author)}&limit=5`),    
  feed: () => 
    request.get('/articles/feed?limit=10'),
}

const Auth = {
  current: () => 
    request.get('/user'),

  login: (email, password) => {
    return  request.post('users/login', {user: {email, password}});
  },

  register: (username, email, password) => {
    return request.post('/users', {user: {username, email, password }});
  },

  save: user => {
    return request.put('/users', {user});
  }
}

const Profile = {
  follow: username =>
    request.post(`/profiles/${username}/follow`),
  get: username =>
    request.get(`/profiles/${username}`),
  unfollow: username =>
    request.del(`/profiles/${username}/follow`),    
}

const Comments = {
  create: (slug, comment) => 
    request.post(`/article/${slug}/comments`, { comment }),

  delete: (slug, commentId) =>
    request.del(`/articles/${slug}/comments/${commentId}`),

  forArticles: slug =>
    request.get(`/articles/${slug}/comments`)
};

let token = null;
let tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

export default{
  Articles,
  Auth,
  Comments,
  Profile,
  setToken: _token => {token = _token},
  clearToken: () => {token = null}
};
