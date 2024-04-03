// Grundlæggende imports fra React, React Router, og RTK Query, samt brugerdefinerede komponenter.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../app/productsApi';
import ProductFilter from '../../components/ProductFilter';
import Search from '../../components/Search';

function ProductsList() {
  // useState til at opbevare og opdatere filtertilstanden, som repræsenterer den valgte kategori til filtrering.
  const [filter, setFilter] = useState('');
  // useState til at opbevare og opdatere søgetermtilstanden, som bruges til at filtrere produkter baseret på titler.
  const [searchTerm, setSearchTerm] = useState('');
  // Bruger RTK Query's useGetProductsQuery hook til at hente produkter med et limit argument. Hooket tager sig af loading, fejlhåndtering, og caching.
  const { data: products, error, isLoading } = useGetProductsQuery(1000);

  // Viser en loading meddelelse, mens data hentes fra API'et.
  if (isLoading) return <div>Loading...</div>;
  // Viser en fejlmeddelelse, hvis der er opstået en fejl under hentningen af data.
  if (error) return <div>Error: {error.toString()}</div>;

  // Opdaterer filtertilstanden baseret på brugerens valg i ProductFilter komponenten.
  const handleFilter = category => {
    setFilter(category);
  };

  // Opdaterer søgetermtilstanden baseret på brugerens input i Search komponenten.
  const handleSearch = term => {
    setSearchTerm(term);
  };

  // Filtreringslogik, der først filtrerer produkter baseret på kategori og derefter baseret på søgeterm.
  // Denne filtrering sker på klient-siden med de produkter, der allerede er hentet.
  const filteredProducts = products
    .filter(product => product.category === filter || filter === '')
    .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // Returnerer JSX for at vise den filtrerede produktliste.
  return (
    <div className="products-list">
      <h1>Products</h1>
      {/* ProductFilter komponenten tager en prop, onFilter, som er en funktion der tillader at opdatere filtertilstanden. */}
      <ProductFilter onFilter={handleFilter} />
      {/* Search komponenten tager en prop, onSearch, som er en funktion der tillader at opdatere søgetermtilstanden. */}
      <Search onSearch={handleSearch} />
      {/* Itererer over den filtrerede produktliste og viser hvert produkt som et link til dens detaljeside. */}
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
