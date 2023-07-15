import "./App.css";
import Footer from "./components/Footer/Footer.js";
import Header from "./components/Header/Header.js";
import LandingPage from "./screens/LandingPage/LandingPage";
import {
  BrowserRouter,
  Route,
  Routes,
  // createBrowserRouter,
  // RouterProvider,
} from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LandingPage />,
//   },
//   {
//     path: "/mynotes",
//     element: <MyNotes />,
//   },
// ]);

const App = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/note/:id" element={<SingleNote />} />
        </Routes>
        {/* <RouterProvider router={router} /> */}
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
