const queryParams = ['%25a%25', 'a%25', '%25e%25', 'e%25', '%25i%25', 'i%25', '%25o%25', 'o%25'];

export const getRandomQuery = (): string => queryParams[Math.floor(Math.random() * queryParams.length)];
export const getRandomOffset = (): number => Math.ceil(Math.random() * 1000);
