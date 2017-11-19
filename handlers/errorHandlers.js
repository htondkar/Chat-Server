exports.notFound = (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
}

exports.catch = fn => (req, res, next) => fn(req, res, next).catch(next)

exports.developmentErrors = (err, req, res, next) => {
  res.status(err.status || 500).json(err)
}

/*
  Production Error Handler
  No stack-traces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500).json(err)
}
