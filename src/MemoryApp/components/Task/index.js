import React from 'react';
import {withRouter} from 'react-router-dom';
import GlobalContext from '../../store';

const Task=(props)=>{
    const context=React.useContext(GlobalContext);
    const taskId=props.match.params.id;
    const task=context.globalState.tasksList.find(task=>task.id==taskId);
    console.log(task);
    return <div>
        <h1>{task.title}</h1>
        <div dangerouslySetInnerHTML={{__html:task.notes}} />
    </div>
}

export default withRouter(Task);