import {
  isInteger,
  isStringLiteral,
  isURL,
  isIdentifier,
  isFloat,
  isDimension,
  isFunctionExpression,
} from 'bredon-types'

import {
  isAngle,
  isColor,
  isCubicBezier,
  isFrames,
  isGlobal,
  isLength,
  isNumber,
  isOpacity,
  isPercentage,
  isSize,
  isSteps,
  isSvgLength,
  isTime,
} from './types'

import matchesKeyword from './utils/matchesKeyword'
import matchesIdentifier from './utils/matchesIdentifier'
import validateNodeList from './utils/validateNodeList'
import validateUnorderedNodeList from './utils/validateUnorderedNodeList'
import arrayReduce from './utils/arrayReduce'

const validators = {
  MozBinding: node => isURL(node) || matchesKeyword('MozBinding'),
  MozBorderBottomColors: (node, isValueSet) => {
    if (isValueSet) {
      return validateNodeList(isColor)(node)
    }

    return isColor(node)
  },
  MozBorderLeftColors: (node, isValueSet) => {
    if (isValueSet) {
      return validateNodeList(isColor)(node)
    }

    return isColor(node)
  },
  MozBorderRadiusBottomleft: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  MozBorderRadiusBottomright: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  MozBorderRadiusTopleft: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  MozBorderRadiusTopright: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  MozBorderRightColors: (node, isValueSet) => {
    if (isValueSet) {
      return validateNodeList(isColor)(node)
    }

    return isColor(node)
  },
  MozBorderTopColors: (node, isValueSet) => {
    if (isValueSet) {
      return validateNodeList(isColor)(node)
    }

    return isColor(node)
  },
  MozForceBrokenImageIcon: isInteger,
  MozOutlineRadiusBottomleft: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  MozOutlineRadiusBottomright: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  MozOutlineRadiusTopleft: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  MozOutlineRadiusTopright: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },

  WebkitBorderBeforeColor: isColor,
  WebkitBorderBeforeStyle: (node, isValueSet) =>
    isValueSet &&
    node.length <= 4 &&
    validateNodeList(matchesKeyword('WebkitBorderBeforeStyle')),
  WebkitBorderBeforeWidth: (node, isValueSet) => {
    if (isValueSet && node.length <= 4) {
      return validateNodeList(
        node =>
          isLength(node) || matchesKeyword('WebkitBorderBeforeWidth')(node)
      )
    }

    return isLength(node)
  },
  WebkitLineCamp: node => isInteger(node) && !node.negative,
  WebkitMaskPositionX: node => isLength(node) || isPercentage(node),
  WebkitMaskPositionY: node => isLength(node) || isPercentage(node),
  WebkitTapHighlightColor: isColor,
  WebkitTextFillColor: isColor,
  WebkitTextStrokeColor: isColor,
  WebkitTextStrokeWidth: isLength,
  animationDelay: isDimension,
  animationDuration: isDimension,
  animationIterationCount: isInteger,
  animationName: isIdentifier,
  animationTimingFunction: isFunctionExpression,
  backgroundColor: isColor,
  baselineShift: node => isNumber(node) || isLength(node),
  behavior: isURL,
  blockSize: isSize,
  border: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderWidth,
      validators.borderStyle,
      validators.borderColor,
    ]),
  borderBlockEnd: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderBlockEndWidth,
      validators.borderBlockEndColor,
      validators.borderBlockEndStyle,
    ]),
  borderBlockEndColor: isColor,
  borderBlockEndStyle: (node, isValueSet) =>
    isValueSet &&
    node.length <= 4 &&
    validateNodeList(matchesKeyword('borderBlockEndStyle')),
  borderBlockEndWidth: (node, isValueSet) => {
    if (isValueSet && node.length <= 4) {
      return validateNodeList(
        node => isLength(node) || matchesKeyword('borderBlockEndWidth')(node)
      )
    }

    return isLength(node)
  },
  borderBlockStart: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderBlockStartWidth,
      validators.borderBlockStartColor,
      validators.borderBlockStartStyle,
    ]),
  borderBlockStartColor: isColor,
  borderBlockStartStyle: (node, isValueSet) =>
    isValueSet &&
    node.length <= 4 &&
    validateNodeList(matchesKeyword('borderBlockStartStyle')),
  borderBlockStartWidth: (node, isValueSet) => {
    if (isValueSet && node.length <= 4) {
      return validateNodeList(
        node => isLength(node) || matchesKeyword('borderBlockStartWidth')(node)
      )
    }

    return isLength(node)
  },
  borderBottom: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderBottomWidth,
      validators.borderBottomColor,
      matchesKeyword('borderBottomStyle'),
    ]),
  borderBottomColor: isColor,
  borderBottomLeftRadius: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  borderBottomRightRadius: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  borderBottomWidth: isLength,
  borderColor: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderTopColor,
      validators.borderLeftColor,
      validators.borderBottomColor,
      validators.borderRightColor,
    ]),
  borderImageOutset: (node, isValueSet) => {
    if (isValueSet && node.length <= 4) {
      return validateNodeList(node => isLength(node) || isNumber(node))
    }

    return isLength(node) || isNumber(node)
  },
  borderImageRepeat: (node, isValueSet) =>
    isValueSet &&
    node.length === 2 &&
    validateNodeList(matchesKeyword('borderImageRepeat')),
  borderImageWidth: (node, isValueSet) => {
    if (isValueSet && node.length <= 4) {
      return validateNodeList(
        node =>
          isLength(node) ||
          isPercentage(node) ||
          isNumber(node) ||
          matchesKeyword('borderImageWidth')(node)
      )
    }

    return isLength(node) || isPercentage(node) || isNumber(node)
  },
  borderInlineEnd: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderInlineEndWidth,
      validators.borderInlineEndColor,
      validators.borderInlineEndStyle,
    ]),
  borderInlineEndColor: isColor,
  borderInlineEndStyle: (node, isValueSet) =>
    isValueSet &&
    node.length <= 4 &&
    validateNodeList(matchesKeyword('borderInlineEndStyle')),
  borderInlineEndWidth: (node, isValueSet) => {
    if (isValueSet && node.length <= 4) {
      return validateNodeList(
        node => isLength(node) || matchesKeyword('borderInlineEndWidth')(node)
      )
    }

    return isLength(node)
  },
  borderInlineStart: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderInlineStartWidth,
      validators.borderInlineStartColor,
      validators.borderInlineStartStyle,
    ]),
  borderInlineStartColor: isColor,
  borderInlineStartStyle: (node, isValueSet) =>
    isValueSet &&
    node.length <= 4 &&
    validateNodeList(matchesKeyword('borderInlineStartStyle')),
  borderInlineStartWidth: (node, isValueSet) => {
    if (isValueSet && node.length <= 4) {
      return validateNodeList(
        node => isLength(node) || matchesKeyword('borderInlineStartWidth')(node)
      )
    }

    return isLength(node)
  },
  borderLeft: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderLeftWidth,
      validators.borderLeftColor,
      matchesKeyword('borderLeftStyle'),
    ]),
  borderLeftColor: isColor,
  borderLeftWidth: isLength,
  // TODO: / value syntax
  borderRadius: (node, isValueSet) => {
    if (isValueSet) {
      return (
        node.length === 2 &&
        validateNodeList(node => isLength(node) || isPercetange(node))(node)
      )
    }

    return isLength(node) || isPercentage(node)
  },
  borderRight: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderRightWidth,
      validators.borderRightColor,
      matchesKeyword('borderRightStyle'),
    ]),
  borderRightColor: isColor,
  borderRightWidth: isLength,
  borderSpacing: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(isLength)
    }

    return isLength(node)
  },
  borderStyle: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      matchesKeyword('borderLeftStyle'),
      matchesKeyword('borderTopStyle'),
      matchesKeyword('borderBottomStyle'),
      matchesKeyword('borderRightStyle'),
    ]),
  borderTop: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderTopWidth,
      validators.borderTopColor,
      matchesKeyword('borderTopStyle'),
    ]),
  borderTopColor: isColor,
  borderTopWidth: isLength,
  borderTopLeftRadius: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  borderTopRightRadius: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(node => isLength(node) || isPercentage(node))
    }
    return isLength(node) || isPercentage(node)
  },
  borderWidth: (node, isValueSet) =>
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.borderTopWidth,
      validators.borderLeftWidth,
      validators.borderBottomWidth,
      validators.borderRightWidth,
    ]),
  bottom: isLength,
  boxFlex: node => isFloat(node) || isInteger(node),
  boxFlexGroup: isInteger,
  boxOrdinalGroup: isInteger,
  caretColor: isColor,
  // TODO: is valid rect
  clip: node => isFunctionExpression(node) && node.callee.name === 'rect',
  color: isColor,
  columnCount: isInteger,
  columnGap: isLength,
  columnRuleColor: isColor,
  columnRuleWidth: isLength,
  columnWidth: isLength,
  fillOpacity: isOpacity,
  flex: (node, isValueSet) => {
    if (isValueSet) {
      return (
        (node.length === 2 &&
          validateUnorderedNodeList(node, [
            validators.flexGrow,
            validators.flexBasis,
          ])) ||
        (node.length === 3 &&
          ((validators.flexGrow(node[0]) &&
            validators.flexShrink(node[1]) &&
            validators.flexBasis(node[2])) ||
            (validators.flexBasis(node[0]) &&
              validators.flexGrow(node[1]) &&
              validators.flexShrink(node[2]))))
      )
    }

    return validators.flexBasis(node) || validators.flexGrow(node)
  },
  flexGrow: node => isFloat(node) || isInteger(node),
  flexShrink: node => isFloat(node) || isInteger(node),
  fontFamily: node => isStringLiteral(node) || isIdentifier(node),
  fontLanguageOverwrite: isStringLiteral,
  fontSize: isLength,
  fontSizeAdjust: isFloat,
  fontWeight: node =>
    isInteger(node) &&
    [100, 200, 300, 400, 500, 600, 700, 800, 900].indexOf(node.value) !== -1,
  glyphOrientationHorizontal: isAngle,
  glyphOrientationVertical: isAngle,
  height: isSize,
  inlineSize: isSize,
  kerning: isSvgLength,
  left: isLength,
  letterSpacing: isLength,
  lineHeight: node => isLength(node) || isFloat(node) || isInteger(node),
  listStyleImage: isURL,
  marginBlockEnd: isLength,
  marginBlockStart: isLength,
  marginBottom: isLength,
  marginInlineEnd: isLength,
  marginInlineStart: isLength,
  marginLeft: isLength,
  marginRight: isLength,
  marginTop: isLength,
  marker: isURL,
  markerEnd: isURL,
  markerMid: isURL,
  markerOffset: isLength,
  markerStart: isURL,
  maxBlockSize: isLength,
  maxHeight: isLength,
  maxInlineSize: isLength,
  maxWidth: isLength,
  minBlockSize: isLength,
  minHeight: isLength,
  minInlineSize: isLength,
  minWidth: isLength,
  msFilter: isStringLiteral,
  msFlexNegative: isNumber,
  msFlexOrder: isInteger,
  msFlexPositive: isNumber,
  offsetBlockEnd: isLength,
  offsetBlockStart: isLength,
  offsetDistance: isLength,
  offsetInlineEnd: isLength,
  offsetInlineStart: isLength,
  opacity: isOpacity,
  order: isInteger,
  orphans: isInteger,
  outlineColor: isColor,
  outlineOffset: isLength,
  outlineWidth: isLength,
  paddingBlockEnd: isLength,
  paddingBlockStart: isLength,
  paddingBottom: isLength,
  paddingInlineEnd: isLength,
  paddingInlineStart: isLength,
  // TODO: add laddings with percentage
  paddingLeft: node => isLength(node) || isPercentage(node),
  paddingRight: isLength,
  paddingTop: isLength,
  pauseAfter: isTime,
  pauseBefore: isTime,
  perspective: isLength,
  restAfter: isTime,
  restBefore: isTime,
  right: isLength,
  shapeImageThreshold: node => isFloat(node) || isInteger(node),
  shapeMargin: isLength,
  strokeDasharray: (node, isValueSet) => {
    if (isValueSet) {
      return validateNodeList(isSvgLength)(node)
    }

    return isSvgLength(node)
  },
  strokeDashoffset: isSvgLength,
  strokeMiterlimit: node =>
    (isInteger(node) && node.value >= 1) ||
    (isFloat(node) && node.integer >= 1),
  strokeOpacity: isOpacity,
  strokeWidth: isSvgLength,
  tabSize: isInteger,
  textDecorationColor: isColor,
  textEmphasisColor: isColor,
  textEmphasisPosition: (node, isValueSet) =>
    isValueSet &&
    node.length === 2 &&
    matchesIdentifier(['over', 'under'])(node[0]) &&
    matchesIdentifier(['left', 'right'])(node[1]),
  textIdent: (node, isValueSet) => {
    if (isValueSet) {
      return validateUnorderedNodeList(node, [
        node => isLength(node) || isPercentage(node),
        matchesIdentifier(['hanging']),
        matchesIdentifier(['each-line']),
      ])
    }

    return isLength(node) || isPercentage(node)
  },
  textOverflow: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(
        node => isStringLiteral(node) || matchesKeyword('textOverflow')(node)
      )
    }

    return isStringLiteral(node)
  },
  textShadow: (node, isValueSet) => {
    if (isValueSet) {
      if (node.length === 2) {
        return validateNodeList(isLength)(node)
      }

      if (node.length === 3) {
        return (
          validateNodeList(isLength)(node) ||
          (isLength(node[0]) && isLength(node[1]) && isColor(node[2]))
        )
      }

      if (node.length === 4) {
        return (
          isLength(node[0]) &&
          isLength(node[1]) &&
          isLength(node[2]) &&
          isColor(node[3])
        )
      }
    }
  },
  textSizeAdjust: isPercentage,
  top: isLength,
  touchAction: (node, isValueSet) => {
    if (isValueSet) {
      return validateUnorderedNodeList(node, [
        matchesIdentifier(['pan-x', 'pan-left', 'pan-right']),
        matchesIdentifier(['pan-y', 'pan-up', 'pan-down']),
        matchesIdentifier(['pinch-zoom']),
      ])
    }

    return matchesIdentifier([
      'pan-x',
      'pan-left',
      'pan-right',
      'pan-y',
      'pan-up',
      'pan-down',
      'pinch-zoom',
    ])(node)
  },
  transition: (node, isValueSet) => {
    validateUnorderedNodeList(isValueSet ? node : [node], [
      validators.transitionDelay,
      validators.transitionDuration,
      validators.transitionProperty,
      validators.transitionTimingFunction,
    ])
  },
  transitionProperty: isIdentifier,
  transitionTimingFunction: node =>
    isCubicBezier(node) || isFrames(node) || isSteps(node),
  verticalAlign: node => isLength(node) || isPercentage(node),
  voiceBalance: isNumber,
  voiceDuration: isTime,
  widows: isInteger,
  width: isSize,
  wordSpacing: node => isLength(node) || isPercentage(node),
  zIndex: isInteger,
  zoom: node => isNumber(node) || isPercentage(node),
}

export default validators
