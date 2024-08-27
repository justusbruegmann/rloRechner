import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Home from './pages/home';
import ListPage from "./pages/listPage";
import CalculatorPage from "./pages/calculatorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <div>Not found</div>,
    },{
        path: "/list",
        element: <ListPage/>,

    },{
        path: "/calculator",
        element: <CalculatorPage/>,
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <div className="bg-gunmetal text-white  ">
          <RouterProvider router={router}  />
      </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
