export const {
    NODE_ENV = 'development',
    APP_PORT = process.env.PORT || 3000,
    APP_URL = 'localhost'
} = process.env;

export const IN_PROD = NODE_ENV === 'production';
export const IN_TEST = NODE_ENV === 'testing';
