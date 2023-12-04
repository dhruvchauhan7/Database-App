import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import "../style.scss";
import { AuthContext } from "../context/authContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [highestPriceProducts, setHighestPriceProducts] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/backend/products/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially set filteredProducts to all products
        findHighestPriceProducts(response.data); // Find highest price products for each category
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchCategory(keyword);

    const filtered = products.filter((product) =>
      product.category.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const findHighestPriceProducts = (productsData) => {
    // Group products by category
    const groupedProducts = productsData.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});

    // Find highest price product for each category
    const highestPriceProducts = Object.keys(groupedProducts).map((category) => {
      const productsInCategory = groupedProducts[category];
      const highestPriceProduct = productsInCategory.reduce((prev, current) => {
        return prev.price > current.price ? prev : current;
      });
      return highestPriceProduct;
    });

    setHighestPriceProducts(highestPriceProducts);
  };

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search by category"
        value={searchCategory}
        onChange={handleSearch}
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.p_id}>
            <h3>{product.title}</h3>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            
            {currentUser?.u_id !== product.u_id ? (
              <Link to={`/products/${product.p_id}/add-review`}>Add Review</Link>
            ) : (
              <span>Cannot add review for your own product</span>
            )}
          </li>
        ))}
      </ul>

      <h2>Highest Price Products in Each Category:</h2>
      <ul>
        {highestPriceProducts.map((product) => (
          <li key={product.p_id}>
            <h3>{product.title}</h3>
            {/* <p>Description: {product.description}</p> */}
            <h4>Category: {product.category}</h4>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
