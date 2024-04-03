// Importerer nødvendige React-hooks og komponenter samt RTK Query hook til datalogning
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../app/productsApi';
import ProductFilter from '../../components/ProductFilter';
import Search from '../../components/Search';

function ProductsList() {
  // useState hook til at opbevare og opdatere filtertilstanden. Dette anvendes til at filtrere produktlisten baseret på kategori.
  const [filter, setFilter] = useState('');
  // useState hook til at opbevare og opdatere søgeterm. Dette anvendes til at filtrere produktlisten baseret på søgeterm.
  const [searchTerm, setSearchTerm] = useState('');
  // Bruger useGetProductsQuery hook fra RTK Query til at hente produkter. Dette hook håndterer automatisk
  // caching, loading og fejlhåndtering af API-kald. '1000' er argumentet sendt til hook, der angiver antallet af produkter vi ønsker at hente.
  const { data: products, error, isLoading } = useGetProductsQuery(1000);

  // Viser en loading-meddelelse, mens data hentes.
  if (isLoading) return <div>Loading...</div>;
  // Viser en fejlmeddelelse, hvis der opstår fejl under datahentning.
  if (error) return <div>Error: {error.toString()}</div>;

  // Funktion til at opdatere filtertilstanden baseret på valgt kategori.
  const handleFilter = category => {
    setFilter(category);
  };

  // Funktion til at opdatere søgetermtilstanden, når brugeren indtaster et søgeord.
  const handleSearch = term => {
    setSearchTerm(term);
  };

  // Filtrerer produkter baseret på kategori og søgeterm. Denne filtrering sker på klienten.
  const filteredProducts = products
    .filter(product => product.category === filter || filter === '')
    .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="products-list">
      <h1>Products</h1>
      {/* Komponent til at filtrere produkter baseret på kategori. onFilter callback gør det muligt
          for ProductFilter at kommunikere valgte filter tilbage til ProductsList. */}
      <ProductFilter onFilter={handleFilter} />
      {/* Søgekomponent, hvor onSearch callback gør det muligt for Search at kommunikere søgetermet tilbage til ProductsList. */}
      <Search onSearch={handleSearch} />
      {/* Viser den filtrerede liste af produkter. Link-komponenten fra React Router anvendes til at oprette navigerbare links til hver produktdetaljeside. */}
      <ul className="product-items">
        {filteredProducts.map((product) => (
          <li key={product.id} className="product-item">
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
