
/**
 * ✅ Aplicando SRP (do jeito certo)
 * amos separar responsabilidades.
 * 1. Classe responsável pela validação
 * ✔ Responsabilidade:
 * 👉 Apenas validar dados do usuário
 */
class UserValidator {
    validateEmail(email: string) {
        if (!email.includes('@')) {
            throw new Error('Email invalido')
        }
    }
}

/**
 * 🧩 2. Classe responsável por persistência (banco)
 * ✔ Responsabilidade:
 * 👉 Apenas salvar dados
 */
class userRepository {
    save(name: string, email: string) {
        console.log('salvando no banco de dados')
    }
}

/**
 * 🧩 3. Classe responsável por envio de email
 * ✔ Responsabilidade:
 * 👉 Apenas envio de email
 */

class EmailService {
    sendWelcomeEmail(email: string) {
        console.log('Enviando email de boas-vindas ....')
    }
}




class UserService {
    constructor(
        private validator: UserValidator,
        private repository: userRepository,
        private emailService: EmailService
    ) { }

    createUser(name: string, email: string){
        this.validator.validateEmail(email)
        this.repository.save(name, email)
        this.emailService.sendWelcomeEmail(email)
    }
}

// inversão de dependencia
const userValidator = new UserValidator()
const repository = new userRepository()
const emailService = new EmailService()

const user = new UserService(userValidator, repository, emailService)

user.createUser("Leirisson", "leirisson.examplo@org.com")