import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

const mapDispatchToProps = dispatch => ({  
  onClick: payload =>
    dispatch({ type: 'DELETE_COMMENT', payload}), 
});

const DeleteButton = props => {
  const del = () => {
    const payload = agent.Comments.delete(props.slug, props.commentId);
    props.onClick(payload, props.commentId);
  }

  if (props.show){
    return (
      <span className='mod-option'>
        <i className='ion-trash-a' onClick={del}></i>
      </span>
    )  
  }
  return null;
}

export default connect(() => ({}), mapDispatchToProps) (DeleteButton);  
