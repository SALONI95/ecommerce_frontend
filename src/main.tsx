//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { store } from "./src/store/store.ts";
import { Provider } from "react-redux";
import routes from "./src/routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
  //</StrictMode>
);
