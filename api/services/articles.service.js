import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_SEQ_LABEL_VERSION,
  DELETE_ARTICLE,
  EXPORT_ARTICLE,
  GET_ARTICLE,
  GET_NEXT_OLDER_ARTICLE,
  SEARCH_ARTICLES, UPDATE_ARTICLE,
  UPDATE_ARTICLE_ANNOTATIONS,
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
  exportArticle({ params, query }) {
    window.open(EXPORT_ARTICLE.get(params, query))
  },
  createArticle({ data }) {
    return $axios.post(CREATE_ARTICLE.get(), data)
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
  deleteArticle({ params }) {
    return $axios.delete(DELETE_ARTICLE.get(params))
  },
  updateArticleAnnotations({ params, data }) {
    return $axios.patch(UPDATE_ARTICLE_ANNOTATIONS.get(params), data)
  },
  createArticleSeqLabelVersion({ params, data }) {
    return $axios.post(CREATE_ARTICLE_SEQ_LABEL_VERSION.get(params), data)
  },
})
