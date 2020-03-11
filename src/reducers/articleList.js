export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      let t = 1;
  
      return {...state, 
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        tab: action.tab,
        appLoaded: true,
      }
    case 'CHANGE_TAB':   
      let tt = 1;
  
      return {...state, 
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: action.tab,
        appLoaded: true,
      }      
    case 'PROFILE_PAGE_LOADED':
    case 'PROFILE_FAVORITES_PAGE_LOADED':
      return {
        ...state,
        articles: action.payload[1].articles,
        articleCount: action.payload[1].articleCount,
      }
    case 'APPLY_TAG_FILTER':   
      return {...state, 
      articles: action.payload.articles,
      articlesCount: action.payload.articlesCount,
      tab: null,
      tag: action.tag      
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