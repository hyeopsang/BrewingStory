import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const idSlice = createSlice({
  name: "id",
  initialState: [], // 초기 상태를 빈 배열로 설정
  // idSlice의 초기 상태를 빈 배열로 설정합니다.
  reducers: {
    setId: (state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

export const { setId } = idSlice.actions;
export default idSlice.reducer;
