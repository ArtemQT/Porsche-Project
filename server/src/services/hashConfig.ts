import crypto from "crypto";

export const getConfigHash = (config: any) => {
    const normalizedConfig = Object.keys(config)
        .sort()
        .reduce((acc: any, key) => {
            acc[key] = config[key];
            return acc;
        }, {});

    const str = JSON.stringify(normalizedConfig);
    return crypto.createHash('sha256').update(str).digest('hex');
};