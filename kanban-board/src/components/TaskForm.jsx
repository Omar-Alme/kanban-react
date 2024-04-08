import React, { useState } from 'react';
import styled from 'styled-components';

const TaskFormContainer = styled.div`
    margin-top: 20px;
    // padding: 20px;
    // background-color: #f4f4f4;
    // border-radius: 8px;
`;

const TaskFormInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
`;

const TaskFormTextarea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
`;

const TaskFormButton = styled.button`
    background-color: #e1e1e1;
    color: #666;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
`;

const TaskFormButtonHover = styled(TaskFormButton)`
    &:hover {
        background-color: #666;
        color: #fff;
    }
`;

function TaskForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <TaskFormContainer>
            <form onSubmit={handleSubmit}>
                <TaskFormInput
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TaskFormTextarea
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TaskFormButtonHover type="submit">Add Task</TaskFormButtonHover>
            </form>
        </TaskFormContainer>
    ); 
}

export default TaskForm;

