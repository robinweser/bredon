import {
  isInteger,
  isString,
  isURL,
  isIdentifier,
  isFloat,
  isKeyword,
  isDimension,
  isFunctionExpression
} from 'bredon-types'
import { isLength, isColor } from './types'

import matchesKeyword from './matchesKeyword'
import matchesIdentifier from './matchesIdentifier'

export default {
  alignItems: matchesKeyword('alignItems'),
  alignContent: matchesKeyword('alignContent'),
  justifyContent: matchesKeyword('justifyContent'),
  alignSelf: matchesKeyword('alignSelf'),
  all: isKeyword,
  backgroundAttachment: matchesKeyword('backgroundAttachment'),
  backgroundBlendMode: matchesKeyword('backgroundBlendMode'),
  backgroundClip: matchesKeyword('backgroundClip'),
  backgroundOrigin: matchesKeyword('backgroundOrigin'),
  behavior: isURL,
  blockSize: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return (
        isLength(node[0]) &&
        matchesIdentifier(['border-box', 'content-box'])(node[1])
      )
    }

    return isLength(node) || matchesKeyword('blockSize')(node)
  },
  baselineShift: node =>
    isNumber(node) || isLength(node) || matchesKeyword('baselineShift')(node),
  backgroundColor: isColor,
  backfaceVisibility: matchesKeyword('backfaceVisibility'),
  appearance: matchesKeyword('appearance'),
  alignmentBaseline: matchesKeyword('alignmentBaseline'),
  animationDelay: isDimension,
  animationDirection: matchesKeyword('animationDirection'),
  animationDuration: isDimension,
  boxAlign: matchesKeyword('boxAlign'),
  boxOrdinalGroup: isInteger,
  boxOrient: matchesKeyword('boxOrient'),
  boxSizing: matchesKeyword('boxSizing'),
  breakAfter: matchesKeyword('breakAfter'),
  breakBefore: matchesKeyword('breakBefore'),
  breakInside: matchesKeyword('breakInside'),
  top: node => isLength(node) || matchesKeyword('top')(node),
  bottom: node => isLength(node) || matchesKeyword('bottom')(node),
  left: node => isLength(node) || matchesKeyword('left')(node),
  right: node => isLength(node) || matchesKeyword('right')(node),
  animationFillMode: matchesKeyword('animationFillMode'),
  animationIterationCount: node =>
    matchesKeyword('animationIterationCount')(node) || isInteger(node),
  animationName: isIdentifier,
  animationPlayState: matchesKeyword('animationPlayState'),
  animationTimingFunction: node =>
    matchesKeyword('animationTimingFunction')(node) ||
    isFunctionExpression(node),
  borderBottomColor: isColor,
  borderBottomStyle: matchesKeyword('borderBottomStyle'),
  borderBottomWidth: isLength,
  borderColor: isColor,
  borderLeftColor: isColor,
  borderLeftStyle: matchesKeyword('borderLeftStyle'),
  borderLeftWidth: isLength,
  borderRightColor: isColor,
  borderRightStyle: matchesKeyword('borderRightStyle'),
  borderRightWidth: isLength,
  borderStyle: matchesKeyword('borderStyle'),
  borderTopColor: isColor,
  borderTopStyle: matchesKeyword('borderTopStyle'),
  borderTopWidth: isLength,
  borderWidth: isLength,
  columnCount: node => isInteger(node) || matchesKeyword('columnCount')(node),
  columnRuleColor: isColor,
  columnRuleStyle: matchesKeyword('columnRuleStyle'),
  columnRuleWidth: node => isLength(node) || matchesKeyword('columnRuleWidth'),
  columnWidth: node => isLength(node) || matchesKeyword('columnWidth'),
  columnFill: matchesKeyword('columnFill'),
  columnSpan: matchesKeyword('columnSpan'),
  columnGap: node => isLength(node) || matchesKeyword('columnGap')(node),
  fontFamily: node =>
    isString(node) || isIdentifier(node) || matchesKeyword('fontFamily')(node),
  fontSize: node => isLength(node) || matchesKeyword('fontSize')(node),
  fontStyle: matchesKeyword('fontStyle'),
  fontVariant: matchesKeyword('fontVariant'),
  fontVariantCaps: matchesKeyword('fontVariantCaps'),
  glyphOrientationHorizontal: node =>
    isDimension(node) && node.unit.match(/rad|deg|turn|grad/) !== null,
  // TODO: validate integer
  fontWeight: node => matchesKeyword('fontWeight') || isInteger(node),
  fontLanguageOverwrite: node =>
    isString(node) || matchesKeyword('fontLanguageOverwrite'),
  fontKerning: matchesKeyword('fontKerning'),
  fontSizeAdjust: node => isFloat(node) || matchesKeyword('fontSizeAdjust'),
  fontStretch: matchesKeyword('fontStretch'),
  // TODO: url cursor
  cursor: matchesKeyword('cursor'),
  direction: matchesKeyword('direction'),
  display: matchesKeyword('display'),
  displayInside: matchesKeyword('displayInside'),
  displayList: matchesKeyword('displayList'),
  displayOutside: matchesKeyword('displayOutside'),
  dominantBaseline: matchesKeyword('dominantBaseline'),
  emptyCells: matchesKeyword('emptyCells'),
  fillOpacity: node =>
    isInteger(node) && (node.value === 1 || node.value === 0),
  fillRule: matchesKeyword('fillRule'),
  // TODO: 2 values
  flexBasis: node => matchesKeyword('flexBasis')(node),
  flexDirection: matchesKeyword('flexDirection'),
  flexWrap: matchesKeyword('flexWrap'),
  float: matchesKeyword('float'),
  flexGrow: node => isFloat(node) || isInteger(node),
  flexShrink: node => isFloat(node) || isInteger(node),
  lineHeight: node =>
    matchesKeyword('lineHeight')(node) ||
    isLength(node) ||
    isFloat(node) ||
    isInteger(node),
  outlineColor: isColor,
  outlineStyle: matchesKeyword('outlineStyle'),
  outlineWidth: isLength,
  paddingLeft: isLength,
  paddingRight: isLength,
  paddingTop: isLength,
  paddingBottom: isLength,
  marginLeft: isLength,
  marginRight: isLength,
  marginTop: isLength,
  marginBottom: isLength,
  textDecorationColor: isColor,
  textDecorationLine: matchesKeyword('textDecorationLine'),
  textDecorationStyle: matchesKeyword('textDecorationStyle'),
  boxDecorationBreak: matchesKeyword('boxDecorationBreak'),
  boxDirection: matchesKeyword('boxDirection'),
  boxFlex: node => isFloat(node) || isInteger(node),
  boxFlexGroup: isInteger,
  boxLines: matchesKeyword('boxLines'),
  boxPack: matchesKeyword('boxPack'),
  captionSide: matchesKeyword('captionSide'),
  caretColor: node => isColor(node) || matchesKeyword('caretColor')(node),
  clear: matchesKeyword('clear'),
  // TODO: is valid rect
  clip: node =>
    (node.isFunctionExpression(node) && node.callee.name === 'rect') ||
    matchesKeyword('clip'),
  // TODO: rest
  clipPath: node => matchesKeyword('clipPath')(node),
  clipRule: matchesKeyword('clipRule'),
  color: isColor
}
