import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// Amplify imports 
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json"
import { generateClient } from "aws-amplify/api";
// Amplify CSS
import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';

// Custom styles
import "./index.css";

// Amplify configure 
Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
