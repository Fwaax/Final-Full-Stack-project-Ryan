import DebugPage from "./pages/debugPage";
import HomePage from "./pages/homePage"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/debug",
    element: <DebugPage />,
  }
]);



function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
