import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Loginpage from "./pages/Login";
import DocumentViewer from "./pages/DocumentViewer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { DocumentProvider } from "./DocumentContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { store, persistor } from "./store"; // Đảm bảo import cả store và persistor
import { AuthProvider } from "./context/AuthProvider";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>
          <AuthProvider>
     
            <DocumentProvider>
              <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/document/:id" element={<DocumentViewer />} />
                <Route path="/task-file/:fileUrl" element={<DocumentViewer />} />
              </Routes>
            </DocumentProvider>
          </AuthProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
