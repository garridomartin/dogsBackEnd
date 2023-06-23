const getLogInHandler = async (req, res) => {
  res
    .status(200)
    .send("<button><a href='/auth'>Login With Google</a></button>");
};



module.exports = {
  getLogInHandler,
};
