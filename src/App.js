import React from 'react';
import { connect } from  'react-redux';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';

const mapStateToProps = state => {
  return {
    appName: state.common.appName
  }
};

class App extends React.Component {
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

export default connect(mapStateToProps, () => ({ }) ) (App);
