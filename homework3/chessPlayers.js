const solution = (chessPlayers, finishedMatches) => {
  const remainingMatches = [];
  if (chessPlayers < 2) return remainingMatches;

  const finishedToStr = finishedMatches.join("");

  for (let i = 0; i < chessPlayers - 1; i++) {
    for (let j = i + 1; j < chessPlayers; j++) {
      if (
        !finishedToStr.includes([i, j].join(",")) &&
        !finishedToStr.includes([j, i].join(","))
      ) {
        remainingMatches.push([i, j]);
      }
    }
  }
  return remainingMatches;
};

solution(5, [
  [0, 1],
  [1, 4],
  [3, 0],
  [2, 3],
  [4, 0],
]);
