import React from 'react';
import { connect } from  'react-redux';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import agent from './agent';

const mapStateToProps = state => ({
    appName: state.common.appName,
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () =>
    dispatch({type:'REDIRECT'}),
  onLoad: (payload, token) =>
    dispatch({type: 'APP-LOAD', payload, token})
})

class App extends React.Component {
  constructor(){
    super();

    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);      
    }   

    this.onLoad = (token) =>  {
      this.props.onLoad(token ? agent.Auth.current() : null, token);
    }
  }

  componentDidUpdate(nextProps){
    if (nextProps.redirectTo) {
      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
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
        <Header appName={this.props.appName}></Header>
        {this.props.children}

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
