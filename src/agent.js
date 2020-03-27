import _superagent from 'superagent'
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api/';

const limit = (count,p) => {
  return `limit=${count}&offset=${p ? p * count : 0}`;
}

const omitSlug = article => Object.assign({}, article, {slug: undefined});

const responseBody = res =>res.body;

const request = {
  get:url =>
    superagent.get (`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  del:url =>
    superagent.del (`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
};

const Articles = {
  all: page => {
    return request.get(`/articles?${limit(10, page)}`);
  },
  byAuthor: (author, page) =>
    {
      let test = 1;
      let url = `/articles?author=${encodeURIComponent(author)}&${limit(10, page)}`;
      return     request.get(`/articles?author=${encodeURIComponent(author)}&${limit(10, page)}`);
    },

  byTag: (tag, page) => {
    return request.get(`/articles?tag=${encodeURIComponent(tag)}&${limit(10, page)}`);
    },
  delete: slug =>
    request.del(`/articles/${slug}`),
  favoriteBy: (author, page) =>
    request.get(`/articles?favorited=${encodeURIComponent(author)}&${limit(10, page)}`),    
  feed: page => {
    return request.get(`/articles/feed?${limit(10, page)}`);
  },
  get: slug =>
    request.get(`/articles/${slug}`),
  update: article => 
    request.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    request.post('/articles', {article})  
}


const Tags = {
  getAll: () => {
    let t = 1;
    return request.get('/tags');
  }
};

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
  Tags,
  setToken: _token => {token = _token},
  clearToken: () => {token = null}
};
