import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomePage, LoginPage, SignUpPage, TodoPage, ErrorPage  } from './pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "todos",
        element: <TodoPage />,
      },
    ]
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
