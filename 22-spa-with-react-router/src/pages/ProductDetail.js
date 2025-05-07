import { useParams } from "react-router-dom";

function ProductDetailPage() {
    const params = useParams();
    const productId = params.productId;
  return (
    <div>
      <h1>Product Details</h1>
      <p>This is the product detail page for the product with id {productId}.</p>
    </div>
  );
}

export default ProductDetailPage;
