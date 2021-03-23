import timeHelpers from '@/utils/helpers/timeHelpers'
import objectHelpers from '@/utils/helpers/objectHelpers'
import articleHelpers from '@/utils/helpers/articleHelpers'
import permissionHelpers from '@/utils/helpers/permissionHelpers'
import labelHelpers from '@/utils/helpers/labelHelpers'

export default ($context) => ({
  ...timeHelpers($context),
  ...objectHelpers($context),
  ...articleHelpers($context),
  ...permissionHelpers($context),
  ...labelHelpers($context)
})
