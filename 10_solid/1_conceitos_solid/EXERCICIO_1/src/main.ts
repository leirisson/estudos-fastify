import { Productrepository } from './ProductRepository'
import { ProductService } from './ProductService'
import { ProductValidator } from './ProductValidator'
import { ReportService } from './ReportService'



const productValidator = new ProductValidator()
const productRepository = new Productrepository()
const report = new ReportService()
const productService = new ProductService(productValidator, productRepository, report)
productService.createProduct("teclado", 250.65)





