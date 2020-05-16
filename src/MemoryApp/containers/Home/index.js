import React from 'react';
import GlobalContext from '../../store';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomePage from '../../components/HomePage';
import TaskForm from '../../components/TaskForm';
import CompletedTasks from '../../components/CompletedTasks';
import Task from '../../components/Task';

const Home=()=>{
    
return <Router>
    <Switch>
        <Route path="/task/create" component={TaskForm} />
        <Route path="/task/info/:id" component={Task} />
        <Route path="/completed" component={CompletedTasks} />
        <Route component={HomePage} />
    </Switch>
</Router>
}
export default Home;