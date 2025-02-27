import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { LoadingProvider } from "./context/LoadingContext";
import AppRoutes from "./routing/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <LoadingProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster />
          </BrowserRouter>
        </LoadingProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App
