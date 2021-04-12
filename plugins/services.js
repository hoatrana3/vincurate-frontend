import usersService from '@/api/services/users.service'
import articlesService from '@/api/services/articles.service'
import seqLabelVersionsService from '@/api/services/seqLabelVersion.service'
import categoryVersionsService from '@/api/services/categoryVersion.service'
import translationVersionsService from '@/api/services/translationVersion.service'
import labelsService from '@/api/services/labels.service'
import categoriesService from '@/api/services/categories.service'
import projectsService from '@/api/services/projects.service'

export default ({ $axios }, inject) => {
  inject('usersService', usersService($axios))
  inject('articlesService', articlesService($axios))
  inject('seqLabelVersionsService', seqLabelVersionsService($axios))
  inject('categoryVersionsService', categoryVersionsService($axios))
  inject('translationVersionsService', translationVersionsService($axios))
  inject('labelsService', labelsService($axios))
  inject('categoriesService', categoriesService($axios))
  inject('projectsService', projectsService($axios))
}
