import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

// Import your pages
import DebugPage from "./pages/debugPage";
import HomePage from "./pages/homePage";
import CharacterCreationPage from "./pages/characterCreationPage";
import CharacterSheetPage from "./pages/characterSheetPage";
import CharacterSelectionPage from "./pages/characterSelectionPage";
import LoginPage from "./pages/loginPage";
import Header from "./components/header";
import { useJwtToken } from "./hooks/useJwtToken";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Practice from "./pages/practice";
import DiceComponent from "./components/diceComponent";
import NumberDNumber from "./components/numberDNumber";
import CharacterEditPage from "./pages/characterEditPage";
import SignupPage from "./pages/signupPage";
const queryClient = new QueryClient();

function MainLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <ToastContainer
        position="bottom-right"
        autoClose={7000}
        newestOnTop={true}
        draggable={false}
        hideProgressBar={true}
      />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useJwtToken();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="register" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="debug" element={<DebugPage />} />
            <Route path="dice" element={<NumberDNumber />} />

            <Route path="character-creation" element={<CharacterCreationPage />} />
            <Route path="character-selection" element={<CharacterSelectionPage />} />
            <Route path="character-edit/:characterId" element={<CharacterEditPage />} />
            <Route path="character-sheet/:characterId" element={<CharacterSheetPage />} />

          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
