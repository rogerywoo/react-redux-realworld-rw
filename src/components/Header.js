import React from 'react';
import {Link} from 'react-router-dom';

const LoggedOutView = props => {
  if (!props.currentUser){
    return (
      <ul className="nav navbat-nav pull-xs-right">
        <li className="nav_item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav_item">
          <Link to="login" className="nav-link">
            Sign in
          </Link>
        </li>
        <li className="nav_item">
          <Link to="register" className="nav-link">
            Register
          </Link>
        </li>        
      </ul>
    )
  }
  return null;
}


const LoggedInView = props => {
  if (props.currentUser){
    return (
      <ul className="nav navbat-nav pull-xs-right">
        <li className="nav_item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav_item">
          <Link to="editor" className="nav-link">
          <i className="ion-compose"></i> New Post
          </Link>
        </li>
        <li className="nav_item">
          <Link to="settings" className="nav-link">
            <i className="ion-gear-a"></i> Settings
          </Link>
        </li>
        <li className="nav_item">
          <Link to={`@{props.currentUser.username}`}
            className="nav-link">
            <img src={props.currentUser.image} className="user-pic" alt="user" />
            {props.currentUser.userName}
          </Link>
        </li>
      </ul>
    )
  }
  return null;
}
class Header extends React.Component{
  render(){
    let appName = ((this.props.appName) || '').toLowerCase();
    return (
      <nav className='navbar navbar-light'>
        <div className='container'>
          <Link to="/" className="navbar-brand">
            {appName}
          </Link>
          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView currentUser={this.props.currentUser} />

        </div>
      </nav>
    )
  }
}

export default Header;