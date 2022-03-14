import getGravatarUrl from './gravatar';

export const getPrevRanking = () => (
  JSON.parse(localStorage.getItem('ranking')) || []
);

export const saveRanking = ({ gravatarEmail, name, score }) => {
  localStorage.setItem('ranking', JSON.stringify([
    ...getPrevRanking(),
    { name, score, picture: getGravatarUrl(gravatarEmail) },
  ]));
};

export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);

export const getScore = () => localStorage.getItem('score') || 0;
export const setScore = (score) => localStorage.setItem('score', score);
