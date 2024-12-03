import React, { useEffect, useState } from 'react';
import './CoffeePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ProductModal from '../components/ProductModal'; // Import modal
import FloatingButton from '../components/FloatingButton'; // Chỉ cần import 1 lần
import CartButton from '../components/CartButton'; // Chỉ cần import 1 lần

const CoffeePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Thêm state để lưu sản phẩm chọn

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch('https://localhost:7030/api/Product/getall')
      .then((response) => response.json())
      .then((data) => {
        if (data?.$values) {
          // Lọc chỉ lấy sản phẩm thuộc danh mục "Cà phê"
          const coffeeProducts = data.$values.filter((product) => 
            product.categoryName === 'Coffee'
          );
          setProducts(coffeeProducts);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleBuyClick = (product) => {
    setSelectedProduct(product); // Khi nhấn đặt mua, lưu sản phẩm đã chọn
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Đóng modal
  };

  return (
    <div className="coffee-page-container">
      <div className="coffee-section-title">Cà phê</div>
      <div className="coffee-section-subtitle">
        Cà phê là một trong những thức uống phổ biến nhất trên thế giới. Từ cà phê đen truyền thống đến các biến thể hiện đại như cappuccino, latte, cà phê không chỉ giúp tỉnh táo mà còn mang lại những trải nghiệm thú vị.
      </div>
      <div className="coffee-product-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onBuyClick={handleBuyClick} // Truyền hàm mở modal
          />
        ))}
      </div>

      {/* Hiển thị modal khi có sản phẩm được chọn */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Hiển thị nút giỏ hàng và hotline ở cuối trang */}
      <CartButton />
      <FloatingButton />
    </div>
  );
};

const ProductCard = ({ product, onBuyClick }) => {
  // Tạo URL đầy đủ cho hình ảnh
  const imageUrl = `https://localhost:7030/${product.imageUrl}`;

  return (
    <div className="coffee-product-card">
      <img src={imageUrl} alt={product.name} />
      <div className="coffee-product-name">{product.name}</div>
      <div className="coffee-product-price">{product.price.toLocaleString()} đ</div>
      <button className="coffee-btn-buy" onClick={() => onBuyClick(product)}>
        <FontAwesomeIcon icon={faShoppingCart} /> Đặt mua
      </button>
    </div>
  );
};

export default CoffeePage;
