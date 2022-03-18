import getGravatarUrl from './gravatar';

export const getRanking = () => JSON.parse(localStorage.getItem('ranking')) || [];
const setRanking = (ranking) => {
  const sortedRanking = [...ranking];
  sortedRanking.sort((playerA, playerB) => playerB.score - playerA.score);
  localStorage.setItem('ranking', JSON.stringify(sortedRanking));
};

export const saveRanking = ({ name, score, gravatarEmail }) => {
  const picture = getGravatarUrl(gravatarEmail);
  const currentRanking = getRanking();
  if (!currentRanking.length) {
    setRanking([{ name, score, picture }]);
  } else {
    const isNewPlayer = currentRanking
      .every((prevPlayer) => (
        !(prevPlayer.name === name && prevPlayer.picture === picture)
      ));
    const newRanking = currentRanking.map((prevPlayer) => {
      if (prevPlayer.name === name && prevPlayer.picture === picture
        && prevPlayer.score < score) {
        return { name, score, picture };
      }
      return prevPlayer;
    });
    if (isNewPlayer) {
      newRanking.push({ name, score, picture });
    }
    setRanking(newRanking);
  }
};

export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
