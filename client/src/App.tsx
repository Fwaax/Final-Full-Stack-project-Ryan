import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DebugPage from "./pages/debugPage";
import HomePage from "./pages/homePage";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CharacterSheetPage from "./pages/characterSheetPage";

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
  ,
  {
    path: "/character-sheet",
    element: <CharacterSheetPage />,
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
