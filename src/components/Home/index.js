import React from 'react';
import { connect } from 'react-redux';
import Banner from './Banner';
import MainView from './MainView';
import agent from '../../agent';
import Tags from './Tags';

const Promise = global.Promise;

const mapStateToProps = state => {
  let t = 1;
  return {
    appName:state.common.appName,
    token: state.common.token,
    tags: state.home.tags
  }
};

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, payload) => 
    dispatch({ type: 'APPLY_TAG_FILTER', tag, payload}),
  onLoad: (tab, payload) =>
    dispatch({ type: 'HOME_PAGE_LOADED', tab, payload}), 
  onUnload: payload =>
    dispatch({ type: 'HOME_PAGE_UNLOADED', payload}), 
});

class Home extends React.Component {
  componentDidMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ?
      agent.Articles.feed() :
      agent.Articles.all();

    this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), articlesPromise]));
  }
  
  render(){
    return (
      <div className='home-page'>
        <Banner appName={this.props.appName} />
        <div className='container page'>
          <div className='row'>
            <MainView />

            <div className='col-md-3'>
              <div className='sidebar'>
                <p> Popular Tags</p>
                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);