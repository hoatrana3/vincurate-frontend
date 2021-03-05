import timeHelpers from '@/utils/helpers/timeHelpers'
import objectHelpers from '@/utils/helpers/objectHelpers'
import tokenHelpers from '~/utils/helpers/unitHelpers'

export default ($context) => ({
  ...timeHelpers($context),
  ...objectHelpers($context),
  ...tokenHelpers($context),
})
