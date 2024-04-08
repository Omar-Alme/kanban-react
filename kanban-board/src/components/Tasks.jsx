import React, {useState} from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
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



function Tasks({id, title, dateAdded, description, onDelete}) {
    const formattedDate = format(new Date(dateAdded), 'yyyy-MM-dd');

    const [showTaskDetail, setShowTaskDetail] = useState(false);

    const task = {
        id,
        title,
        description,
        formattedDate,
    };

    const handleTaskClick = () => {
        setShowTaskDetail(true);
    };

    const handleClose = () => {
        setShowTaskDetail(false);
    };

    const handleTaskDelete = () => {
        onDelete(id);
    };

    return (
        <>
        <TaskCard onClick={handleTaskClick}>
            <TaskTitle>{title}</TaskTitle>
            <TaskDate>{formattedDate} </TaskDate>
            
        </TaskCard>
        {showTaskDetail && (
            <TaskDetail 
                taskId={id}
                task={{id, title, description, formattedDate}}  
                onClose={handleClose} 
                description={description} 
                onDelete={handleTaskDelete}
            />
        )} 
    </>         
    );
}

export default Tasks;