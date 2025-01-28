import { useContext } from 'react';
import './App.css'
import DashBoard from './components/Users/users';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeContext } from './context/ThemeContext';
function App() {
  const data = useContext(ThemeContext)
  return (
    <div className='paint-inventory-main-container' style={{
      background: data.dark ? '#212631' : '#fff',
      color: data.dark ? '#fff' : '#212631'
  }}>
      <DashBoard />
    </div>
  )
}

export default App
