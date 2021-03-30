import usersService from '@/api/services/users.service'
import articlesService from '@/api/services/articles.service'
import seqLabelVersionsService from '@/api/services/seqLabelVersion.service'
import labelsService from '@/api/services/labels.service'
import projectsService from '@/api/services/projects.service'

export default ({ $axios }, inject) => {
  inject('usersService', usersService($axios))
  inject('articlesService', articlesService($axios))
  inject('seqLabelVersionsService', seqLabelVersionsService($axios))
  inject('labelsService', labelsService($axios))
  inject('projectsService', projectsService($axios))
}
