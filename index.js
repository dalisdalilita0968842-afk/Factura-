const express = require("express");
const bodyParser = require("express").json;
const app = express();
const config = require("./config/config");
const { sequelize } = require("./models");

app.use(bodyParser({ limit: "2mb" }));

// rutas
const facturasRouter = require("./routes/facturas");
app.use("/api/facturas", facturasRouter);

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// iniciar
async function start() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la BD");
    app.listen(config.port, () => {
      console.log(`API escuchando en http://localhost:${config.port}`);
      if (config.jwt.enabled) console.log("JWT habilitado");
    });
  } catch (err) {
    console.error("No se pudo conectar a la BD", err);
    process.exit(1);
  }
}

start();
