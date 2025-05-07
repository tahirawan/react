import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import AboutPage from "./pages/About";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetail from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
        // This is the default route
        // The index route is the default route that will be rendered when the path matches the parent route
      { index: true,  element: <HomePage /> },
      // { path: '',  element: <HomePage /> },
      { path: 'about',  element: <AboutPage /> },
      { path: 'products',  element: <ProductsPage /> },
      { path: 'products/:productId',  element: <ProductDetail /> },
    ]
  },
]);



function App() {
  return <RouterProvider router={router} />;
}

export default App;
