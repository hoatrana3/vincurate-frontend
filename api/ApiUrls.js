import ApiUrl from './ApiUrl'

export const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'
export const BASE_API_V1_URL =
  process.env.BASE_URL_VER_1 || `${BASE_URL}/api/v1`

export const REGISTER_USER = ApiUrl.build(`${BASE_API_V1_URL}/users/register`)
export const AUTHENTICATE_USER = ApiUrl.build(
  `${BASE_API_V1_URL}/users/authenticate`
)
export const GET_USER = ApiUrl.build(`${BASE_API_V1_URL}/users/:id`)
export const UPDATE_USER = ApiUrl.build(`${BASE_API_V1_URL}/users/:id`)

export const SEARCH_ARTICLES = ApiUrl.build(
  `${BASE_API_V1_URL}/articles/search`
)
export const GET_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id`)
export const GET_NEXT_OLDER_ARTICLE = ApiUrl.build(
  `${BASE_API_V1_URL}/articles/:id/next_older`
)
export const EXPORT_ARTICLE = ApiUrl.build(
  `${BASE_API_V1_URL}/articles/:id/export`
)
export const UPLOAD_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/upload`)
