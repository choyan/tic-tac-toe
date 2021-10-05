import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface gameState {
  winningPositions: number[][];
  occupiedPosition: number[];
  players: string[];
  currentMove: string;
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
  currentMove: "",
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
    setCurrentMove: (state, action: PayloadAction<string>) => {
      state.currentMove = action.payload;
    },
    resetStore: (state) => {
      state.occupiedPosition = [];
      state.players = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOccupiedPosition, setPlayers, setCurrentMove, resetStore } =
  gameSlice.actions;

export default gameSlice.reducer;
