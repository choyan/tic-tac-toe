import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface gameState {
  winningPositions: number[][];
  occupiedPosition: number[];
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
};

export const gameSlice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    setOccupiedPosition: (state, action: PayloadAction<number>) => {
      state.occupiedPosition.push(action.payload);
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOccupiedPosition, decrement, incrementByAmount } =
  gameSlice.actions;

export default gameSlice.reducer;
