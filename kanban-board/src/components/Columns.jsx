import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Tasks from './Tasks';
import TaskForm from './TaskForm';
import TaskContext from '../context/TaskContext';

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

const StyledHeader = styled(KanbanHeader)`
    background-color: ${props => props.color}; 
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

const getColor = (listId) => {
    const colors = { todo: '#6cc644', doing: '#4078c0', done: '#f9826c' };
    return colors[listId] || '#fff';
};

function Columns() {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const {tasks, setTasks} = useContext (TaskContext)

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        const sourceList = tasks[source.droppableId];
        const destinationList = tasks[destination.droppableId];
        const movedTask = sourceList[source.index];
        const newList = { ...tasks };

        if (source.droppableId === destination.droppableId) {
            sourceList.splice(source.index, 1);
            destinationList.splice(destination.index, 0, movedTask);
        } else {
            sourceList.splice(source.index, 1);
            destinationList.splice(destination.index, 0, { ...movedTask, id: draggableId });
        }

        setTasks(newList);
    };
    console.log (tasks);
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ColumnsContainer>
                {Object.entries(tasks).map(([listId, list]) => (
                    <Column key={listId}>
                        <StyledHeader color={getColor(listId)}>
                            {listId.charAt(0).toUpperCase() + listId.slice(1)}
                        </StyledHeader>
                        {listId === 'todo' && (
                            <>
                                {showTaskForm && <TaskForm setShowTaskForm = {setShowTaskForm} listId={listId} />}
                                <AddTaskButtonHover onClick={() => setShowTaskForm(true)}>
                                    <FontAwesomeIcon icon={faPlus} /> Skapa Ny Uppgift
                                </AddTaskButtonHover>
                            </>
                        )}
                        <Droppable droppableId={listId}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {list.map((task, index) => ( 
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Tasks
                                                        task={task}
                                                        onDelete={() => deleteTask(task.id, listId)}
                                                        listId={listId}
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
                ))}
            </ColumnsContainer>
        </DragDropContext>
    );
}

export default Columns;