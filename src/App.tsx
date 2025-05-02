import { Navigation } from "./src/components/Home/Navigation";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getUserData } from "./src/store/slices/authSlice";
import { useAppDispatch } from "./hooks/useAppStore";
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Outlet />
      </div>
    </>
  );
}

export default App;
