import * as constants from './constants'

const USERS_BASE_URL = `${constants.GITHUB_API_BASE_URL}/users/`
export const GET = {
    byUsername: (username) => `${USERS_BASE_URL}${username}`
}
export const ERROR_CODES = {
    API_RATE_LIMIT: 403,
    USER_NOT_FOUND: 404 
}
export const ERROR_MESSAGES = {
    USER_NOT_FOUND: (username) => `Could not find github user with username: ${username}`,
    API_RATE_LIMIT: "Github API rate limit exceeded",
    OTHER: "Unknown error, try again"
}