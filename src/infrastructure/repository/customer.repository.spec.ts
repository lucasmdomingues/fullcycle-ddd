import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {
                force: true,
            }
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })


    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a product', async () => {
        const productRepository = new ProductRepository()
        const product = new Product("1", "Product 1", 100)

        await productRepository.create(product)

        let productModel = await ProductModel.findOne({ where: { id: "1" } })

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        })
    })

    it('should update a product', async () => {
        const productRepository = new ProductRepository()
        const p1 = new Product("1", "Product 1", 100)

        await productRepository.create(p1)

        p1.changeName('Product 2')
        p1.changePrice(200)

        await productRepository.update(p1)

        let p2 = await ProductModel.findOne({ where: { id: "1" } })

        expect(p2.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200
        })
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository()
        const product = new Product("1", "Product 1", 100)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: "1" } })
        const foundedProduct = await productRepository.find("1")

        expect(productModel.toJSON()).toStrictEqual({
            id: foundedProduct.ID,
            name: foundedProduct.Name,
            price: foundedProduct.Price
        })
    })

    it("should find all products", async () => {
        const productRepository = new ProductRepository()

        const p1 = new Product("1", "Product 1", 100)
        await productRepository.create(p1)

        const p2 = new Product("2", "Product 2", 200)
        await productRepository.create(p2)

        const products = [p1, p2]
        const foundedProducts = await productRepository.findAll();

        expect(products).toEqual(foundedProducts)
    })
})