import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlgoVisualizer from './components/AlgoVisualizer/AlgoVisualizer';
import PathFindingVisualizer from './components/Visualizers/PathFinding/PathFinding';
import SortingVisualizer from './components/Visualizers/Sorting/Sorting';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<AlgoVisualizer/>} />
        <Route path='/pathfinding' element={<PathFindingVisualizer/>} />
        <Route path='/sorting' element={<SortingVisualizer/>} />
      </Routes>
    </Router>
  );
}

export default App;
