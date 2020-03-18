const { Vote } = require("../db");
const Jwt = require("./jwt");

module.exports = (io) => {
  io.on("connect", (socket) => {
    console.log(`Connected to socket with id ${socket.id}`);
    socket.on("COUNT_VOTES", async (data) => {
      const { contestantId } = data;
      const count = await Vote.countByContestant(contestantId);
      io.emit("COUNTED", { count });
    });
    socket.on("COUNT_VOTES_BY_VOTER", async (data) => {
      const { token } = data;
      const payload = Jwt.decode(token);
      const count = await Vote.countByVoter(payload.matric);
      io.emit("COUNTED_FOR_VOTER", { count });
    });
  });
};
