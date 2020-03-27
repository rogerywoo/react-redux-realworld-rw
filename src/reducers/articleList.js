export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      let t = 1;
  
      return {...state, 
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        tab: action.tab,
        appLoaded: true,
        currentPage: 0,
        pager: action.pager,
      }
    case 'CHANGE_TAB':   
      let tt = 1;
  
      return {...state, 
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: action.tab,
        appLoaded: true,
        currentPage: 0,
      }      
    case 'PROFILE_PAGE_LOADED':
    case 'PROFILE_FAVORITES_PAGE_LOADED':
      let tttt = 1;
      return {
        ...state,
        pager: action.pager,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0,        
      }
    case 'APPLY_TAG_FILTER':   
      return {...state, 
      articles: action.payload.articles,
      articlesCount: action.payload.articlesCount,
      tab: null,
      tag: action.tag,
      currentPage: 0,  
    }

    case 'HOME_PAGE_UNLOADED':
      return {};
      
    case 'PROFILE_PAGE_UNLOADED':
    case 'PROFILE_FAVORITES_PAGE_UNLOADED':
      return {};
    
    case 'SET_PAGE':
      let ttt = 1;
      return{...state, 
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page};

    default:
      return state;
  }
};