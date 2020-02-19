const {
    MAIL_SERVICE = 'gmail',
    MAIL_AUTH_USERNAME = 'readit.mailer@gmail.com',
    MAIL_AUTH_PASSWORD = '!Readitmailer123',
    MAIL_CLIENT_ID = '848657893665-b2skjnfmbe33v499mikl9g4lvk3pkt3t.apps.googleusercontent.com',
    MAIL_CLIENT_SECRET = 'Lx5joBgllALy3sVwAfqtSO7P',
    MAIL_REFRESH_TOKEN = '1//04mgQsZ0sbwPGCgYIARAAGAQSNwF-L9Ir0JFqmHq8i_5J9o94HLLkN0ZqjqItHi24yJ9Xv6A3WFdrpnxdB9z4TzPaRQg_YN92IUs'
} = process.env;

export const MAILER_OPTIONS = {
    service: MAIL_SERVICE,
    auth: {
        // type: 'OAuth2',
        user: MAIL_AUTH_USERNAME,
        pass: MAIL_AUTH_PASSWORD
        // clientId: MAIL_CLIENT_ID,
        // clientSecret: MAIL_CLIENT_SECRET,
        // refreshToken: MAIL_REFRESH_TOKEN
    }
};
