import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { set } from 'date-fns';

const TaskDetailContainer = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: white;
border: 1px solid #ccc;
border-radius: 8px;
padding: 40px;
width: 60%;
height: 60%;
text-align: left;
overflow: auto;
z-index: 9999;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    cursor: pointer;
`;

const DeleteButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
`;



function TaskDetail({ task, onClose, onDelete }) {

    const handleTaskDelete = () => {
        onDelete();
    };


    return (
        <TaskDetailContainer>
            <CloseButton onClick={onClose}><FontAwesomeIcon icon={faX}/></CloseButton>
                <>    
            <h2>{task.title}</h2>
            <p>{task.formattedDate}</p>
            <br />
            <p>{task.description}</p>
            <DeleteButton onClick={handleTaskDelete}>Radera uppgiften</DeleteButton>
            </>
        </TaskDetailContainer>
    );
}

export default TaskDetail;
