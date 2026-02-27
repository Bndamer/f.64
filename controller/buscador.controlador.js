const db =require("../db/db");

const search = (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.json([]);
  }

  const sql = `
    SELECT modeloCamaras AS titulo, 'camara' AS tipo, idCamaras AS id
    FROM camaras
    WHERE modeloCamaras LIKE ?
       OR tipoCamaras LIKE ?
       OR sensorCamaras LIKE ?

    UNION

    SELECT modeloLentes AS titulo, 'lente' AS tipo, idLentes AS id
    FROM lentes
    WHERE modeloLentes LIKE ?
       OR tipoLentes LIKE ?
       OR descripcionLentes LIKE ?

    UNION

    SELECT nombreAccesorios AS titulo, 'accesorio' AS tipo, idAccesorios AS id
    FROM accesorios
    WHERE nombreAccesorios LIKE ?
       OR descripcionAccesorios LIKE ?
       OR tipoAccesorios LIKE ?

    UNION

    SELECT nombreTecnica AS titulo, 'tecnica' AS tipo, idTecnica AS id
    FROM tecnicas
    WHERE nombreTecnica LIKE ?
       OR descripcionTecnica LIKE ?

    UNION

    SELECT nombreDesafio AS titulo, 'desafio' AS tipo, idDesafio AS id
    FROM desafios
    WHERE nombreDesafio LIKE ?
       OR consignaDesafio LIKE ?

    UNION

    SELECT nombreCompleto AS titulo, 'fotografo' AS tipo, idFotografo AS id
    FROM fotografos
    WHERE nombreCompleto LIKE ?
       OR estiloFotografico LIKE ?
       OR biografia LIKE ?

    LIMIT 30
  `;

  const palabras = query.trim().split(/\s+/);
const likeQuery = `%${palabras.join("%")}%`;

  const values = [
    likeQuery, likeQuery, likeQuery,
    likeQuery, likeQuery, likeQuery,
    likeQuery, likeQuery, likeQuery,
    likeQuery, likeQuery,
    likeQuery, likeQuery,
    likeQuery, likeQuery, likeQuery
  ];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en búsqueda" });
    }

    res.json(results);
  });}

module.exports = { search };