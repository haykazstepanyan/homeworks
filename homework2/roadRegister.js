function solution(roadRegister) {
    for (let i = 0; i < roadRegister.length; i++) {
      let hasEntry;
      let hasExit;
      for (let j = 0; j < roadRegister[i].length; j++) {
        if (roadRegister[i][j]) hasExit = true;
        if (roadRegister[j][i]) hasEntry = true;
      }
      if (!hasEntry || !hasExit) return false;
    }
    return true;
  }