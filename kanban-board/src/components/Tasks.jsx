import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import TaskDetail from './TaskDetail';

const TaskCard = styled.div`
    background-color: #fff;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    padding: 10px;
    margin: 10px 0;
`;

const TaskTitle = styled.h3`
    font-size: 1em;
    text-align: left;
    margin: 0 0 8px 0;
`;

const TaskDate = styled.p`
    font-size: 10px;
    text-align: left;
    font-weight: bold;
    color: #666;
    margin: 0;
`;

function Tasks({ task, onUpdate, onDelete, listId }) {

   // const formattedDate = format(new Date(task.date), 'yyyy-MM-dd');

    const [showTaskDetail, setShowTaskDetail] = useState(false);

    const handleTaskClick = () => {
        setShowTaskDetail(true);
    };

    const handleClose = () => {
        setShowTaskDetail(false);
    };

    const handleTaskDelete = () => {
        onDelete(task.id);
    };

    const handleTaskUpdate = (updatedTask) => {
        onUpdate(updatedTask);
    };

    return (
        <>
            <TaskCard onClick={handleTaskClick}>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDate>{task.date}</TaskDate>
            </TaskCard>
            {showTaskDetail && (
                <TaskDetail
                    task={task}
                    onClose={handleClose}
                    onDelete={handleTaskDelete}
                    onUpdate={handleTaskUpdate}
                    listId={listId}
            
                />
                
            )}
        </>
    );
}

export default Tasks;