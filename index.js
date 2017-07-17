import express from "express";

const app = express()
// Controllers
import presale from "./presale";

app.use('/presale', presale)

// Error handling middleware must be after all other middleware and routing.
// Handle error in development mode.
if (app.get('env') === 'development') {
  console.log('running in dev mode');
  app.use(function (err, req, res, next) {
    res.status(500).json(err.stack);
  });

// Handle error in production mode.
} else {
  console.log('running in production mode');
  app.use(function (err, req, res, next) {
    res.status(500).json(err.message);
  });
}

app.listen(9999, function () {
  console.log('listening at http://localhost:9999')
})