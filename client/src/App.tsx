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
import { useJwtToken } from "./hooks/useJwtToken"; // Assuming this is your custom hook
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Create a QueryClient instance for react-query
const queryClient = new QueryClient();

// Main layout component with a header and outlet for rendering pages
function MainLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header appears on all pages */}
      <Header />
      <ToastContainer
        position="bottom-right"
        autoClose={7000}
        newestOnTop={true}
        draggable={false}
        hideProgressBar={true}
      />
      <div className="flex-grow">
        {/* Outlet is where the child route components will render */}
        <Outlet />
      </div>
    </div>
  );
}

// ProtectedRoute component to handle route protection
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useJwtToken();

  // Wait until loading is complete before making a decision
  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  // If the user is not logged in, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, allow access to the child routes
  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public route for the login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Define child routes that require authentication */}
            <Route index element={<HomePage />} /> {/* Default route for "/" */}
            <Route path="debug" element={<DebugPage />} />
            <Route path="character-sheet" element={<CharacterSheetPage />} />
            <Route path="character-creation" element={<CharacterCreationPage />} />
            <Route path="character-selection" element={<CharacterSelectionPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
