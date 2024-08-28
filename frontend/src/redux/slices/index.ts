import { ReceiptProps } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface sessionState {
    receipts: ReceiptProps[];
}
const initialState: sessionState = {
    receipts: [],
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setReceipts: (state, action: PayloadAction<ReceiptProps[]>) => {
            state.receipts = action.payload;
        },
    },
});

export const { setReceipts } = sessionSlice.actions;
export default sessionSlice.reducer;
