import React from 'react';
import { productsApi } from './app/productsApi';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { store } from './app/store';
import Header from './components/Header';
import ProductDetail from './features/products/ProductsDetail';
import ProductsList from './features/products/ProductsList';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
