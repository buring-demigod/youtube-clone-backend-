const validity = async (req, res, next) => {
  try {
    const updatedDate = req.user.updated;
    const currentDate = new Date();

    const timeGap = (currentDate.getTime() - updatedDate.getTime()) / 3600000;

    if (timeGap > 0.83) throw new Error('token expired');
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}
module.exports = validity;