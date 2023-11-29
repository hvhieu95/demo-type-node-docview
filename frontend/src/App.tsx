import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import DocumentViewer from "./component/DocumentViewer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { DocumentProvider } from "./DocumentContext";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from "./store"; // Đảm bảo import cả store và persistor

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}> {/* Thêm PersistGate */}
        <Router>
          <DocumentProvider>
            <div className="App">
              <header className="bg-light p-3 sticky-top border-bottom-custom">
                Document
              </header>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/document/:id" element={<DocumentViewer />} />
              </Routes>
            </div>
          </DocumentProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
