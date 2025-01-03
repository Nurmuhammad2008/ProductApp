import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { CreateProduct } from './pages/CreateProduct';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/" element={<Navigate to="/products" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
