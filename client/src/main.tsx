import { createRoot } from "react-dom/client";
import App from "./App";
import { BookingProvider } from "./context/BookingContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BookingProvider>
    <App />
  </BookingProvider>
);
