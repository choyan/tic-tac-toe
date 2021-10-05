import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Box from "components/Box";
import { useSelector, useDispatch } from "react-redux";
import { combinationN } from "utils/combinationN";
import { isArrayInArray } from "utils/isArrayInArray";
import { RootState } from "store";
import {
  setOccupiedPosition,
  setPlayers,
  setCurrentMove,
  resetStore,
} from "store/game";

const Home: NextPage = () => {
  const [playerOneMoves, setPlayerOneMoves] = useState([]);
  const [playerTwoMoves, setPlayerTwoMoves] = useState([]);
  // const [currentMove, setCurrentMove] = useState("");
  const [winner, setWinner] = useState("");
  const dispatch = useDispatch();

  const [winningPositions, occupiedPosition, players, currentMove] =
    useSelector((state: RootState) => [
      state.game.winningPositions,
      state.game.occupiedPosition,
      state.game.players,
      state.game.currentMove,
    ]);

  function handleMove(move) {
    if (currentMove === players[0]) {
      if (!occupiedPosition.includes(move)) {
        const newArr = [...playerOneMoves, move];
        const newArrSorted = newArr.slice().sort((a, b) => a - b);
        setPlayerOneMoves(newArrSorted);
        dispatch(setCurrentMove(players[1]));
      }
    } else {
      if (!occupiedPosition.includes(move)) {
        const newArr = [...playerTwoMoves, move];
        const newArrSorted = newArr.slice().sort((a, b) => a - b);
        setPlayerTwoMoves(newArrSorted);
        dispatch(setCurrentMove(players[0]));
      }
    }

    if (!occupiedPosition.includes(move)) {
      dispatch(setOccupiedPosition(move));
    }
  }

  function getSymbol(index: number) {
    if (playerOneMoves.includes(index)) {
      return "X";
    } else if (playerTwoMoves.includes(index)) {
      return "O";
    }
    return "";
  }

  function checkWinner(player, currentPlayer) {
    if (player.length > 2) {
      for (const c of combinationN(player, 3)) {
        const compareComb = isArrayInArray(winningPositions, c);
        if (compareComb) {
          setWinner(currentPlayer);
          reset();
        }
      }
    }
  }

  function reset() {
    setPlayerOneMoves([]);
    setPlayerTwoMoves([]);
    dispatch(resetStore());
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

  return (
    <div className="container mx-auto">
      {/* <form onSubmit={savePlayers}>
        <input type="text" placeholder="Player 1 Name" id="player-1" />
        <input type="text" placeholder="Player 2 Name" id="player-2" />
        <button type="submit">Save</button>
      </form> */}
      <div className="grid grid-cols-3 w-[600px]">
        {[...Array(9)].map((x, i) => (
          <Box index={i} value={getSymbol(i)} handleMove={handleMove} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
