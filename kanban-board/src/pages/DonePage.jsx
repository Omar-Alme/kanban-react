import {useContext} from 'react'
import TaskContext from '../context/TaskContext'
import Tasks from '../components/Tasks';

function TodoPage() {
    const {tasks, setTasks} = useContext(TaskContext)
    const listId = 3;
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    const list = savedTasks.done;
    
console.log (list);

    return (
        <div>
            <h1>Done</h1>

            <ul>
                {list.map((task, index) => ( 
                    <li key={task.id} index={index}>                      
                            <div>
                                <Tasks
                                    task={task}
                                    onDelete={() => deleteTask(task.id, listId)}
                                    listId={listId}
                                    />
                                    </div>
                        </li>
                    ))}
                                    
                </ul>
        
        </div>
    )
    }

export default TodoPage