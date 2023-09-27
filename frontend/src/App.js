import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import HomePage from "./pages/HomePage";
import Language from "./pages/Language";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register/>,
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/quiz',
    element: <Quiz/>
  },
  {
    path: '/homepage',
    element: <HomePage/>
  },
  {
    path: '/language',
    element: <Language/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
