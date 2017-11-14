import * as postcss from 'postcss'
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'
import minify from 'bredon-minify'

export default postcss.plugin('postcss-bredon-minify', (options = {}) => {
  return (root, result) => {
    root.walkDecls(decl => {
      decl.value = minify(camelCaseProperty(decl.prop), decl.value)
    })
  }
})
