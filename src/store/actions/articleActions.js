import ADD_ARTICLE from '../constants'

const addArticle = (payload) => {
    return { type: ADD_ARTICLE, payload }
};

export { addArticle };