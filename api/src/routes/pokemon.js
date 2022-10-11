const { Router } = require("express");
const router = Router(); //express.Router('')
const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
  const {
    health,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
    type1,
    type2,
  } = req.body;
  let { name } = req.body;
  name.toLowerCase();

  if (!name || name.trim() === "")
    res.status(400).send("El nombre es requerido");
  let types = [];
  if (!type1 && !type2) {
    types = ["unknown"];
  } else if (type1 && !type2) {
    types = [type1];
  } else if (type2 && !type1) {
    types = [type2];
  } else {
    types = [type1, type2];
  }

  try {
    const exists = await Pokemon.findOne({
      where: { name: name.trim().toLowerCase() },
    });
    if (exists)
      return res.status(400).send(`Ya existe un Pokemon con ese nombre`);

    let newPokemon = await Pokemon.create({
      name: name.trim().toLowerCase(),
      health,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });

    let assignTypes = await Promise.all(
      types.map((t) => Type.findOne({ where: { name: t } }))
    );

    newPokemon.setTypes(assignTypes);

    // let assignTypes = await Promise.all(
    //     types.map(t => Type.findOne({ where: { name: t } }))
    // )

    //   newPokemon.addTypes(assignTypes);
    // console.log(newPokemon.toJSON());

    //201 -> Created
    return res
      .status(201)
      .json([
        `El Pokemon: ${
          newPokemon.name[0].toUpperCase() + newPokemon.name.substring(1)
        } ha sido creado correctamente.`,
        newPokemon,
      ]);
  } catch (error) {
    return res
      .status(400)
      .json("Ha ocurrido un error. El Pokemon no pudo ser creado");
  }
});

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      let dbPokemons = await Pokemon.findAll({ include: Type });
      dbPokemons = dbPokemons.map((p) => {
        return {
          id: p.id,
          name:
            p.name.trim().toLowerCase().charAt(0).toUpperCase() +
            p.name.substring(1),
          health: p.health,
          attack: p.attack,
          defense: p.defense,
          speed: p.speed,
          height: p.height,
          weight: p.weight,
          types: p.Types.map((t) => t.name),
          image: p.image,
        };
      });

      let apiPromise = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=48&offset=0"
      );
      apiPromise = apiPromise.data.results?.map((pokemon) =>
        axios.get(pokemon.url)
      );

      const responsePromise = await axios.all(apiPromise);
      const apiPokemons = responsePromise.map((p) => {
        return {
          id: p.data.id,
          name: p.data.name,
          health: p.data.stats[0].base_stat,
          attack: p.data.stats[1].base_stat,
          defense: p.data.stats[2].base_stat,
          speed: p.data.stats[5].base_stat,
          height: p.data.height,
          weight: p.data.weight,
          types: p.data.types.map((t) => t.type.name),
          image: p.data.sprites.other.home.front_default,
        };
      });

      let allPokemons = apiPokemons.concat(dbPokemons);
      res.status(200).json(allPokemons);
    } else {
      let pokeByNameDB = await Pokemon.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: { model: Type, attributes: ["name"] },
      });
      let dbPokemon = pokeByNameDB.map((p) => {
        return {
          id: p.id,
          name:
            p.name.trim().toLowerCase().charAt(0).toUpperCase() +
            p.name.substring(1),
          health: p.health,
          attack: p.attack,
          defense: p.defense,
          speed: p.speed,
          height: p.height,
          weight: p.weight,
          types: p.Types.map((t) => t.name),
          image: p.image,
        };
      });

      if (dbPokemon.length > 0) {
        return res.status(200).json(...dbPokemon);
      } else {
        let pokeByNameAPI = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        let pokeApiName = {
          id: pokeByNameAPI.data.id,
          name: pokeByNameAPI.data.name,
          health: pokeByNameAPI.data.stats[0].base_stat,
          attack: pokeByNameAPI.data.stats[1].base_stat,
          defense: pokeByNameAPI.data.stats[2].base_stat,
          speed: pokeByNameAPI.data.stats[5].base_stat,
          height: pokeByNameAPI.data.height,
          weight: pokeByNameAPI.data.weight,
          types: pokeByNameAPI.data.types.map((t) => t.type.name),
          image: pokeByNameAPI.data.sprites.other.home.front_default,
        };

        if (pokeApiName.name) return res.status(200).json(pokeApiName);
        res.status(404).send("Not found");
      }
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;

  if (idPokemon.length > 4) {
    try {
      const dbPokemonID = await Pokemon.findOne({
        where: {
          id: idPokemon,
        },
        include: {
          model: Type,
          attributes: ["name"],
        },
      });

      const formatIDpokemon = {
        id: dbPokemonID.id,
        name:
          dbPokemonID.name.trim().toLowerCase().charAt(0).toUpperCase() +
          dbPokemonID.name.substring(1),
        health: dbPokemonID.health,
        attack: dbPokemonID.attack,
        defense: dbPokemonID.defense,
        speed: dbPokemonID.speed,
        height: dbPokemonID.height,
        weight: dbPokemonID.weight,
        types: dbPokemonID.Types.map((t) => t.name),
        image: dbPokemonID.image,
      };

      if (dbPokemonID) return res.status(200).json(formatIDpokemon);
    } catch (error) {
      return res.status(404).send("No se encontró un Pokemon con ese ID");
    }
  }

  try {
    const apiPokemonID = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    );
    const matchedPokemon = {
      id: apiPokemonID.data.id,
      name: apiPokemonID.data.name,
      health: apiPokemonID.data.stats[0].base_stat,
      attack: apiPokemonID.data.stats[1].base_stat,
      defense: apiPokemonID.data.stats[2].base_stat,
      speed: apiPokemonID.data.stats[5].base_stat,
      height: apiPokemonID.data.height,
      weight: apiPokemonID.data.weight,
      types: apiPokemonID.data.types.map((t) => t.type.name),
      image: apiPokemonID.data.sprites.other.home.front_default,
    };

    return res.status(200).json(matchedPokemon);
  } catch (error) {
    res.status(404).send("No se encontró un Pokemon con ese ID");
  }
});

module.exports = router;
