import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Root from "./component/Root";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegisterPage";
import CreateRecipesPage from "./pages/createRecipes/CreateRecipesPage";

const router = createBrowserRouter([
  {
    path:'/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/createRecipes",
        element: <CreateRecipesPage />
      }
    ]
  }
]);


function App() {
  
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
  );
}

export default App
