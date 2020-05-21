import React, { Component } from "react";
import ErrorToast from '../../components/ErrorToast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { actions as appActions, getError } from '../../redux/modules/common'
import Home from '../Home'
class App extends Component {
  render() {
    const { error, appActions: { clearError } } = this.props
    return <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      {
        error ?
          <ErrorToast msg={error} clearError={clearError} /> : null
      }
    </div>
  }
}

const mapStateToProps = (state, props) => ({
  error: getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
