import React, {Fragment} from 'react';
import './App.scss';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from './store/ActionCreators';
import {FormikForm} from './components/Form/Form';

class App extends React.Component {


  render() {
    const {data} = this.props;

    return (

        <Fragment>
          <Switch>

            <Route exact path="/" >
              <h1> GitHub: kovar95 </h1>
              <FormikForm/>
            </Route>

            <Route exact path=''></Route>

          </Switch> 
        </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    data : state.data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateData : data => dispatch(actionCreators.updateData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
