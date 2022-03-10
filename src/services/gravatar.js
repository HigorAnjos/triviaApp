import md5 from 'crypto-js/md5';

const getGravatarUrl = (email) => (
  `https://www.gravatar.com/avatar/${md5(email).toString()}`
);

export default getGravatarUrl;
