import { TOKEN_UPDATE } from '../constants'

const updateToken = (payload) => {
    return { type: TOKEN_UPDATE, payload }
};

export { updateToken };