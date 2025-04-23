import './App.css';
import { Attendance } from './pages/attendance';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './layout/Sidebar'
import { UserList } from './pages/userList';
import { Downloads } from './pages/Downloads';

function App() {
  return (
    <div className="App">
        <Sidebar />
        <Routes>
          <Route path='/' element={<Attendance/>}/>
          <Route path='/UserList' element={<UserList/>}/>
          <Route path='/Downloads' element={<Downloads/>}/>
        </Routes>
    </div>
  );
}

export default App;

