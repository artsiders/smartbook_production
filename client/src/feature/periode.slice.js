const { createSlice } = require("@reduxjs/toolkit");

export const periodeSlice = createSlice({
    name: 'periode',
    initialState: {value: 1},

    reducers: {
        setSelected: (state, action) => {
            // {type: "periode/setSelected" payload: 1}
            state.value = action.payload;
        },
    }
})

export const {setSelected} = periodeSlice.actions