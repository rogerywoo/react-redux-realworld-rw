import React from 'react';
import {Link} from 'react-router-dom';
import ArticleActions from './ArticleActions';

const ArticleMeta = props => {
  const article = props.article;
  return (
    <div className='article-meta'>
      <Link to={`@{article.author.username}`}>
        <img src={article.author.image || ''} alt='author' />
      </Link>

      <div className='info'>
        <Link to={`@{article.author.username}`} classname='author'>
          {article.author.name}          
        </Link>

        <span className='date'>
          {new Date(article.createAt).toDateString()}
        </span>

        <ArticleActions canModify={props.canModify} article={article} />
      </div>
    </div>
  )
}

export default ArticleMeta
