import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MenuProduct.css';


const MenuProduct = () => {
  const [products, setProducts] = useState({
    coffee: [],
    tea: [],
    milkTea: [],
    cake: [],
    iceBlended: []
  });
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Lỗi nếu có

  // Hàm gọi API để lấy sản phẩm
  const fetchProducts = () => {
    fetch('https://localhost:7030/api/Product/getall')
      .then((response) => response.json())
      .then((data) => {
        if (data?.$values) {
          // Phân loại sản phẩm theo từng loại dựa trên categoryName
          const categorizedProducts = {
            coffee: [],
            tea: [],
            milkTea: [],
            cake: [],
            iceBlended: []
          };

          // Phân loại từng sản phẩm vào các nhóm tương ứng
          data.$values.forEach((product) => {
            switch (product.categoryName?.toLowerCase()) {
              case 'coffee':
                categorizedProducts.coffee.push(product);
                break;
              case 'trà':
                categorizedProducts.tea.push(product);
                break;
              case 'trà sữa':
                categorizedProducts.milkTea.push(product);
                break;
              case 'bánh':
                categorizedProducts.cake.push(product);
                break;
              case 'ice blended':
                categorizedProducts.iceBlended.push(product);
                break;
              default:
                break;
            }
          });

          setProducts(categorizedProducts); // Lưu lại sản phẩm đã phân loại
          setLoading(false); // Đặt trạng thái loading là false khi có dữ liệu
        } else {
          throw new Error("No products data");
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(error.message); // Ghi nhận lỗi
        setLoading(false); // Đặt trạng thái loading là false khi có lỗi
      });
  };

  // Gọi API khi component mount và thiết lập interval
  useEffect(() => {
    fetchProducts(); // Gọi API ngay khi component load lần đầu
    const intervalId = setInterval(fetchProducts, 30000); // Gọi lại API mỗi 30 giây (30000ms)

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị trạng thái loading
  }

  if (error) {
    return <div>Lỗi: {error}</div>; // Hiển thị lỗi nếu có
  }

  return (
    <div className="all-products-page1">
      <h1>Tất cả sản phẩm</h1>

      {/* Khung Coffee */}
      <div className="product-category1">
        <h2>Cà phê</h2>
        <div className="product-list1">
          {products.coffee.map((product) => (
            <div key={product.id} className="product-item1">
              <Link to={`/product/${product.id}`}>
                <img src={`https://localhost:7030/${product.imageUrl}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()} đ</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Khung Trà */}
      <div className="product-category1">
        <h2>Trà</h2>
        <div className="product-list1">
          {products.tea.map((product) => (
            <div key={product.id} className="product-item1">
              <Link to={`/product/${product.id}`}>
                <img src={`https://localhost:7030/${product.imageUrl}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()} đ</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Khung Trà sữa */}
      <div className="product-category1">
        <h2>Trà sữa</h2>
        <div className="product-list1">
          {products.milkTea.map((product) => (
            <div key={product.id} className="product-item1">
              <Link to={`/product/${product.id}`}>
                <img src={`https://localhost:7030/${product.imageUrl}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()} đ</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Khung Bánh */}
      <div className="product-category1">
        <h2>Bánh</h2>
        <div className="product-list1">
          {products.cake.map((product) => (
            <div key={product.id} className="product-item1">
              <Link to={`/product/${product.id}`}>
                <img src={`https://localhost:7030/${product.imageUrl}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()} đ</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Khung Ice Blended */}
      <div className="product-category1">
        <h2>Ice Blended</h2>
        <div className="product-list1">
          {products.iceBlended.map((product) => (
            <div key={product.id} className="product-item1">
              <Link to={`/product/${product.id}`}>
                <img src={`https://localhost:7030/${product.imageUrl}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()} đ</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuProduct;
