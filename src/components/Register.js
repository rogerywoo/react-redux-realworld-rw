import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import ListErrors from './ListErrors';

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onChangeUsername: value =>
    dispatch ({ type: 'UPDATE_FIELD_AUTH', key:'username', value}),  
  onChangeEmail: value =>
    dispatch ({ type: 'UPDATE_FIELD_AUTH', key:'email', value}),
  onChangePassword: value =>
    dispatch ({ type: 'UPDATE_FIELD_AUTH', key:'password', value}),
  onSubmit: (username, email, password) =>
    dispatch ({ type: 'REGISTER', payload: agent.Auth.register(username, email, password)}),
});

class Register extends React.Component {
  constructor(){
    super();

    this.onChangeUsername = ev => {
      return this.props.onChangeUsername(ev.target.value);
    }

    this.changeEmail = ev => {
      return this.props.onChangeEmail(ev.target.value);
    }

    this.changePassword = ev => {
      return this.props.onChangePassword(ev.target.value);
    }

    // this.submitForm = ev => {
    //   ev.preventDefault();
    //   const data = new FormData(ev.target);
    
    //   return this.props.onSubmit(data.get("email"), data.get("password"));
    // };

    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    }
  }
  

  render () {
    const username  = this.props.username;
    const email = this.props.email;
    const password  = this.props.password;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="Login">
                  Have an Account
                </Link> 
              </p>
              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="UserName"
                      value={username}
                      onChange={this.ChangeUsername} />
                  </fieldset>                
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.changeEmail} />
                  </fieldset>                
                  <fieldset className="form-group">                
                    <input className="form-control form-control-lg" 
                      type="password"
                      placeholder="Password"
                      value={password}
                        onChange={this.changePassword}  />
                  </fieldset>
                  <button className="btn bnt-lg btn-primary pull-xs-right" type="submit"
                  disabled={this.props.inProgress}>
                      Sign In
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>          
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
