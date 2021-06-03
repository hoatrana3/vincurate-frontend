import ApiUrl from './ApiUrl'

export const BASE_URL = 'https://vincurate-backend.herokuapp.com/'
// export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
export const BASE_API_V1_URL = process.env.BASE_URL_VER_1 || `${BASE_URL}/v1`

export const GET_ALL_USERS = ApiUrl.build(`${BASE_API_V1_URL}/users/all`)
export const REGISTER_USER = ApiUrl.build(`${BASE_API_V1_URL}/auth/register`)
export const AUTHENTICATE_USER = ApiUrl.build(`${BASE_API_V1_URL}/auth/login`)
export const GET_USER = ApiUrl.build(`${BASE_API_V1_URL}/users/:id`)
export const UPDATE_USER = ApiUrl.build(`${BASE_API_V1_URL}/users/:id`)
export const DELETE_USER = ApiUrl.build(`${BASE_API_V1_URL}/users/:id`)

export const GET_USER_ARTICLES = ApiUrl.build(`${BASE_API_V1_URL}/users/:id/articles`)
export const SEARCH_ARTICLES = ApiUrl.build(`${BASE_API_V1_URL}/articles/`)
export const CREATE_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles`)
export const GET_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id`)
export const GET_ARTICLE_LABELING_SUGGESTIONS = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id/labeling-suggestions`)
export const UPDATE_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id`)
export const DELETE_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id`)
export const UPDATE_ARTICLE_ANNOTATIONS = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id/update-annotations`)
export const UPDATE_ARTICLE_CATEGORIES = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id/update-categories`)
export const UPDATE_ARTICLE_TRANSLATION = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id/update-translation`)
export const CREATE_ARTICLE_SEQ_LABEL_VERSION = ApiUrl.build(
  `${BASE_API_V1_URL}/articles/:id/create-seq-label-version`)
export const CREATE_ARTICLE_CATEGORY_VERSION = ApiUrl.build(
  `${BASE_API_V1_URL}/articles/:id/create-category-version`)
export const CREATE_ARTICLE_TRANSLATION_VERSION = ApiUrl.build(
  `${BASE_API_V1_URL}/articles/:id/create-translation-version`)
export const GET_NEXT_OLDER_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id/next`)
export const EXPORT_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/:id/export`)
export const UPLOAD_ARTICLE = ApiUrl.build(`${BASE_API_V1_URL}/articles/upload`)

export const GET_SEQ_LABEL_VERSION = ApiUrl.build(`${BASE_API_V1_URL}/seq-label-versions/:id`)
export const UPDATE_SEQ_LABEL_VERSION = ApiUrl.build(`${BASE_API_V1_URL}/seq-label-versions/:id`)
export const APPLY_SEQ_LABEL_VERSION = ApiUrl.build(`${BASE_API_V1_URL}/seq-label-versions/:id/apply`)

export const GET_CATEGORY_VERSION = ApiUrl.build(`${BASE_API_V1_URL}/category-versions/:id`)
export const UPDATE_CATEGORY_VERSION = ApiUrl.build(`${BASE_API_V1_URL}/category-versions/:id`)
export const APPLY_CATEGORY_VERSION = ApiUrl.build(`${BASE_API_V1_URL}/category-versions/:id/apply`)

export const GET_TRANSLATION_VERSION = ApiUrl.build(`${BASE_API_V1_URL}/translation-versions/:id`)
export const UPDATE_TRANSLATION_VERSION = ApiUrl.build(`${BASE_API_V1_URL}/translation-versions/:id`)
export const APPLY_TRANSLATION_VERSION = ApiUrl.build(`${BASE_API_V1_URL}/translation-versions/:id/apply`)

export const GET_ALL_LABELS = ApiUrl.build(`${BASE_API_V1_URL}/labels`)
export const GET_USER_LABELS = ApiUrl.build(`${BASE_API_V1_URL}/users/:id/labels`)
export const CREATE_LABEL = ApiUrl.build(`${BASE_API_V1_URL}/labels`)
export const GET_LABEL = ApiUrl.build(`${BASE_API_V1_URL}/labels/:id`)
export const UPDATE_LABEL = ApiUrl.build(`${BASE_API_V1_URL}/labels/:id`)
export const DELETE_LABEL = ApiUrl.build(`${BASE_API_V1_URL}/labels/:id`)

export const GET_ALL_LABEL_SETS = ApiUrl.build(`${BASE_API_V1_URL}/label-sets`)
export const GET_USER_LABEL_SETS = ApiUrl.build(`${BASE_API_V1_URL}/users/:id/label-sets`)
export const CREATE_LABEL_SET = ApiUrl.build(`${BASE_API_V1_URL}/label-sets`)
export const GET_LABEL_SET = ApiUrl.build(`${BASE_API_V1_URL}/label-sets/:id`)
export const UPDATE_LABEL_SET = ApiUrl.build(`${BASE_API_V1_URL}/label-sets/:id`)
export const DELETE_LABEL_SET = ApiUrl.build(`${BASE_API_V1_URL}/label-sets/:id`)

export const GET_ALL_CATEGORIES = ApiUrl.build(`${BASE_API_V1_URL}/categories`)
export const GET_USER_CATEGORIES = ApiUrl.build(`${BASE_API_V1_URL}/users/:id/categories`)
export const CREATE_CATEGORY = ApiUrl.build(`${BASE_API_V1_URL}/categories`)
export const GET_CATEGORY = ApiUrl.build(`${BASE_API_V1_URL}/categories/:id`)
export const UPDATE_CATEGORY = ApiUrl.build(`${BASE_API_V1_URL}/categories/:id`)
export const DELETE_CATEGORY = ApiUrl.build(`${BASE_API_V1_URL}/categories/:id`)

export const GET_USER_PROJECTS = ApiUrl.build(`${BASE_API_V1_URL}/users/:id/projects`)
export const CREATE_PROJECT = ApiUrl.build(`${BASE_API_V1_URL}/projects`)
export const GET_PROJECTS = ApiUrl.build(`${BASE_API_V1_URL}/projects`)
export const GET_PROJECT = ApiUrl.build(`${BASE_API_V1_URL}/projects/:id`)
export const UPDATE_PROJECT = ApiUrl.build(`${BASE_API_V1_URL}/projects/:id`)
export const DELETE_PROJECT = ApiUrl.build(`${BASE_API_V1_URL}/projects/:id`)
export const UPDATE_PROJECT_ROLES = ApiUrl.build(
  `${BASE_API_V1_URL}/projects/update-roles`
)
