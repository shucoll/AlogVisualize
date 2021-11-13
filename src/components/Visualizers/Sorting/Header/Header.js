import styles from './Header.module.scss';

import React, { useState } from 'react';

import { ReactComponent as GithubSvg } from '../../../../assets/github.svg';

const Header = (props) => {
  const [algorithm, setAlgorithm] = useState(null);
  const [speed, setSpeed] = useState('Normal');

  const handleDropDownItemClicked = (value) => {
    setAlgorithm(value);
  };

  const handleVisualize = () => {
    if (algorithm) props.visualize(algorithm);
  };

  const handleSpeedChange = (speed) => {
    setSpeed(speed);
    props.changeSpeed(speed);
  };

  const handleResetArray = () => {
    props.resetArray();
  };

  const handleRangeChange = (e) => {
    props.changeArrayLen(e.target.value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.name}>Sorting Visualizer</div>
      <div className={styles.controls}>
        <div className={styles.dropdown}>
          <button className={`${styles.btn} ${styles.btn__dropdown}`}>
            Choose Algorithm
          </button>
          <div className={styles.dropdownContent}>
            <button
              className={`${styles.btn}`}
              onClick={() => handleDropDownItemClicked('MergeSort')}
            >
              Merge Sort
            </button>
            <button
              className={`${styles.btn}`}
              onClick={() => handleDropDownItemClicked('QuickSort')}
            >
              Quick Sort
            </button>
          </div>
        </div>
        <div className={styles.dropdown}>
          <button className={`${styles.btn} ${styles.btn__dropdown}`}>
            Speed
          </button>
          <div className={styles.dropdownContent}>
            <button
              className={`${styles.btn}`}
              onClick={() => handleSpeedChange('Fast')}
            >
              Fast
            </button>
            <button
              className={`${styles.btn}`}
              onClick={() => handleSpeedChange('Normal')}
            >
              Normal
            </button>
            <button
              className={`${styles.btn}`}
              onClick={() => handleSpeedChange('Slow')}
            >
              Slow
            </button>
          </div>
        </div>

        <button
          className={`${styles.btn} ${styles.btn__visualize}`}
          onClick={handleVisualize}
        >
          Visualize {algorithm}
        </button>

        <div className={styles.rangeContainer}>
          Array Size
          <input
            className={styles.rangeInput}
            type='range'
            min='5'
            max='50'
            onChange={handleRangeChange}
          ></input>
        </div>
        <button className={`${styles.btn}`} onClick={handleResetArray}>
          Reset Array
        </button>
      </div>
    </header>
  );
};

export default Header;
