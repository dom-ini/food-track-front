import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Missing404 from "./components/Missing404";
import Home from "./components/Home";
import Account from "./components/Account";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import RequireNoAuth from "./components/RequireNoAuth";
import ConfirmEmail from "./components/ConfirmEmail";
import RequestPasswordReset from "./components/RequestPasswordReset";
import PasswordReset from "./components/PasswordReset";
import GoalsSet from "./components/GoalsSet";
import ProductAdd from "./components/ProductAdd";

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
              element={<PasswordReset />}
            />
          </Route>

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/konto" element={<Account />} />
            <Route path="/cele" element={<GoalsSet />} />
            <Route path="/dodaj-produkt" element={<ProductAdd />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing404 />} />
      </Routes>
    </>
  );
}

export default App;
