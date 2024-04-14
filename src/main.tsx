import ReactDOM from "react-dom/client";
import "./index.css";
import { AppProvider } from "./components/AppProvider";

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<AppProvider />);
}
