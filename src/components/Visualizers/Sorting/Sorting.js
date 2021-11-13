import { useState, useRef, useEffect } from 'react';
import Header from './Header/Header';
import { getQuickSortAnimations } from '../../../algorithms/sorting/quickSort';
import { getMergeSortAnimations } from '../../../algorithms/sorting/mergeSort';
import './Sorting.scss';

const ACCESSED_COLOUR = 'red';
const SORTED_COLOUR = 'green';
const MIN_HEIGHT = 5;
const MAX_HEIGHT = 75;

const Sorting = (props) => {
  const [arrLen, setArrLen] = useState(50);
  const [delay, setDelay] = useState(15);
  const [bars, setBars] = useState([]);
  const [isRunning, setRunning] = useState(false);
  const [isFinished, setFinished] = useState(false);

  const visualizerRef = useRef(null);

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    resetArray();
  }, [arrLen]);

  const visualizeAlgorithm = (algorithm) => {
    if (!isRunning) {
      setRunning(true);
      let animations;

      switch (algorithm) {
        case 'MergeSort':
          animations = getMergeSortAnimations(bars);
          animateArrayUpdate(animations);
          break;

        case 'QuickSort':
          animations = getQuickSortAnimations(bars);
          animateArrayUpdate(animations);
          break;

        default:
      }
    }
  };

  function animateArrayUpdate(animations) {
    if (isRunning) return;
    setRunning(true);
    animations.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          } else {
            const [i] = comparison;
            animateArrayAccess(i);
          }
        } else {
          setBars((prevArr) => {
            const [k, newValue] = comparison;
            const newArr = [...prevArr];
            newArr[k] = newValue;
            return newArr;
          });
        }
      }, index * delay);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * delay);
  }

  function animateArrayAccess(index) {
    const arrayBars = visualizerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, delay);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = '';
    }, delay * 2);
  }

  function animateSortedArray() {
    const arrayBars = visualizerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOUR),
        i * delay
      );
    }
    setTimeout(() => {
      setFinished(true);
      setRunning(false);
    }, arrayBars.length * delay);
  }

  const randomFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = () => {
    if (!isRunning) {
      const arr = [];
      for (let i = 0; i < arrLen; i++) {
        arr.push(randomFromInterval(MIN_HEIGHT, MAX_HEIGHT));
      }
      const arrayBars = visualizerRef.current.children;
      for (let i = 0; i < bars.length; i++) {
        const arrayBarStyle = arrayBars[i].style;
        arrayBarStyle.backgroundColor = '';
      }
      setBars(arr);
    }
  };

  const changeSpeed = (speed) => {
    if (!isRunning) {
      switch (speed) {
        case 'Fast':
          setDelay(5);
          break;

        case 'Normal':
          setDelay(20);
          break;

        case 'Slow':
          setDelay(100);
          break;

        default:
      }
    }
  };

  const changeArrayLen = (value) => {
    setArrLen(value);
  };

  const sortBars = bars.map((height, index) => (
    <div
      className='sort__arrayBar'
      style={{
        height: `${height}vmin`,
        width: `${100 / arrLen}vw`,
      }}
      key={index}
    ></div>
  ));

  return (
    <div className='sort__container'>
      <Header
        visualize={(algo) => visualizeAlgorithm(algo)}
        resetArray={resetArray}
        changeArrayLen={changeArrayLen}
        changeSpeed={changeSpeed}
      />
      <main className='sort__gridContainer' ref={visualizerRef}>
        {sortBars}
      </main>
    </div>
  );
};

export default Sorting;
