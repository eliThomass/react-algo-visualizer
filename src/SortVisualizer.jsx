import { useState } from "react";
import "./sort.css";
import { bubbleSort, selectionSort } from "./sortAlgorithms";

export default function SortVisualizer() {
  const ARRAY_SIZE = 40;

  const generateArray = () => {
    return Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 200) + 10);
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
    <div>
      <div className="sort-buttons">
        <button onClick={newArray} disabled={isSorting}>Create New Array</button>
        <button onClick={() => runSort(bubbleSort)} disabled={isSorting}>Bubble Sort</button>
        <button onClick={() => runSort(selectionSort)} disabled={isSorting}>Selection Sort</button>
      </div>

      <div id="sort-box" style={{ display: "flex", alignItems: "flex-end", gap: "2px", border: "1px solid black", height: "300px", background: "#fafafa" }}>
        {array.map((value, idx) => (
          <div
            key={idx}
            className="bar"
            style={{ width: "10px", height: `${value}px`, backgroundColor: "rgba(97, 178, 70, 1)" }}
          ></div>
        ))}
      </div>
    </div>
  );
}
 