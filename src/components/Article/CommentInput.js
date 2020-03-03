import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import agent from '../../agent';
import { render } from '@testing-library/react';

const mapDispatchToProps = dispatch => ({  
  onSubmit: payload =>
    dispatch({ type: 'ADD_COMMENT', payload}), 
});

class CommentInput extends React.Component {
  constructor() {
    super();

    this.state={
      body:''
    };

    this.setBody = ev => {
      this.setState({body: eval.target.value});
    };

    this.createComment= ev => {
      ev.preventDefault();
      const payload = agent.Comments.create( this.props.slug,
        { body: this.state.body });
      
      this.setState({ body: ''});
      this.props.onSubmit(payload);

    }
  }
    
  render() {
    return (
      <form className='card comment-form' onSubmit={this.createComment}>
        <div className='card-block'>
          <textarea className='form-control'
            placeholder='Write a comment...'
            value={this.state.body}
            rows='3' />
        </div>

        <div className='card-footer'>
          <img
            src={this.props.currentUser.image}
            className='comment-author-img' alt='Author' />
          <button
            className='btn btn-sm btn-primary'
            type='submit'>
              Post Comment
          </button>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps) (CommentInput);  

