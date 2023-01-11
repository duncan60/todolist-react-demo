import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomePage, LoginPage, TodoPage, ErrorPage  } from './pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "todos",
    element: <TodoPage />,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
