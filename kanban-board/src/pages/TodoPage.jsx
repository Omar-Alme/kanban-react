import {useContext, useEffect} from 'react'
import TaskContext from '../context/TaskContext'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Tasks from '../components/Tasks';
import Column from '../components/Columns';

function TodoPage() {
    const {tasks, setTasks} = useContext(TaskContext)
    const listId = 1;
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    const list = savedTasks.todo;
    
console.log (list);

    return (
        <div>
            <h1>Todo</h1>

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