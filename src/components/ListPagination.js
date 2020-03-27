import React from 'react';
import { connect } from 'react-redux';

import agent from '../agent';

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: 'SET_PAGE', payload })
});


const mapStateToProps = state => {
  return {
    ...state,
    currentUser: state.common.currentUser
  };
};



const ListPagination = props => {
  if (props.articlesCounts <= 10) {
    return null;
  }

  const range = [];
  for (let i=0; i<Math.ceil(props.articlesCount / 10); ++i){
    range.push(i);    
  }

  const setPage = page => {
    if(props.pager) {
      props.onSetPage(page, props.pager(props.currentUser, page));
    }else {
      props.onSetPage(page, agent.Articles.all(page))
    }
  };

  return (
    <nav>
      <ul className='pagination'>
        {
          range.map(v=> {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);              
            };

            
            return (
              <li
                className={ isCurrent ? 'page-item active' : 'page-item'}
                onClick= {onClick}
                key={v.toString()}>
                  <a className='page-link' href=''>{v + 1}</a>
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPagination);