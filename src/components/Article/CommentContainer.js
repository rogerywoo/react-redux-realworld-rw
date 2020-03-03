import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import ListErrors from '../ListErrors';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import agent from '../../agent';

const CommentContainer = props =>{
  if (props.currentUser) {
    return (
      <div className='col-sx-12 col_md-8 offset-md-2'>
        <div>
          <ListErrors errors={props.errors} />
          <CommentInput slug={props.slug} currentUser={props.currentUser} />          
        </div>

        <CommentList 
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    )
  } else {
    return(
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <p>
          <Link to='login'> Sign In          
          </Link>
          or 
          <Link to='register'> Sign Up          
          </Link>
          to add comments on this article.
        </p>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    )
  }
};

export default CommentContainer;  