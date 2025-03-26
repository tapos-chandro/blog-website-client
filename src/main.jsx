import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider} from "@chakra-ui/react"; 
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import theme from "./theme.js";









createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ChakraProvider>
  </StrictMode>
);
