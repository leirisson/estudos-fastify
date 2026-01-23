==========================
✅ Requisitos Funcionais
==========================
[x] Cadastrar produto
[x] Listar todos os produtos ativos
[x] Atualizar nome, preço e estoque
[x] Desativar produto (não deletar fisicamente)
[x] Buscar produto por ID

======================
📏 Regras de Negócio
======================
Não permitir preço ≤ 0
Estoque não pode ser negativo
[x] Produto desativado não pode ser atualizado
Não permitir dois produtos com o mesmo nome

==============================
⚙️ Requisitos Não Funcionais
==============================
Código organizado em camadas
[x] Use Cases não conhecem HTTP
[x] Repository desacoplado (in-memory inicialmente)
[x] Fácil troca para banco de dados depois
[x] Validações centralizadas no Use Case

==============================
🧠 Desafios (Exercícios)
==============================
Criar DeactivateProductUseCase
Criar FindProductByIdUseCase
Implementar regra: nome único
Criar testes unitários dos Use Cases

