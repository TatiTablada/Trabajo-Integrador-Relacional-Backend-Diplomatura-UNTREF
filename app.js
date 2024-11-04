process.loadEnvFile()
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./conexion/database.js');
const app = express();
const PORT = process.env.PORT || 3006;
const contenidoRoutes = require('./routes/contenidoRoutes.js');
const setupSwagger = require('./swaggerConfig.js');
setupSwagger(app);

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/contenidos', contenidoRoutes);


sequelize.sync({ force: false }).then(() => {
  console.log("Base de datos y tablas creadas!");
}).catch(error => {
  console.error("Error al sincronizar las tablas:", error);
});
// Server
app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
  console.log(`Documentación de la API en:http://localhost:${PORT}/api-docs`);
});
