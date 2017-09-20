import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { history } from './store';

import { alertActions } from './actions/alert.actions';

import Login from './Login/Login.js';
import Chat from './Chat/Chat.js';
import Register from './Register/Register.js';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <aside>
        { alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        </aside>
        <main>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Chat} />
          <Route exact path="/register" component={Register} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert
})

export default connect(
  mapStateToProps,
  null
)(App);

// export default App;
