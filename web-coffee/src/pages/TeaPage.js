import React, { useEffect, useState } from 'react';
import './TeaPage.css'; // Đổi tên file CSS cho mục trà
import ProductModal from '../components/ProductModal'; // Import từ src/components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import FloatingButton from '../components/FloatingButton'; // Import FloatingButton
import CartButton from '../components/CartButton'; // Import CartButton

const TeaPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Quản lý sản phẩm được chọn để hiển thị modal

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch('https://localhost:7030/api/Product/getall')
      .then((response) => response.json())
      .then((data) => {
        if (data?.$values) {
          // Lọc chỉ lấy sản phẩm thuộc danh mục "Trà"
          const teaProducts = data.$values.filter(
            (product) => product.categoryName === 'Trà' // Lọc theo category "Trà"
          );
          setProducts(teaProducts);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Gán sản phẩm được chọn để mở modal
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Đóng modal khi không cần thiết
  };

  return (
    <div className="tea-page-container">
      <div className="tea-section-title">Trà</div>
      <div className="tea-section-subtitle">
        Trà là một trong những thức uống thanh tao, được yêu thích ở nhiều nền văn hóa. Từ trà đen, trà xanh đến các loại trà sữa hiện đại, mỗi loại trà mang một hương vị riêng biệt.
      </div>
      <div className="tea-product-grid">
        {products.map((product) => (
          <TeaProductCard
            key={product.id}
            product={product}
            onBuy={() => handleProductClick(product)} // Gọi hàm khi user ấn "Đặt mua"
          />
        ))}
      </div>

      {/* Hiển thị modal khi có sản phẩm được chọn */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}

      {/* Hiển thị nút giỏ hàng và hotline ở cuối trang */}
      <CartButton />
      <FloatingButton />
    </div>
  );
};

const TeaProductCard = ({ product, onBuy }) => {
  // Tạo URL đầy đủ cho hình ảnh (nếu `imageUrl` là đường dẫn tương đối)
  const imageUrl = `https://localhost:7030/${product.imageUrl}`;

  return (
    <div className="tea-product-card">
      <img src={imageUrl} alt={product.name} />
      <div className="tea-product-name">{product.name}</div>
      <div className="tea-product-price">{product.price.toLocaleString()} đ</div>
      <button className="tea-btn-buy" onClick={onBuy}>
        <FontAwesomeIcon icon={faShoppingCart} /> Đặt mua
      </button>
    </div>
  );
};

export default TeaPage;
