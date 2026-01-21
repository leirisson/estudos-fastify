
/**
 * O que está errado aqui?

Essa classe tem 3 responsabilidades:

1️⃣ Validar dados
2️⃣ Salvar no banco
3️⃣ Enviar email

❌ Isso quebra o SRP
 */
class UserServiceExample {
    createUser(name: string, email: string) {

        // validação
        if (!email.includes('@')) {
            throw new Error("Email invalido")
        }

        // Salvar no banco de dados
        console.log("Salvando no banco de dados...")

        // enviando email
        console.log("Enviando email de boas vindas...")
    }
}
