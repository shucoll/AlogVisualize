import { Link } from 'react-router-dom';
import styles from './AlgoVisualizer.module.scss';

const AlgoVisualizer = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Algo Visualizer</h1>
      <ul className={styles.items}>
        <li className={styles.item}>
          <Link to='/pathfinding'>
            <div className={styles.card}>PathFinding Visualize</div>
          </Link>
        </li>
        <li className={styles.item}>
          <Link to='/sorting'>
            <div className={styles.card}>Sorting Visualizer</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AlgoVisualizer;
