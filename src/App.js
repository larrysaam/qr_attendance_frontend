import './App.css';
import { Attendance } from './pages/attendance';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './layout/Sidebar'
import AdminLayout from './layout/AdminLayout'; // Import the new AdminLayout

function App() {
  return (
    <div className="App">
        <Sidebar />
        <Routes>
          {/* User-facing route */}
          <Route path='/' element={<Attendance />} />
          {/* Admin routes */}
          <Route path='/admin/*' element={<AdminLayout />} />
        </Routes>
    </div>
  );
}

export default App;
