import { Navigation } from "./src/components/Home/Navigation";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getUserData } from "./src/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks/useAppStore";
function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <>
      {!loading ? (
        <div className="min-h-screen bg-white">
          <Navigation />
          <Outlet />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}

export default App;
