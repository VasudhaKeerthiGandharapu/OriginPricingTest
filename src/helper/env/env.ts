import * as dotenv from 'dotenv'

export const getEnv = () => {
    if (process.env.ENV) {
        dotenv.config({
            override: true,
            path: `src/helper/env/.env.${process.env.ENV}`
        })
    } else {
        console.error("NO ENV PASSED!")
    }

}

export const getBrowser = () => {
    if (process.env.BROWSER) {
        dotenv.config({
            override: true,
            path: `src/helper/env/.env.${process.env.ENV}`
        })
    } else {
        console.error("NO BROWSER PASSED!")
    }

}

export const getTags = () => {
    if (process.env.TAGS) {
        dotenv.config({
            override: true,
            path: `src/helper/env/.env.${process.env.ENV}`
        })
    } else {
        console.error("NO TAGS PASSED!")
    }

}

export const getHead = () => {
    if (!process.env.HEADLESS) {
        dotenv.config({
            override: true,
            path: `src/helper/env/.env.${process.env.ENV}`
        })
    } else {
        console.log("NO HEADLESS PASSED!")
    }

}