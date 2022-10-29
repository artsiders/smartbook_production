import { periodeSlice } from "../feature/periode.slice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        periode:  periodeSlice.reducer,
    }
})