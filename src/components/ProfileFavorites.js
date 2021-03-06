import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import agent from '../agent';
import {Profile, mapStateToProps} from './Profile';


const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({
    type: 'FOLLOW_USER',
    payload: agent.Profile.follow(username)
  }),

  onLoad: payload=> dispatch({type: 'PROFILE_FAVORITES_PAGE_LOADED', payload}),

  onPageSet: (page, payload) => (
    {type: 'SET_PAGE', page, payload}
  ),

  onUnfollow: username => dispatch({type: 'UNFOLLOW_USER', 
    payload: agent.Profile.unfollow(username)}),

  onUnload: () =>dispatch({type: 'PROFILE_FAVORITES_PAGE_UNLOADED'})
});

class ProfileFavorites extends Profile {
  componentDidMount() {
    this.props.onLoad(
      Promise.all([
      agent.Profile.get(this.props.match.params.username),
      agent.Articles.favoriteBy(this.props.match.params.username)
    ]));
  }

  componentWillUnmount(){
    this.props.onUnload();
  }

  onPageSet(page) {
    const promise = agent.Articles.favoriteBy(this.props.profile.username, page);
    this.props.onSetPage(page, promise);
  }

  renderTabs() {
    return (
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <Link
            className='nav-link'
            to={`/@${this.props.profile.username}`}>
            My Articles
            </Link>
        </li>

        <li className='nav-item'>
          <Link 
            className='nav-link active'
            to={`/@${this.props.profile.username}/favorites`}>
              Favorited Articles
          </Link>
        </li>
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProfileFavorites)