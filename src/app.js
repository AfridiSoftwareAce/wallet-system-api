const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger/swagger');
const routes = require('./routes');


app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);


// Default test route
app.get('/', (req, res) => {
  res.send('🚀 Wallet System running successfully');
});

module.exports = app;
