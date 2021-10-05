import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Box from "components/Box";
import { useSelector, useDispatch } from "react-redux";
import { combinationN } from "utils/combinationN";
import { RootState } from "store";
import { setOccupiedPosition } from "store/game";

const Home: NextPage = () => {
  const [playerOneMoves, setPlayerOneMoves] = useState([]);
  const [playerTwoMoves, setPlayerTwoMoves] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentMove, setCurrentMove] = useState("");
  const [winner, setWinner] = useState("");
  const dispatch = useDispatch();

  const [winningPositions, occupiedPosition] = useSelector(
    (state: RootState) => [
      state.game.winningPositions,
      state.game.occupiedPosition,
    ]
  );

  function handleMove(move) {
    if (currentMove === players[0]) {
      if (!occupiedPosition.includes(move)) {
        const newArr = [...playerOneMoves, move];
        const newArrSorted = newArr.slice().sort((a, b) => a - b);
        setPlayerOneMoves(newArrSorted);
        setCurrentMove(players[1]);
      }
    } else {
      if (!occupiedPosition.includes(move)) {
        const newArr = [...playerTwoMoves, move];
        const newArrSorted = newArr.slice().sort((a, b) => a - b);
        setPlayerTwoMoves(newArrSorted);
        setCurrentMove(players[0]);
      }
    }

    if (!occupiedPosition.includes(move)) {
      dispatch(setOccupiedPosition(move));
      // setOccupiedPosition((occupiedPosition) => [...occupiedPosition, move]);
    }
  }

  function getSymbol(index) {
    if (playerOneMoves.includes(index)) {
      return "X";
    } else if (playerTwoMoves.includes(index)) {
      return "O";
    }
    return "";
  }
  function isArrayInArray(arr, item) {
    let item_as_string = JSON.stringify(item);
    let contains = arr.some(function (ele) {
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }

  function checkWinner(player, currentPlayer) {
    if (player.length > 2) {
      for (const c of combinationN(player, 3)) {
        const compareComb = isArrayInArray(winningPositions, c);
        if (compareComb) {
          setWinner(currentPlayer);
          // reset();
        }
      }
    }
  }

  function reset() {
    setPlayerOneMoves([]);
    setPlayerTwoMoves([]);
    setOccupiedPosition([]);
    setPlayers([]);
  }

  useEffect(() => {
    if (occupiedPosition.length === 9) {
      if (!winner) {
        console.log("Match Drawn. Resetting the board");
        reset();
      }
    }
  }, [occupiedPosition]);

  useEffect(() => {
    checkWinner(playerOneMoves, players[0]);
  }, [playerOneMoves]);

  useEffect(() => {
    checkWinner(playerTwoMoves, players[1]);
  }, [playerTwoMoves]);

  function savePlayers(e) {
    e.preventDefault();
    if (!e.target[0].value || !e.target[1].value) {
      alert("We need two players");
    } else {
      const newPlayers = [e.target[0].value, e.target[1].value];
      setPlayers(newPlayers);
      setCurrentMove(e.target[0].value);
    }
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={savePlayers}>
        <input type="text" placeholder="Player 1 Name" id="player-1" />
        <input type="text" placeholder="Player 2 Name" id="player-2" />
        <button type="submit">Save</button>
      </form>
      <div className="grid grid-cols-3 w-[600px]">
        {[...Array(9)].map((x, i) => (
          <Box index={i} value={getSymbol(i)} handleMove={handleMove} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
