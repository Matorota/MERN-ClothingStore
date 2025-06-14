import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductSection from "./components/ProductSection";
import UpdateProduct from "./components/UpdateProduct";
import Layout from "./components/Layouts/Layout";
import StartPage from "./pages/StartPage";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/product" element={<ProductSection />} />
          <Route path="/support" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />

          <Route path="/update-product/:id" element={<UpdateProduct />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
