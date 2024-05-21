import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import Columns from './components/Columns';

import './App.css';

function App() {
    const { columnName } = useParams(); 

    return (
        
            <div>
                <Header />
                <Columns columnName={columnName} />
            </div>
    );
}

export default App;