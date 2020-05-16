import React from 'react';
import GlobalContext from '../../store';
import {Link} from 'react-router-dom';

import TasksList from '../TasksList';

const HomePage=()=>{
    const context=React.useContext(GlobalContext);
return <div>Hello {context.globalState.currentAccount.username}, you have <b>{context.globalState.tasksList.filter(task=>task.username===context.globalState.currentAccount&&!task.completed).length}</b> number of tasks pending.
<TasksList status="pending" />
<div style={{marginTop:"40px",textAlign:"center"}}>
<Link to="/completed"> View My Completed Tasks</Link>
    <Link to="/task/create" className="btn btn-primary"> Add a new Task</Link>
</div>
</div>
}
export default HomePage;