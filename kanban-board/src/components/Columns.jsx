import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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


function Columns() {
    const [todoTasks, setTodoTasks] = useState(() => []);
    const [doingTasks, setDoingTasks] = useState(() => []);
    const [doneTasks, setDoneTasks] = useState(() => []);
    const [showTaskForm, setShowTaskForm] = useState(false);



    const addTask = (task) => {
        const newTask = { ...task, id: uuidv4() };
        const updatedTodoTasks = [...todoTasks, newTask];
        setTodoTasks(updatedTodoTasks);
        setShowTaskForm(false);
    };
    
    const deleteTask = (task) => {
        const updatedTodoTasks = todoTasks.filter((t) => t.id !== task.id);
        const updatedDoingTasks = doingTasks.filter((t) => t.id !== task.id);
        const updatedDoneTasks = doneTasks.filter((t) => t.id !== task.id);
        setTodoTasks(updatedTodoTasks);
        setDoingTasks(updatedDoingTasks);
        setDoneTasks(updatedDoneTasks);
    };
    
    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
    
        if (!destination) {
            return;
        }
    
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
    
        const sourceListId = source.droppableId;
        const destinationListId = destination.droppableId;
    
        if (sourceListId === destinationListId) {
            // If task is moved within the same list
            const sourceList = getList(sourceListId);
            const movedTask = sourceList.splice(source.index, 1)[0];
            const newList = [...sourceList];
            newList.splice(destination.index, 0, movedTask);
    
            if (sourceListId === 'todo') {
                setTodoTasks(newList);
            } else if (sourceListId === 'doing') {
                setDoingTasks(newList);
            } else {
                setDoneTasks(newList);
            }
        } else {
            // If task is moved to a different list
            const sourceList = getList(sourceListId);
            const destinationList = getList(destinationListId);
    
            const movedTask = sourceList.splice(source.index, 1)[0];
            movedTask.id = draggableId; // Set the id here
    
            destinationList.splice(destination.index, 0, movedTask);
    
            setTodoTasks(todoTasks);
            setDoingTasks(doingTasks);
            setDoneTasks(doneTasks);
        }
        
    };

    const getList = (listId) => {
        if (listId === 'todo') {
            return todoTasks;
        } else if (listId === 'doing') {
            return doingTasks;

        } else {
            return doneTasks;
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
        <DragDropContext onDragEnd={onDragEnd}  >
            <ColumnsContainer>
            <Column>
                    <ToDoHeader>Todo</ToDoHeader>
                    {showTaskForm && <TaskForm onSubmit={addTask} />}
                    <Droppable droppableId='todo'>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {todoTasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
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
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {doingTasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
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
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {doneTasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
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
