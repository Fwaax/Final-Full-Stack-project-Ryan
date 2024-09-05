import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DebugPage from "./pages/debugPage";
import HomePage from "./pages/homePage";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const queryClient = new QueryClient()


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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
