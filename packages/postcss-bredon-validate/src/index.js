import * as postcss from 'postcss'
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'
import validate from 'bredon-validate'

export default postcss.plugin('postcss-bredon-validate', (options = {}) => {
  return (root, result) => {
    root.walkDecls(decl => {
      const declaration = decl.prop + ': ' + decl.value
      try {
        if (!validate(camelCaseProperty(decl.prop), decl.value)) {
          decl.warn(result, 'Invalid declaration: ' + declaration, {
            plugin: 'postcss-bredon-validate',
            word: decl.value,
          })
        }
      } catch (e) {
        console.warn(`Bredon couldn't parse ${declaration}.
If this is yet a valid CSS value, please file an issue:
https://github.com/rofrischmann/bredon/issues/new
`)
      }
    })
  }
})
