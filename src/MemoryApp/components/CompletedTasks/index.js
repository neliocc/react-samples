import React from 'react';
import GlobalContext from '../../store';
import {Link} from 'react-router-dom';

import TasksList from '../TasksList';

const CompletedTasks=()=>{
    const context=React.useContext(GlobalContext);
return <div>
    <h2>My Completed Tasks</h2>
    <TasksList status="completed" />
    <div style={{marginTop:"40px",textAlign:"center"}}>
<Link to="/"> View My Pending Tasks</Link>
    <Link to="/task/create" className="btn btn-primary"> Add a new Task</Link>
</div>
</div>
}
export default CompletedTasks;