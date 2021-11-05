import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";
import "materialize-css";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthtenticated = !!token;
  const routes = useRoutes(isAuthtenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthtenticated,
      }}
    >
      <Router>
        {isAuthtenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
