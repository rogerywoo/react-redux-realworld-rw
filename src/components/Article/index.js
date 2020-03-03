import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';

import agent from '../../agent';
import CommentContainer from './CommentContainer';
import ArticleMeta from './ArticleMeta';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'ARTICLE_PAGE_LOADED', payload}), 
  onUnLoad: payload =>
    dispatch({ type: 'ARTICLE_PAGE_UNLOADED'}), 

});


class Article extends React.Component {

  componentDidMount() {
    this.props.onLoad(Promise.all ([
      agent.Articles.get(this.props.match.params.id),
      agent.Comments.forArticles(this.props.match.params.id)
    ]));
  }
  
  componentWillUnmount(){
    this.props.onUnLoad();
  }

  render(){
    if (!this.props.article){
      return null;
    }
    const markup={ __html:marked(this.props.article.body) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username;

    return (
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>
            <h1>{this.props.article.title}</h1>
            <ArticleMeta
            article={this.props.article}
            canModify={canModify}/>
          </div>
        </div>
        <div className='container page'>
          <div className='row article-content'>
            <div className='col-xs-12'>
              <div dangerouslySetInnerHTML={markup}></div>
              <div className='tag-list'>
                {
                  this.props.article.tagList.map(tag=> {
                      return (
                        <li
                          className='tag-default tag-pill tag-outline'
                          key={tag}>
                          {tag}  
                          </li>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className='row'>
          <CommentContainer
            comments={this.props.comments || []}
            errors={this.props.commentErrors}
            slug={this.props.match.params.id}
            currentUser={this.props.currentUser} />

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Article);