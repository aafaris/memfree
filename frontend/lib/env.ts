export let VECTOR_INDEX_HOST = '';
// Let open source users could one click deploy
if (process.env.VECTOR_INDEX_HOST) {
    VECTOR_INDEX_HOST = process.env.VECTOR_INDEX_HOST;
} else if (process.env.VECTOR_HOST) {
    VECTOR_INDEX_HOST = process.env.VECTOR_HOST;
} else if (process.env.MEMFREE_HOST) {
    VECTOR_INDEX_HOST = `${process.env.MEMFREE_HOST}/vector`;
} else {
    throw new Error('Neither VECTOR_INDEX_HOST, VECTOR_HOST, nor MEMFREE_HOST is defined');
}

const memfreeHost = process.env.MEMFREE_HOST;
export let VECTOR_HOST = '';
// Let open source users could one click deploy
if (process.env.VECTOR_HOST) {
    VECTOR_HOST = process.env.VECTOR_HOST;
} else if (memfreeHost) {
    VECTOR_HOST = `${memfreeHost}/vector`;
} else {
    throw new Error('Neither MEMFREE_HOST nor VECTOR_HOST is defined');
}

export const SERPER_API_KEY = process.env.SERPER_API_KEY;
export const API_TOKEN = process.env.API_TOKEN!;
export const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1';
export const BLACKLIST = process.env.USER_BLACKLIST || '';
