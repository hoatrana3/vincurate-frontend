import helpers from '@/utils/helpers'
import apiHandler from '@/api/apiHandler'

export default ($context) => {
  const handler = apiHandler($context).build()
  $context.store.dispatch('users/getAllUsers', handler)
  helpers($context).initLabelCofigs()
}
