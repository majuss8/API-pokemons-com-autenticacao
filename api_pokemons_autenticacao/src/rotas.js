const express = require('express');
const rotas = express();

const { 
    cadastroDeUsuario, 
    loginDeUsuario 
} = require('./controladores/usuarios');

const verificarUsuario = require('./intermediarios/autenticacao');

const { 
    cadastroDePokemons, atualizacaoDeApelidoDoPokemon, listagemCompletaDePokemons, buscaPorIdDoPokemon, exclusaoDePokemon
} = require('./controladores/pokemons');

rotas.post('/usuario', cadastroDeUsuario);
rotas.post('/login', loginDeUsuario);

rotas.use(verificarUsuario);

rotas.post('/pokemon/cadastro', cadastroDePokemons);
rotas.put('/pokemon/atualizar/:id', atualizacaoDeApelidoDoPokemon);
rotas.get('/pokemon/listagem', listagemCompletaDePokemons);
rotas.get('/pokemon/buscar/:id', buscaPorIdDoPokemon);
rotas.delete('/pokemon/excluir/:id', exclusaoDePokemon);

module.exports = rotas;