import timeHelpers from '@/utils/helpers/timeHelpers'
import objectHelpers from '@/utils/helpers/objectHelpers'
import unitHelpers from '~/utils/helpers/unitHelpers'
import articleHelpers from '@/utils/helpers/articleHelpers'

export default ($context) => ({
  ...timeHelpers($context),
  ...objectHelpers($context),
  ...unitHelpers($context),
  ...articleHelpers($context)
})
