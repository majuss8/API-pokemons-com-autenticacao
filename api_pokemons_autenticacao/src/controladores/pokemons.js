const pool = require('../conexao');

const cadastroDePokemons = async (req, res) => {
    const { nome, habilidades, imagem, apelido } = req.body;

    try {
        const id = req.usuario.id;

        if (!nome || !habilidades) {
            return res.status(400).json({ mensagem: 'Preencha os campos corretamente' });
        }

        await pool.query(
            'insert into pokemons (usuario_id, nome, apelido, habilidades, imagem) VALUES ($1, $2, $3, $4, $5) returning *',
            [id, nome, apelido, habilidades, imagem]
        );

		return res.status(201).json({ mensagem: 'Pokemon cadastrado com sucesso' })
        
    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
};
const atualizacaoDeApelidoDoPokemon = async (req, res) => {
    const { id } = req.params;
    const { apelido } = req.body;
    try {
        const idUsuario = req.usuario.id;
        
        const pokemonEncontrado = await pool.query(
            `SELECT * FROM pokemons WHERE usuario_id = $1 AND id = $2`,
            [idUsuario, id]
        );

        if (pokemonEncontrado.rows.length === 0) {
            return res.status(404).json('Não possui pokemon com esse id');
        }

        if (!apelido) {
            return res.status(400).json({ mensagem: 'Preencha os campos corretamente' });
        }

        await pool.query(
            `update pokemons set apelido = $1 where id = $2`,
            [apelido, id]
        );

        return res.status(201).json({ mensagem: 'Apelido atualizado com sucesso!' })

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
};
const listagemCompletaDePokemons = async (req, res) => {
    try {
        const nomeUsuario = req.usuario.nome;
        const { rows } = await pool.query(
            `select * from pokemons`
        )

        if (rows.length < 1) {
            return res.status(404).json({ mensagem: "Nenhum pokemon registrado" })
        }

        const pokemons = rows.map(row => {
            return {
                id: row.id,
                usuario: nomeUsuario,
                nome: row.nome,
                apelido: row.apelido,
                habilidades: row.habilidades.split(',').map(habilidade => habilidade.trim()),
                imagem: row.imagem
            }
        })

        return res.status(200).json(pokemons)
    } catch (error) {
        console.log(error);
        return res.status(500).json('Erro interno do servidor')
    }
};
const buscaPorIdDoPokemon = async (req, res) => {
    const { id } = req.params;

    try {
        const nomeUsuario = req.usuario.nome;

        const queryPokemon = await pool.query(
            `select * from pokemons where id = $1`,
            [id]
        )

        if (queryPokemon.rows.length < 1) {
            return res.status(404).json('Não possui pokemon com esse id');
        }        

        const pokemon = {
            id: queryPokemon.rows[0].id,
            usuario: nomeUsuario,
            nome: queryPokemon.rows[0].nome,
            apelido: queryPokemon.rows[0].apelido,
            habilidades: queryPokemon.rows[0].habilidades.split(',').map(habilidade => habilidade.trim()),
            imagem: queryPokemon.rows[0].imagem
        }

        return res.status(200).json(pokemon)
    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
};
const exclusaoDePokemon = async (req, res) => {
    const { id } = req.params;

    try {
        const idUsuario = req.usuario.id;
        
        const pokemonEncontrado = await pool.query(
            `SELECT * FROM pokemons WHERE usuario_id = $1 AND id = $2`,
            [idUsuario, id]
        );

        if (pokemonEncontrado.rows.length === 0) {
            return res.status(404).json('Não possui pokemon com esse id');
        }

        await pool.query(
            `delete from pokemons where id = $1;`,
            [id]
        );

        return res.status(200).json({ mensagem: 'Pokemon excluído com sucesso '})
    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
};

module.exports = {
    cadastroDePokemons,
    atualizacaoDeApelidoDoPokemon,
    listagemCompletaDePokemons,
    buscaPorIdDoPokemon,
    exclusaoDePokemon
}