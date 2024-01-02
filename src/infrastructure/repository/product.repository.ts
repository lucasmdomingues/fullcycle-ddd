import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product.repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.ID,
            name: entity.Name,
            price: entity.Price,
        })
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.Name,
                price: entity.Price
            },
            {
                where: {
                    id: entity.ID
                }
            }
        )
    }

    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({ where: { id } })
        return new Product(product.id, product.name, product.price)
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll()
        return products.map((p) => new Product(p.id, p.name, p.price))
    }
}

export default ProductRepository