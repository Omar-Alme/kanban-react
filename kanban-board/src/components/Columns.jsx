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

    // Load tasks from local storage when the component mounts
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTodoTasks(storedTasks.todo || []);
            setDoingTasks(storedTasks.doing || []);
            setDoneTasks(storedTasks.done || []);
        }
    }, []);

    // Update local storage whenever tasks are updated
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify({ todo: todoTasks, doing: doingTasks, done: doneTasks }));
    }, [todoTasks, doingTasks, doneTasks]);


    const addTask = (task) => {
        const newTask = { ...task, id: uuidv4() };
        setTodoTasks([...todoTasks, newTask]);
        localStorage.setItem('tasks', JSON.stringify({ todo: todoTasks, doing: doingTasks, done: doneTasks }));
        setShowTaskForm(false);
    };

    const deleteTask = (task) => {
        setTodoTasks(todoTasks.filter((t) => t !== task));
        setDoingTasks(doingTasks.filter((t) => t !== task));
        setDoneTasks(doneTasks.filter((t) => t !== task));
        localStorage.setItem('tasks', JSON.stringify({ todo: todoTasks, doing: doingTasks, done: doneTasks }));
    };

        
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return; // If dropped outside of droppable area

        const sourceColumn = getColumnId(source.droppableId);
        const destinationColumn = getColumnId(destination.droppableId);

        const sourceTasks = getColumnTasks(sourceColumn);
        const destinationTasks = getColumnTasks(destinationColumn);
        const draggedTask = sourceTasks.find(task => task.id === draggableId);

        if (sourceColumn === destinationColumn) {
            // If dropped within the same column
            const tasks = reorderTasks(
                sourceTasks,
                source.index,
                destination.index
            );

            updateColumnTasks(tasks, sourceColumn);
        } else {
            // If dropped in different columns
            sourceTasks.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, draggedTask);

            updateColumnTasks(sourceTasks, sourceColumn);
            updateColumnTasks(destinationTasks, destinationColumn);
        }
    };

    const getColumnId = (droppableId) => {
        return droppableId;
    };

    const getColumnTasks = (column) => {
        switch (column) {
            case 'todo':
                return todoTasks;
            case 'doing':
                return doingTasks;
            case 'done':
                return doneTasks;
            default:
                return [];
        }
    };

    const reorderTasks = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const updateColumnTasks = (tasks, column) => {
        switch (column) {
            case 'todo':
                setTodoTasks(tasks);
                break;
            case 'doing':
                setDoingTasks(tasks);
                break;
            case 'done':
                setDoneTasks(tasks);
                break;
            default:
                break;
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ColumnsContainer>
            <Column>
                    <ToDoHeader>Todo</ToDoHeader>
                    {showTaskForm && <TaskForm onSubmit={addTask} />}
                    <Droppable droppableId="todo">
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
                    <Droppable droppableId="doing">
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
                    <Droppable droppableId="done">
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
