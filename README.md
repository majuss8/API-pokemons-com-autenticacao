## API com autenticação

Esse é um projeto de uma API que irá catalogar **Pokemons**. Porém ela possui autenticação para que cada usuario logado possa catalogar seus **Pokemons**.
No projeto utilizei pacotes npm e o framework [Express](https://expressjs.com/pt-br/) para o desenvolvimento.
Testei e documentei as rotas usando o [Insomnia](https://insomnia.rest/).
No gerenciamento do banco de dados utilizei o [Beekeeper Studio](https://www.beekeeperstudio.io/).
Para geração do token utilizei a biblioteca [bcrypt](https://www.npmjs.com/package/bcrypt).
E para leitura do token utilizei a biblioteca [jsonwebtoken](https://jwt.io/)

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/148dbd41-ae9e-4fa7-b3ba-234d1ace316d)

- No terminal digite os comandos:
```
npm init -y
```
```
npm install express
```
```
npm install nodemon -D
```
```
npm install jsonwebtoken
```
```
npm install bcrypt
```
```
npm run dev
```

Foi criado um banco de dados chamado `catalogo_pokemons` com as tabelas descritas abaixo e todo código de criação das tabelas está no arquivo `dump.sql`

#### Tabela `usuarios` com os campos:

- id - identificador único do usuário como chave primaria e auto incremento;
- nome - (obrigatório)
- email - (obrigatório e único)
- senha - (obrigatório)

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/63130c50-328b-4c5b-be9a-d11ff25b83a1)

#### Tabela `pokemons` com os campos

- id - identificador único do pokemon como chave primaria e auto incremento;
- usuario_id - (obrigatório)
- nome - (obrigatório)
- habilidades - (obrigatótio)
- imagem
- apelido

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/8b01ec95-c4a7-4109-8066-5fe51e263024)

Para a entidade `usuarios` foram implementadas as seguintes funcionalidades:

1 - Cadastro de usuário
```
/usuario
```

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/886f4685-ab07-46c8-8546-125f88ab06f7)

- A senha do usuário é criptografada usando a biblioteca `bcrypt` antes de salvar o cadastro.

Entrada:
```
{
	"nome": "Maria Júlia",
	"email": "mjulia4@gmail.com",
	"senha": "123456"
}
```
Saída:
```
{
	"mensagem": "Cadastro realizado com sucesso"
}
```
ou
```
{
    mensagem: 'Preencha os campos corretamente'
}
```
2 - Login de usuário
```
/login
```

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/12aa2528-1a2b-4afa-9f40-cd1def71d998)

- Valida as credenciais do usuário usando a biblioteca `bcrypt`.
- Gera o token de autenticação com a biblioteca `jsonwebtoken`.

Entrada:
```
{
	"email": "mjulia3@gmail.com",
	"senha": "123456"
}
```
Saída:
```
{
    "usuario": {
        "id": 3,
        "nome": "Maria Júlia",
        "email": "mjulia3@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzEwNDAyOTA4LCJleHAiOjE3MTA0MzE3MDh9.sG7moP58y4f975LU-jEFy9nVozMXeuVDJ5dWfVl3egg"
}
```
ou
```
{
    mensagem: 'Email ou senha inválida'
}
```

Para a entidade `pokemons` foram implementadas as seguintes funcionalidades:
- Nessas ações é preciso colocar o token no Header da requisição (Bearer Token)

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/bc8bd4ea-9c40-44ab-aefd-f6e5f860b776)

1 - Cadastro do pokemons
```
/pokemon/cadastro
```

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/b6191799-ba32-47a1-afdc-19efe97060f0)

Entrada:
```
{
    "nome": "Pikachu",
    "apelido": "pikachu",
    "habilidades": "static, lightning-rod",
    "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
}
```
Saída:
```
{
	"mensagem": "Pokemon cadastrado com sucesso"
}
```
ou
```
{
    mensagem: 'Preencha os campos corretamente'
}
```
2 - Atualização apenas do apelido do pokemon
```
/pokemon/atualizar/:id
```

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/ab919dff-33dc-45f6-8787-4f586b895266)

Entrada:
```
{
	"apelido": "pi"
}
```
Saída:
```
{
	"mensagem": "Apelido atualizado com sucesso!"
}
```
ou
```
{
    'Não possui pokemon com esse id'
}
```
ou
```
{
    mensagem: 'Preencha os campos corretamente'
}
```
3 - Listagem completa dos pokemons
```
/pokemon/listagem
```

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/4bed547b-17fa-4280-8c79-6116976164c9)

Saída:
```
[
	{
		"id": 2,
		"usuario": "Maria Júlia",
		"nome": "Pikachu",
		"apelido": "pikachu",
		"habilidades": [
			"static",
			"lightning-rod"
		],
		"imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
	},
	{
		"id": 4,
		"usuario": "Maria Júlia",
		"nome": "Bulbasaur",
		"apelido": "bulbasaur",
		"habilidades": [
			"{\"overgrow\"",
			"\"chlorophyll\"}"
		],
		"imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
	},
	{
		"id": 5,
		"usuario": "Maria Júlia",
		"nome": "Bulbasaur",
		"apelido": "bulbasaur",
		"habilidades": [
			"{\"overgrow\"",
			"\"chlorophyll\"}"
		],
		"imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
	},
	{
		"id": 3,
		"usuario": "Maria Júlia",
		"nome": "Pikachu",
		"apelido": "pi",
		"habilidades": [
			"static",
			"lightning-rod"
		],
		"imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
	}
]
```
ou
```
{
    'Não possui pokemon com esse id'
}
```

4 - Listagem de apenas um pokemon filtrado pelo seu id
```
/pokemon/buscar/:id
```

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/c2711a3d-602f-4784-8343-f05d361510e9)

Saída:
```
{
	"id": 1,
	"usuario": "Maria Júlia",
	"nome": "Pikachu",
	"apelido": "pi",
	"habilidades": [
		"static",
		"lightning-rod"
	],
	"imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
}
```
ou
```
{
    'Não possui pokemon com esse id'
}
```

5 - Exclusão do pokemon
```
/pokemon/excluir/:id
```

![image](https://github.com/majuss8/API-pokemons-com-autenticacao/assets/127978188/d13b16c1-f548-4865-bba2-28c49ecd2ed7)

Saída:
```
{
	"mensagem": "Pokemon excluído com sucesso "
}
```
ou
```
{
    'Não possui pokemon com esse id'
}
```

Na entidade `pokemons`:

- Recebe o token do header da requisição (_authorization_) no formato `Bearer Token` e valida o usuário logado em todos os endpoints.
- O campo `usuario_id` é obtido do token recebido no header.
- No cadastro de pokemon, o campo `habilidades` recebe apenas uma string de habilidades separadas por vírgulas.
- Na listagem de pokemons o campo `habilidades` retorna um array de habilidades.

_As validações são necessárias para evitar erros no banco de dados_

---

#### tags: `lógica` `banco de dados` `sql` `postgres`
