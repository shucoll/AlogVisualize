import styles from './AlgoVisualizer.module.scss';

const AlgoVisualizer = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Algo Visualizer</h1>
      <ul className={styles.cards}>
        <li className={styles.card}>PathFinding Visualizer</li>
        <li className={styles.card}>Sorting Visualizer</li>
      </ul>
    </div>
  );
};

export default AlgoVisualizer;
