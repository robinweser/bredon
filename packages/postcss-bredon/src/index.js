import * as postcss from 'postcss'
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'
import { compile } from 'bredon'

export default postcss.plugin('postcss-bredon-minify', (options = {}) => {
  return (root, result) => {
    root.walkDecls(decl => {
      try {
        decl.value = compile(decl.value, {
          ...options,
          context: { property: camelCaseProperty(decl.prop) },
        })
      } catch (e) {}
    })
  }
})
