import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface gameState {
  winningPositions: number[][];
  occupiedPosition: number[];
  players: string[];
  playerOneMoves: number[];
  playerTwoMoves: number[];
  currentMove: string;
  winner: string;
  finished: boolean;
}

const initialState: gameState = {
  winningPositions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  occupiedPosition: [],
  players: [],
  playerOneMoves: [],
  playerTwoMoves: [],
  currentMove: "",
  winner: "",
  finished: false,
};

export const gameSlice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    setOccupiedPosition: (state, action: PayloadAction<number>) => {
      state.occupiedPosition.push(action.payload);
    },
    setPlayers: (state, action: PayloadAction<string[]>) => {
      state.players = action.payload;
    },
    setPlayerOneMoves: (state, action: PayloadAction<number[]>) => {
      state.playerOneMoves = action.payload;
    },
    setPlayerTwoMoves: (state, action: PayloadAction<number[]>) => {
      state.playerTwoMoves = action.payload;
    },
    setCurrentMove: (state, action: PayloadAction<string>) => {
      state.currentMove = action.payload;
    },
    setWinner: (state, action: PayloadAction<string>) => {
      state.winner = action.payload;
    },
    setFinished: (state, action: PayloadAction<boolean>) => {
      state.finished = action.payload;
    },
    resetStore: (state) => {
      state.occupiedPosition = [];
      state.players = [];
      state.winner = "";
      state.playerOneMoves = [];
      state.playerTwoMoves = [];
      state.finished = false;
    },
  },
});

export const {
  setOccupiedPosition,
  setPlayers,
  setPlayerOneMoves,
  setPlayerTwoMoves,
  setCurrentMove,
  setWinner,
  resetStore,
  setFinished,
} = gameSlice.actions;

export default gameSlice.reducer;
