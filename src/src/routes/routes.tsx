import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import AuthMain from "../pages/auth/MainAuth";
import VerifyEmail from "../components/auth/VerifyEmail";
import App from "@/App";
import Home from "../pages/Home";
import ResetPassword from "../components/auth/reset-password";
import { Products } from "../pages/Products";
import { ProductDetails } from "../pages/ProductDetails";
import { ShowWishlist } from "../pages/showWishlist";
import ShowCart from "../pages/showCart";
// import ProtectedRoute from "./protectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",
        element: <AuthMain />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/verify-email",
            element: <VerifyEmail />,
          },
          {
            path: "/reset-password/:token?",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "/products/:categoryId?",
        element: <Products />,
      },
      {
        path: "/wishlist",
        element: (
          <ShowWishlist />
          // <ProtectedRoute>
          //   <ShowWishlist />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ShowCart />
          // <ProtectedRoute>
          //   <ShowWishlist />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "*",
        element: (
          <>
            <h1>Not found</h1>
          </>
        ),
      },
    ],
  },
]);

export default routes;
