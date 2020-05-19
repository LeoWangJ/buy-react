import React, { Component } from "react";
import ErrorToast from '../../components/ErrorToast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as appActions, getError } from '../../redux/modules/common'
import Home from '../Home'
class App extends Component {
  render() {
    const { error, appActions: { clearError } } = this.props
    return <div className="App">
      {
        error ?
          <ErrorToast msg={error} clearError={clearError} /> : null
      }
      <Home />
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
