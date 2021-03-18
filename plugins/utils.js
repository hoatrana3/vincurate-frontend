import helpers from '@/utils/helpers'
import notify from '@/utils/notify'
import apiHandler from '@/api/apiHandler'
import storage from '@/utils/storage'
import loader from '@/utils/loader'

export default ($context, inject) => {
  inject('notify', notify($context))
  inject('loader', loader($context))
  inject('helpers', helpers($context))
  inject('apiHandler', apiHandler($context))
  inject('storage', storage($context))
}
