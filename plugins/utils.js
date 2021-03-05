import helpers from '@/utils/helpers'
import notify from '@/utils/notify'
import apiHandler from '@/api/apiHandler'
import storage from '@/utils/storage'

export default ($context, inject) => {
  inject('helpers', helpers($context))
  inject('notify', notify($context))
  inject('apiHandler', apiHandler($context))
  inject('storage', storage($context))

  helpers($context).setConceptsCssVarialbes()
}
