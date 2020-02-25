import React from 'react';
import { connect } from 'react-redux';

import agent from '../agent';
import ListErrors from './ListErrors';

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch ({ type: 'UPDATE_FIELD_AUTH', key:'email', value}),
  onChangePassword: value =>
    dispatch ({ type: 'UPDATE_FIELD_AUTH', key:'password', value}),
  onSubmit: (email, password) =>
    dispatch ({ type: 'LOGIN', payload: agent.Auth.login(email, password)}),
});

class Login extends React.Component {
  constructor(){
    super();

    this.changeEmail = ev => {
      let tt = ev;
      return this.props.onChangeEmail(ev.target.value);
    }

    this.changePassword = ev => {
      let tt = ev;
      return this.props.onChangePassword(ev.target.value);
    }

    // this.submitForm = ev => {
    //   ev.preventDefault();
    //   const data = new FormData(ev.target);
    
    //   return this.props.onSubmit(data.get("email"), data.get("password"));
    // };

    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    }
  }
  

  render () {
    const email = this.props.email;
    const password  = this.props.password;

    return (
      <div className="auth-page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">SignIn</h1>
            <p className="text-xs-center">
              <a> Need an account?</a>
            </p>
            <ListErrors errors={this.props.errors} />
            <form onSubmit={this.submitForm(email, password)}>
              <fieldset>
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
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);