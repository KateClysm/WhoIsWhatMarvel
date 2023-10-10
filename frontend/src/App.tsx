import Homepage from "./pages/homepage/Homepage";
import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import InGame from "./pages/InGame/InGame";

const App: React.FC = () => {

  const Layout = () => {
    return (
      <div className="container-app">
        <h1 className="title">¿WHO IS WHAT?</h1>

        <div className="window">
          <Outlet />
        </div>

      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/', 
      element: <Layout />,
      children: [
        {
          path: '/',
          element: 
            <>
             <Homepage/>
            </>
        },
        {
          path: '/playthrough',
          element: <InGame/>
        }
      ]
    },
    {
      path: '/*',
      element: <Homepage />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;