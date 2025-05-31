import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductSection from "./components/ProductSection";
import UpdateProduct from "./components/UpdateProduct";
import Layout from "./components/Layouts/Layout";
import StartPage from "./pages/StartPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/product" element={<ProductSection />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
