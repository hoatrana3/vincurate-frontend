import usersService from '@/api/services/users.service'
import articlesService from '@/api/services/articles.service'

export default ({ $axios }, inject) => {
  inject('usersService', usersService($axios))
  inject('articlesService', articlesService($axios))
}
