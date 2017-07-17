"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _presale = require("./presale");

var _presale2 = _interopRequireDefault(_presale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// Controllers


app.use('/presale', _presale2.default);

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
  console.log('listening at http://localhost:9999');
});
//# sourceMappingURL=index.js.map