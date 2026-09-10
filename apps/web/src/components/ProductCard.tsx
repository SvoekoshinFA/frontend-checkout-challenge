import type { Product } from "../types/Product";
import '../assets/css/productCard.css'

export default function ProductCard({product}: {product: Product}) {
    const currency = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: product.currency, 
    });  
    return (
        <div className="productCard">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p className="price">{currency.format(product.price)}</p>
            <button>Добавить в корзину</button>
        </div>
    )
}