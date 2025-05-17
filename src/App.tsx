import { Route, BrowserRouter as Router, Routes } from "react-router";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UnauthenticatedRoute from "./components/auth/UnauthenticatedRoute";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import Home from "./pages/Dashboard/Home";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/Table";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Protected Routes wrapped with AppLayout */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="/" element={<Home />} />
          <Route path="/tables" element={<BasicTables />} />
        </Route>

        {/* Auth Layout Routes (e.g., SignIn, SignUp) - only for unauthenticated users */}
        <Route element={<UnauthenticatedRoute />}>
          <Route path="/signin" element={<SignIn />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
