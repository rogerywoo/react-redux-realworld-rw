import React from 'react';
import ArticlePreview from './ArticlePreview'

const ArticleList = props =>{
  if (!props.articles  || props.articles.length === 0) {
    return (
      <div className= 'article-preview'>
        No articles are here... yet.
      </div>
    )
  }
  return (
    <div>
      {
        props.articles.map( article => {
          return (
            <ArticlePreview article={article} />
          );
        })
      }
    </div>
  );
};

export default ArticleList;