import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Tasks from './Tasks';
import TaskForm from './TaskForm';

const ColumnsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

const Column = styled.div`
    width: 300px; 
    height: 630px;
    margin: 0 8px; 
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
`;

const KanbanHeader = styled.h2`
    color: #fff;
    padding: 8px 16px; 
    font-size: 12px;
    border-radius: 99px;
    width: fit-content;
    text-align: left;
`;

const ToDoHeader = styled(KanbanHeader)`
    background-color: #6cc644; 
`;

const AddTaskButton = styled.button`
    background-color: #e1e1e1 ;
    color: #666;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-top: 10px;
    cursor: pointer;
`;

const AddTaskButtonHover = styled(AddTaskButton)`
    &:hover {
        background-color: #666;
        color: #fff;
    }
`;

const DoingHeader = styled(KanbanHeader)`
    background-color: #4078c0; 
`;

const DoneHeader = styled(KanbanHeader)`
    background-color: #f9826c; 
`;

// Rest of your imports and styled components...

function Columns() {
    const [todoTasks, setTodoTasks] = useState(() => []);
    const [doingTasks, setDoingTasks] = useState(() => []);
    const [doneTasks, setDoneTasks] = useState(() => []);
    const [showTaskForm, setShowTaskForm] = useState(false);
    

    const addTask = (task) => {
        const newTask = { ...task, id: uuidv4() };
        const updatedTodoTasks = [...todoTasks, newTask];
        setTodoTasks(updatedTodoTasks);
        localStorage.setItem('tasks', JSON.stringify({ todo: updatedTodoTasks, doing: doingTasks, done: doneTasks }));
        setShowTaskForm(false);
    };
    
    const deleteTask = (task) => {
        const updatedTodoTasks = todoTasks.filter((t) => t.id !== task.id);
        const updatedDoingTasks = doingTasks.filter((t) => t.id !== task.id);
        const updatedDoneTasks = doneTasks.filter((t) => t.id !== task.id);
        setTodoTasks(updatedTodoTasks);
        setDoingTasks(updatedDoingTasks);
        setDoneTasks(updatedDoneTasks);
        localStorage.setItem('tasks', JSON.stringify({ todo: updatedTodoTasks, doing: updatedDoingTasks, done: updatedDoneTasks }));
    };

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const newTaskList = [...todoTasks];
            const newTask = newTaskList.splice(source.index, 1);
            newTaskList.splice(destination.index, 0, newTask[0]);
            setTodoTasks(newTaskList);
            localStorage.setItem('tasks', JSON.stringify({ todo: newTaskList, doing: doingTasks, done: doneTasks }));
        } else {
            const newTaskList = [...todoTasks];
            const newTask = newTaskList.splice(source.index, 1);
            newTaskList.splice(destination.index, 0, newTask[0]);
            setTodoTasks(newTaskList);

            const newDoingTaskList = [...doingTasks];
            newDoingTaskList.splice(destination.index, 0, newTask[0]);
            setDoingTasks(newDoingTaskList);
            localStorage.setItem('tasks', JSON.stringify({ todo: newTaskList, doing: newDoingTaskList, done: doneTasks }));
        }
    };


    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            setTodoTasks(tasks.todo);
            setDoingTasks(tasks.doing);
            setDoneTasks(tasks.done);
        }
    }, []);


    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <ColumnsContainer>
            <Column>
                    <ToDoHeader>Todo</ToDoHeader>
                    {showTaskForm && <TaskForm onSubmit={addTask} />}
                    <Droppable droppableId='todo'>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {todoTasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Tasks
                                                    key={task.id}
                                                    title={task.title}
                                                    dateAdded={new Date().toLocaleString()}
                                                    description={task.description}
                                                    onDelete={() => deleteTask(task)}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    

                    <AddTaskButtonHover onClick={() => setShowTaskForm(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Skapa Ny uppgift
                    </AddTaskButtonHover>
                </Column>
                <Column>
                    <DoingHeader>Doing</DoingHeader>
                    <Droppable droppableId='doing'>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {doingTasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Tasks
                                                    key={task.id}
                                                    title={task.title}
                                                    dateAdded={new Date().toLocaleString()}
                                                    description={task.description}
                                                    onDelete={() => deleteTask(task)}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    
                </Column>
                <Column>
                    <DoneHeader>Done</DoneHeader>
                    <Droppable droppableId='done'>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {doneTasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Tasks
                                                    key={task.id}
                                                    title={task.title}
                                                    dateAdded={new Date().toLocaleString()}
                                                    description={task.description}
                                                    onDelete={() => deleteTask(task)}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    
                </Column>

            </ColumnsContainer>
        </DragDropContext>
    );
}

export default Columns;
