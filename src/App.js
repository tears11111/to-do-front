import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import './App.scss';

const App = () => { 

  return (
    <Routes>
      <Route path="/tasks" element={<MainPage />} />
    </Routes>
  );
}

export default App;
