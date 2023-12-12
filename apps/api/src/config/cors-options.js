import allowedOrigins from './allowed-origins.js';

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

export default corsOptions;
