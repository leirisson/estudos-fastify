import { Productrepository } from "./ProductRepository";
import { ProductValidator } from "./ProductValidator";
import { ReportService } from "./ReportService";




export class ProductService {
    constructor(
        private productValidator: ProductValidator,
        private productRepository: Productrepository,
        private reportService: ReportService
    ) { }

    createProduct(name:string, price: number){
        this.productValidator.validator(price)
        this.productRepository.save(name, price)
        this.reportService.report()
    }
}