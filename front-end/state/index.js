

export const authSlice = ({
    setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    })
    export const {  setLogin } =
  authSlice.actions;
export default authSlice.reducer;
 