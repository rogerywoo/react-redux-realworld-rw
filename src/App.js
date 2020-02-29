import React from 'react';
import { connect } from  'react-redux';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Settings from './components/Settings';
import agent from './agent';

const mapStateToProps = state => ({
    appName: state.common.appName,
    redirectTo: state.common.redirectTo,
    currentUser: state.common.currentUser,
    token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () =>
    dispatch({type:'REDIRECT'}),
  onLoad: (payload, token) =>
    dispatch({type: 'APP_LOAD', payload, token})
})


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);   
    }   
    this.props.onLoad(token ? agent.Auth.current() : null, token);
    // this.onLoad = (token) =>  {
    //   this.props.onLoad(token ? agent.Auth.current() : null, token);
    // }

    // if (props.redirectTo){
    //   this.props.history.push(props.redirectTo);
    //   this.props.onRedirect();
    // }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.redirectTo) {
      return {redirectTo: nextProps.redirectTo};
    }
    else {
      return null;
    }
  }

  componentDidMount() {
    this.props.onLoad(this.state.token ? agent.Auth.current() : null, this.state.token);
  }

  componentDidUpdate(prevProps, nextProps){
    if (this.state.redirectTo){
      if (prevProps.redirectTo !== this.state.redirectTo){
        this.props.history.push(this.state.redirectTo);
        this.props.onRedirect();
      }            
    }
  }

  // componentWillReceiveProps(nextProps){
  //   if (nextProps.redirectTo) {
  //     this.context.router.replace(nextProps.redirectTo);
  //     this.props.onRedirect();
  //   }
  // }

  // componentWillMount(){
  //   const token = window.localStorage.getItem('jwt');
  //   if (token) {
  //     agent.setToken(token);
  //   }
    
  //   this.props.onLoad(token ? agent.Auth.current() : null, token);
  // }

  render() {
   
      return (
        <div>
          <Header currentUser={this.props.currentUser} appName={this.props.appName}></Header>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />       
              <Route path="/settings" component={Settings} />                       
              <Route path="" component={Home}/>              
          </Switch>

        </div>
      );
    }
}

// App.contexTypes = {
// //  router:React.PropsTypes.object.isRequired
// };

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default connect(mapStateToProps, mapDispatchToProps ) (App);
