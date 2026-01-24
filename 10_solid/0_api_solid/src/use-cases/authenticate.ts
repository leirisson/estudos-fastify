import { UserRepository } from "@/repository/user.repository";
import { User } from "generated/prisma";
import { InvalideCredentialError } from "./errors/invalide.credentials.error";
import { compare } from 'bcryptjs'


//entrada 
interface authenticateUseCaseRequest {
    email: string,
    password: string
}


// saida esperada
interface authenticateUseCaseResponse {
    user: User
}

export class AthenticateUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({ email, password }: authenticateUseCaseRequest): Promise<authenticateUseCaseResponse> {

        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalideCredentialError()
        }

        const doesPasswordMatches = await compare(password, user.hashPassword)

        if (!doesPasswordMatches) {
            throw new InvalideCredentialError()
        }


        return { user }
    }
}