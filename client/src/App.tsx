import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemsPage } from "./pages/ItemsPage";
import { ItemCreatePage } from "./pages/ItemCreatePage";
import { ItemEditPage } from "./pages/ItemEditPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: 12 }}>
        <Routes>
          <Route path="/" element={<ItemsPage />} />
          <Route path="/items/create" element={<ItemCreatePage />} />
          <Route path="/items/:id/edit" element={<ItemEditPage />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
};
