import md5 from 'crypto-js/md5';

const getGravatarUrl = (email) => md5(email).toString();

export default getGravatarUrl;
