import { useEffect } from "react";
import type { NextPage } from "next";
import Box from "components/Box";
import MoveLog from "components/MoveLog";
import { useSelector, useDispatch } from "react-redux";
import { combinationN } from "utils/combinationN";
import { isArrayInArray } from "utils/isArrayInArray";
import { RootState } from "store";
import { useRouter } from "next/router";
import {
  setOccupiedPosition,
  setCurrentMove,
  resetStore,
  setWinner,
  setPlayerOneMoves,
  setPlayerTwoMoves,
  setFinished,
  setMoveLog,
} from "store/game";

const Game: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [
    winningPositions,
    occupiedPosition,
    players,
    playerOneMoves,
    playerTwoMoves,
    currentMove,
    winner,
  ] = useSelector((state: RootState) => [
    state.game.winningPositions,
    state.game.occupiedPosition,
    state.game.players,
    state.game.playerOneMoves,
    state.game.playerTwoMoves,
    state.game.currentMove,
    state.game.winner,
  ]);

  function handlePlayerMove(playerMove, setPlayerMove, move) {
    const newArr = [...playerMove, move];
    const newArrSorted = newArr.slice().sort((a, b) => a - b);
    dispatch(setPlayerMove(newArrSorted));
  }

  function handleMove(move) {
    if (!occupiedPosition.includes(move)) {
      if (currentMove === players[0]) {
        handlePlayerMove(playerOneMoves, setPlayerOneMoves, move);
        dispatch(
          setMoveLog({
            location: move,
            playerName: players[0],
          })
        );
        dispatch(setCurrentMove(players[1]));
      } else {
        handlePlayerMove(playerTwoMoves, setPlayerTwoMoves, move);
        dispatch(setCurrentMove(players[0]));
        dispatch(
          setMoveLog({
            location: move,
            playerName: players[1],
          })
        );
      }
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
          dispatch(setWinner(currentPlayer));
          dispatch(setFinished(true));
        }
      }
    }
  }

  function reset() {
    dispatch(resetStore());
  }

  useEffect(() => {
    if (players.length === 0) {
      router.push("/");
    }
  }, [players]);

  useEffect(() => {
    checkWinner(playerOneMoves, players[0]);
  }, [playerOneMoves]);

  useEffect(() => {
    checkWinner(playerTwoMoves, players[1]);
  }, [playerTwoMoves]);

  useEffect(() => {
    if (occupiedPosition.length === 9) {
      dispatch(setFinished(true));
      if (!winner) {
        alert("Match is Drawn.");
      }
    }
  }, [occupiedPosition]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="mb-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {winner ? `Winner Is ${winner}!!!` : `Current Move: ${currentMove}`}
      </h2>
      <button
        type="button"
        className="mb-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={reset}
      >
        Reset game
      </button>
      <div className="grid grid-cols-3 w-[600px]">
        {[...Array(9)].map((x, i) => (
          <Box index={i} value={getSymbol(i)} handleMove={handleMove} key={i} />
        ))}
      </div>
      <MoveLog />
    </div>
  );
};

export default Game;
