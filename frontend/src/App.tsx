import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import ProtectedRoute from "./components/ProtectedRoute";
import MyHotel from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          element={
            <Layout>
              <ProtectedRoute />
            </Layout>
          }
        >
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/my-hotels" element={<MyHotel />} />
          <Route path="/edit-hotel/:id" element={<EditHotel />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
