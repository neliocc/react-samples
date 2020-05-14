import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from '../../components/Login';
import Signup from '../../components/Signup';

const Authorization=()=>{
    return <div>
        <Router>
        <Switch>
            <Route path="/signup" component={Signup} />
            <Route component={Login} />
        </Switch>
    </Router>
    </div>
}
export default Authorization;