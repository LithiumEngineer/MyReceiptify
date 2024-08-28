import { RootState } from "../store";

export const selectReceipts = (state: RootState) => state.session.receipts;
