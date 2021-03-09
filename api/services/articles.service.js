import {
  EXPORT_ARTICLE,
  GET_ARTICLE,
  GET_NEXT_OLDER_ARTICLE,
  SEARCH_ARTICLES, UPDATE_ARTICLE, UPDATE_USER,
  UPLOAD_ARTICLE
} from '@/api/ApiUrls'

export default ($axios) => ({
  searchArticles({ query }) {
    return $axios.get(SEARCH_ARTICLES.get(null, query))
  },
  fetchArticle({ params }) {
    return $axios.get(GET_ARTICLE.get(params))
  },
  fetchNextOlderArticle({ params }) {
    return $axios.get(GET_NEXT_OLDER_ARTICLE.get(params))
  },
  exportArticle({ params }) {
    return $axios.get(EXPORT_ARTICLE.get(params), {
      responseType: 'blob',
    })
  },
  uploadArticle({ data }) {
    return $axios.post(UPLOAD_ARTICLE.get(), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  updateArticle({ params, data }) {
    return $axios.patch(UPDATE_ARTICLE.get(params), data)
  },
})
