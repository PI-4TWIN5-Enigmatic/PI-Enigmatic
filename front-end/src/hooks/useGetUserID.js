export const useGetUserID = () => {
    return window.localStorage.getItem("id"),
     window.localStorage.getItem("picture");
  };