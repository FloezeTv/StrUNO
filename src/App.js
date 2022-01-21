import './App.css';
import Hand from './players/hand';

const hand = [
  {
    color: "red",
    value: 0
  },
  {
    color: "black",
    value: "wild+4"
  },
  {
    color: "blue",
    value: "reverse"
  },
  {
    color: "green",
    value: "draw"
  },
  {
    color: "black",
    value: "wild"
  },
  {
    color: "green",
    value: "skip"
  },
];

function App() {
  return (
    <Hand cards={hand} sort={true} />
  );
}

export default App;
