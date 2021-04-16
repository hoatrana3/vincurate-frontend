import helpers from '@/utils/helpers'
import apiHandler from '@/api/apiHandler'

export default ($context) => {
  $context.store.dispatch('users/getAllUsers', apiHandler($context).build())
  $context.store.dispatch('categories/getAllCategories', apiHandler($context).build())
  $context.store.dispatch('labelSets/getAllLabelSets', apiHandler($context).build())
  helpers($context).initLabelCofigs()
}
