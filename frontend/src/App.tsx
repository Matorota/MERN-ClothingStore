import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductSection from "./components/ProductSection";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductSection />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
