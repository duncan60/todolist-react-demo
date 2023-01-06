import { AuthProvider } from 'contexts/AuthContext';
import {
  Outlet,
} from "react-router-dom";
const HomePage = () => {
  return (
    <AuthProvider>
      <div>React Todo List</div>
      <Outlet />
    </AuthProvider>
  )
};

export default HomePage;
