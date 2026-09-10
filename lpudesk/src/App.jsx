import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import DeskAvailability from "./pages/DeskAvailability.jsx";
import BookFinder from "./pages/BookFinder.jsx";
import LibraryGuide from "./pages/LibraryGuide.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AdminDemo from "./pages/AdminDemo.jsx";
import Auth from "./pages/Auth.jsx";
import Requests from "./pages/Requests.jsx";
import RequestDetail from "./pages/RequestDetail.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

/**
 * App holds the common layout (navbar + footer) and all the routes.
 * Every page is a separate file inside src/pages.
 */
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/desk-availability" element={<DeskAvailability />} />
          <Route path="/book-finder" element={<BookFinder />} />
          <Route path="/library-guide" element={<LibraryGuide />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminDemo />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/requests/:id" element={<RequestDetail />} />
          <Route path="/admin/control" element={<AdminDashboard />} />
          {/* Fallback route for unknown URLs */}
          <Route
            path="*"
            element={
              <div className="p-16 text-center text-slate-600">
                Page not found. Please use the menu above.
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
