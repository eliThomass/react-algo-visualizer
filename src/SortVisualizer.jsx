import { useState } from "react";
import "./sort.css";
import { bubbleSort, selectionSort } from "./sortAlgorithms";

export default function SortVisualizer() {
  const ARRAY_SIZE = 40;

  const generateArray = () => {
    return Array.from({ length: ARRAY_SIZE }, () =>
      Math.floor(Math.random() * 200) + 10
    );
  };

  const [array, setArray] = useState(generateArray());
  const [isSorting, setIsSorting] = useState(false);

  const newArray = () => {
    if (isSorting) return;
    setArray(generateArray());
  };

  const runSort = async (sortFn) => {
    setIsSorting(true);
    await sortFn([...array], setArray);
    setIsSorting(false);
  };

  return (
    <div id="sort-container">
      <div className="sort-buttons">
        <button onClick={newArray} disabled={isSorting}>Create New Array</button>
        <button onClick={() => runSort(bubbleSort)} disabled={isSorting}>Bubble Sort</button>
        <button onClick={() => runSort(selectionSort)} disabled={isSorting}>Selection Sort</button>
      </div>

      <div id="sort-box">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="bar"
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
