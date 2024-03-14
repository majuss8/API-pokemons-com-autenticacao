## API com autenticação

Esse é um projeto de uma API que irá catalogar **Pokemons**. Porém ela possui autenticação para que cada usuario logado possa catalogar seus **Pokemons**.

Foi criado um banco de dados chamado `catalogo_pokemons` com as tabelas descritas abaixo e todo código de criação das tabelas está no arquivo `dump.sql`

#### Tabela `usuarios` com os campos:

- id - identificador único do usuário como chave primaria e auto incremento;
- nome - (obrigatório)
- email - (obrigatório e único)
- senha - (obrigatório)

#### Tabela `pokemons` com os campos

- id - identificador único do pokemon como chave primaria e auto incremento;
- usuario_id - (obrigatório)
- nome - (obrigatório)
- habilidades - (obrigatótio)
- imagem
- apelido

Para a entidade `usuarios` foram implementadas as seguintes funcionalidades:

1 - Cadastro de usuário

- A senha do usuário é criptografada usando a biblioteca `bcrypt` antes de salvar o cadastro.

2 - Login de usuário

- Valida as credenciais do usuário usando a biblioteca `bcrypt`.
- Gera o token de autenticação com a biblioteca `jsonwebtoken`.

Para a entidade `pokemons` foram implementadas as seguintes funcionalidades:

1 - Cadastro do pokemons

2 - Atualização apenas do apelido do pokemon

3 - Listagem completa dos pokemons

4 - Listagem de apenas um pokemon filtrado pelo seu id

5 - Exclusão do pokemon

Na entidade `pokemons`:

- Recebe o token do header da requisição (_authorization_) no formato `Bearer Token` e valida o usuário logado em todos os endpoints.
- O campo `usuario_id` é obtido do token recebido no header.
- No cadastro de pokemon, o campo `habilidades` recebe apenas uma string de habilidades separadas por vírgulas.
- Na listagem de pokemons o campo `habilidades` retorna um array de habilidades.

_As validações são necessárias para evitar erros no banco de dados_

Exemplo do body para cadastro do pokemon:

```
{
    "nome": "Pikachu",
    "apelido": "pikachu",
    "habilidades": "static, lightning-rod",
    "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
}
```

Exemplo de retorno na listagem de pokemons:

```
[
    {
        "id": 1,
        "usuario": "Nome do usuário responsável"
        "nome": "Pikachu",
        "apelido": "pikachu",
        "habilidades": ["static", "lightning-rod"],
        "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
    },
    {
        "id": 2,
        "usuario": "Nome do usuário responsável"
        "nome": "Bulbasaur",
        "apelido": "bulbasaur",
        "habilidades": ["overgrow", "chlorophyll"],
        "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
    }
]
```

---

#### tags: `lógica` `banco de dados` `sql` `postgres`
