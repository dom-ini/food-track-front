import { Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import Missing404 from "./layouts/Missing404";

import Home from "./pages/Home";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmail from "./pages/ConfirmEmail";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import ResetPassword from "./pages/ResetPassword";
import SetGoals from "./pages/SetGoals";
import AddProduct from "./pages/AddProduct";

import RequireAuth from "./routes/RequireAuth";
import RequireNoAuth from "./routes/RequireNoAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route element={<RequireNoAuth />}>
            <Route path="logowanie" element={<Login />} />
            <Route path="rejestracja" element={<Register />} />
            <Route path="aktywuj-konto/:key" element={<ConfirmEmail />} />
            <Route path="resetuj-haslo" element={<RequestPasswordReset />} />
            <Route
              path="resetuj-haslo/:uid/:token"
              element={<ResetPassword />}
            />
          </Route>

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/konto" element={<Account />} />
            <Route path="/cele" element={<SetGoals />} />
            <Route path="/dodaj-produkt" element={<AddProduct />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing404 />} />
      </Routes>
    </>
  );
}

export default App;
