import Product from "../entity/product";

class ProductService {
    static increasePrice(products: Product[], percentage: number): void {
        products.forEach(product => {
            product.changePrice((product.Price * percentage) / 100 + product.Price);
        })
    }
}

export default ProductService;