export default (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLE_PAGE_LOADED':
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments,
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ? null : 
          (state.comments || []).concat([action.payload.comment])
      };
    case 'DELETE_COMMENT':
        const commentId = action.commentId;

        return {
          ...state,
          commentErrors: action.error ? action.payload.errors : null,
          comments: action.error ? null : state.comments.filter(comment => comment.id !== commentId)
        };  
    case 'ARTICLE_PAGE_UNLOADED':
      return {};
    
    default:
      return state;
  }
}

  