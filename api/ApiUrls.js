import ApiUrl from './ApiUrl'

export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
export const BASE_API_V1_URL = process.env.BASE_URL_VER_1 || `${BASE_URL}/v1`

export const GET_ALL_USERS = ApiUrl.build(`${BASE_API_V1_URL}/users/all`)
export const REGISTER_USER = ApiUrl.build(`${BASE_API_V1_URL}/auth/register`)
export const AUTHENTICATE_USER = ApiUrl.build(`${BASE_API_V1_URL}/auth/login`)
export const GET_USER = ApiUrl.build(`${BASE_API_V1_URL}/users/:id`)
export const UPDATE_USER = ApiUrl.build(`${BASE_API_V1_URL}/users/:id`)
export const DELETE_USER = ApiUrl.build(`${BASE_API_V1_URL}/users/:id`)

export const GET_USER_ARTICLES = ApiUrl.build(
  `${BASE_API_V1_URL}/users/:id/articles`
)
export const SEARCH_ARTICLES = ApiUrl.build(`${BASE_API_V1_URL}/articles/`)
export const GET_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id`)
export const UPDATE_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id`)
export const UPDATE_ARTICLE_ANNOTATIONS = ApiUrl.build(
  `${BASE_API_V1_URL}/articles/:id/update-annotations`
)
export const CREATE_ARTICLE_EDIT_VERSION = ApiUrl.build(
  `${BASE_API_V1_URL}/articles/:id/create-edit-version`
)
export const GET_NEXT_OLDER_ARTICLE = ApiUrl.build(
  `${BASE_API_V1_URL}/articles/:id/next`
)
export const EXPORT_ARTICLE = ApiUrl.build(
  `${BASE_API_V1_URL}/articles/:id/export`
)
export const UPLOAD_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/upload`)

export const GET_EDIT_VERSION = ApiUrl.build(
  `${BASE_API_V1_URL}/edit-versions/:id`
)
export const UPDATE_EDIT_VERSION = ApiUrl.build(
  `${BASE_API_V1_URL}/edit-versions/:id`
)
export const APPLY_EDIT_VERSION = ApiUrl.build(
  `${BASE_API_V1_URL}/edit-versions/:id/apply`
)

export const GET_ALL_LABELS = ApiUrl.build(`${BASE_API_V1_URL}/labels`)

export const GET_USER_PROJECTS = ApiUrl.build(
  `${BASE_API_V1_URL}/users/:id/projects`
)
export const CREATE_PROJECT = ApiUrl.build(`${BASE_API_V1_URL}/projects`)
export const GET_PROJECTS = ApiUrl.build(`${BASE_API_V1_URL}/projects`)
export const GET_PROJECT = ApiUrl.build(`${BASE_API_V1_URL}/projects/:id`)
export const UPDATE_PROJECT = ApiUrl.build(`${BASE_API_V1_URL}/projects/:id`)
export const DELETE_PROJECT = ApiUrl.build(`${BASE_API_V1_URL}/projects/:id`)
export const UPDATE_PROJECT_ROLES = ApiUrl.build(
  `${BASE_API_V1_URL}/projects/update-roles`
)
