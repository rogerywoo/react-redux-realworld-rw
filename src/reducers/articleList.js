export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {...state, 
      articles: action.payload.articles,
      articlesCount: action.payload.articlesCount
    }
    case 'PROFILE_PAGE_LOADED':
    case 'PROFILE_FAVORITES_PAGE_LOADED':
      return {
        ...state,
        articles: action.payload[1].articles,
        articleCount: action.payload[1].articleCount,
      }

    case 'HOME_PAGE_UNLOADED':
      return {};
      
    case 'PROFILE_PAGE_UNLOADED':
    case 'PROFILE_FAVORITES_PAGE_UNLOADED':
      return {};
        
    default:
      return state;
  }
};