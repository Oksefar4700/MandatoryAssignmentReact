// Importerer React til at oprette komponenten.
import React from 'react';

// Definerer ProductFilter komponenten, som modtager en prop ved navn onFilter. Denne prop er en funktion,
// der vil blive kaldt, når brugeren vælger en ny filterkategori fra dropdown-menuen.
function ProductFilter({ onFilter }) {
  // Definerer en event handler, handleFilterChange, som vil blive kaldt, hver gang brugeren
  // ændrer valget i dropdown-menuen. Event handleren kalder onFilter funktionen, som er givet
  // til komponenten som en prop, og videregiver den valgte værdi.
  const handleFilterChange = event => {
    onFilter(event.target.value);
  };

  // Returnerer JSX for ProductFilter komponenten. Den indeholder en <label> og en <select> element,
  // hvor sidstnævnte anvender handleFilterChange funktionen som en event handler for onChange eventet.
  return (
    <div>
      <label htmlFor="filter">Filter by category:</label> {/* Label for dropdown-menuen */}
      <select id="filter" onChange={handleFilterChange}> {/* Dropdown-menuen til at vælge filter */}
        <option value="">All</option> {/* Option for at vise alle produkter, dvs. intet filter */}
        <option value="electronics">Electronics</option> {/* Option for elektronik */}
        <option value="jewelery">Jewelery</option> {/* Option for smykker */}
        <option value="women's clothing">womens clothing</option> {/* Option for kvinders tøj */}
        <option value="men's clothing">Clothing</option> {/* Option for mænds tøj */}
      </select>
    </div>
  );
}

// Eksporterer ProductFilter komponenten, så den kan importeres og bruges i andre dele af applikationen.
export default ProductFilter;
