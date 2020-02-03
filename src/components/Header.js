import React from 'react';
import {Link} from 'react-router-dom';


class Header extends React.Component{
  render(){
    return (
      <nav className='navbar navbar-light'>
        <div className='container'>
          <Link top='/' className='navbar-brand'>
            {this.props.appName.toLowerCase()}
          </Link>

          <ul className="nav nav-bar pull-xs-right">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;