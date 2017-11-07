import {
  isInteger,
  isStringLiteral,
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
import arrayReduce from './arrayReduce'

function isSize(property) {
  return (node, isValueSet) => {
    if (isValueSet) {
      return (
        node.length === 2 &&
        isLength(node[0]) &&
        matchesIdentifier(['border-box', 'content-box'])(node[1])
      )
    }

    return isLength(node) || matchesKeyword(property)(node)
  }
}

function isSvgLength(node) {
  return isLength(node) || isFloat(node) || isInteger(node)
}

function isOpacity(node) {
  return node =>
    (isInteger(node) && (node.value === 1 || node.value === 0)) ||
    (isFloat(node) &&
      (node.integer <= 1 && node.integer >= 0 && !node.negative))
}

function isTime(node) {
  return node => isDimension(node) && (node.unit === 's' || node.unit === 'ms')
}

function validateNodeList(validator) {
  return nodes =>
    arrayReduce(
      nodes,
      (isValid, singleNode) => isValid && validator(singleNode),
      true
    )
}

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
  blockSize: isSize('blockSize'),
  height: isSize('height'),
  width: isSize('width'),
  inlineSize: isSize('inlineSize'),
  isolation: matchesKeyword('isolation'),
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
  opacity: isOpacity,
  order: isInteger,
  orphans: isInteger,
  top: node => isLength(node) || matchesKeyword('top')(node),
  bottom: node => isLength(node) || matchesKeyword('bottom')(node),
  left: node => isLength(node) || matchesKeyword('left')(node),
  right: node => isLength(node) || matchesKeyword('right')(node),
  offsetBlockEnd: node =>
    isLength(node) || matchesKeyword('offsetBlockEnd')(node),
  offsetBlockStart: node =>
    isLength(node) || matchesKeyword('offsetBlockStart')(node),
  offsetInlineEnd: node =>
    isLength(node) || matchesKeyword('offsetInlineEnd')(node),
  offsetInlineStart: node =>
    isLength(node) || matchesKeyword('offsetInlineStart')(node),
  offsetDistance: isLength,
  animationFillMode: matchesKeyword('animationFillMode'),
  animationIterationCount: node =>
    isInteger(node) || matchesKeyword('animationIterationCount')(node),
  animationName: isIdentifier,
  animationPlayState: matchesKeyword('animationPlayState'),
  animationTimingFunction: node =>
    isFunctionExpression(node) ||
    matchesKeyword('animationTimingFunction')(node),
  borderBottomColor: isColor,
  borderBottomStyle: matchesKeyword('borderBottomStyle'),
  borderBottomWidth: node =>
    isLength(node) || matchesKeyword('borderBottomWidth')(node),
  borderLeftColor: isColor,
  borderLeftStyle: matchesKeyword('borderLeftStyle'),
  borderLeftWidth: node =>
    isLength(node) || matchesKeyword('borderLeftWidth')(node),
  borderRightColor: isColor,
  borderRightStyle: matchesKeyword('borderRightStyle'),
  borderRightWidth: node =>
    isLength(node) || matchesKeyword('borderRigthWidth')(node),
  borderTopColor: isColor,
  borderTopStyle: matchesKeyword('borderTopStyle'),
  borderTopWidth: node =>
    isLength(node) || matchesKeyword('borderRightWidth')(node),
  columnCount: node => isInteger(node) || matchesKeyword('columnCount')(node),
  columnRuleColor: isColor,
  columnRuleStyle: matchesKeyword('columnRuleStyle'),
  columnRuleWidth: node =>
    isLength(node) || matchesKeyword('columnRuleWidth')(node),
  columnWidth: node => isLength(node) || matchesKeyword('columnWidth')(node),
  columnFill: matchesKeyword('columnFill'),
  columnSpan: matchesKeyword('columnSpan'),
  columnGap: node => isLength(node) || matchesKeyword('columnGap')(node),
  fontFamily: node =>
    isStringLiteral(node) ||
    isIdentifier(node) ||
    matchesKeyword('fontFamily')(node),
  fontSize: node => isLength(node) || matchesKeyword('fontSize')(node),
  fontStyle: matchesKeyword('fontStyle'),
  fontVariant: matchesKeyword('fontVariant'),
  fontVariantCaps: matchesKeyword('fontVariantCaps'),
  // TODO: isAngle
  glyphOrientationHorizontal: node =>
    isDimension(node) && node.unit.match(/rad|deg|turn|grad/) !== null,
  glyphOrientationVertical: node =>
    isDimension(node) && node.unit.match(/rad|deg|turn|grad/) !== null,
  // TODO: validate integer
  fontWeight: node => isInteger(node) || matchesKeyword('fontWeight')(node),
  fontLanguageOverwrite: node =>
    isStringLiteral(node) || matchesKeyword('fontLanguageOverwrite')(node),
  fontKerning: matchesKeyword('fontKerning'),
  fontSizeAdjust: node =>
    isFloat(node) || matchesKeyword('fontSizeAdjust')(node),
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
  fillOpacity: isOpacity,
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
  outlineStyle: matchesKeyword('outlineStyle'),
  outlineWidth: node => isLength(node) || matchesKeyword('outlineWidth')(node),
  outlineColor: node => isColor(node) || matchesKeyword('outlineColor')(node),
  outlineOffset: isLength,
  paddingLeft: isLength,
  paddingRight: isLength,
  paddingTop: isLength,
  paddingBottom: isLength,
  paddingBlockStart: isLength,
  paddingBlockEnd: isLength,
  paddingInlineStart: isLength,
  paddingInlineEnd: isLength,
  pauseBefore: node => isTime(node) || matchesKeyword('pauseBefore')(node),
  pauseAfter: node => isTime(node) || matchesKeyword('pauseAfter')(node),
  restBefore: node => isTime(node) || matchesKeyword('restBefore')(node),
  restAfter: node => isTime(node) || matchesKeyword('restAfter')(node),
  perspective: node => isLength(node) || matchesKeyword('perspective')(node),
  pointerEvents: matchesKeyword('pointerEvents'),
  position: matchesKeyword('position'),
  resize: matchesKeyword('resize'),
  rubyAlign: matchesKeyword('rubyAlign'),
  rubyMerge: matchesKeyword('rubyMerge'),
  rubyPosition: matchesKeyword('rubyPosition'),
  scrollBehavior: matchesKeyword('scrollBehavior'),
  scrollSnapType: matchesKeyword('scrollSnapType'),
  scrollSnapTypeX: matchesKeyword('scrollSnapTypeX'),
  scrollSnapTypeY: matchesKeyword('scrollSnapTypeY'),
  shapeImageThreshold: node => isFloat(node) || isInteger(node),
  shapeMargin: isLength,
  shapeRendering: matchesKeyword('shapeRendering'),
  speak: matchesKeyword('speak'),
  strokeDasharray: (node, isValueSet) => {
    if (isValueSet) {
      return validateNodeList(isSvgLength)(node)
    }

    return isSvgLength(node) || matchesKeyword('strokeDasharray')(node)
  },
  strokeDashoffset: isSvgLength,
  strokeLinecap: matchesKeyword('strokeLinecap'),
  strokeLinejoin: matchesKeyword('strokeLinejoin'),
  strokeMiterlimit: node =>
    (isInteger(node) && node.value >= 1) ||
    (isFloat(node) && node.integer >= 1),
  strokeOpacity: isOpacity,
  strokeWidth: isSvgLength,
  tabSize: node => isInteger(node) || isLength(node),
  tableLayout: matchesKeyword('tableLayout'),
  textAlign: matchesKeyword('textAlign'),
  textAlignLast: matchesKeyword('textAlignLast'),
  textAnchor: matchesKeyword('textAnchor'),

  marginLeft: node => isLength(node) || matchesKeyword('marginLeft')(node),
  marginRight: node => isLength(node) || matchesKeyword('marginRight')(node),
  marginTop: node => isLength(node) || matchesKeyword('marginTop')(node),
  marginBottom: node => isLength(node) || matchesKeyword('marginBottom')(node),
  marginBlockEnd: node =>
    isLength(node) || matchesKeyword('marginBlockEnd')(node),
  marginBlockStart: node =>
    isLength(node) || matchesKeyword('marginBlockStart')(node),
  marginInlineEnd: node =>
    isLength(node) || matchesKeyword('marginInlineEnd')(node),
  marginInlineStart: node =>
    isLength(node) || matchesKeyword('marginInlineStart')(node),
  marker: node => isURL(node) || matchesKeyword('marker')(node),
  markerEnd: node => isURL(node) || matchesKeyword('markerEnd')(node),
  markerMid: node => isURL(node) || matchesKeyword('markerMid')(node),
  markerStart: node => isURL(node) || matchesKeyword('markerStart')(node),
  markerOffset: node => isLength(node) || matchesKeyword('markerOffset')(node),
  maskClip: matchesKeyword('maskClip'),
  maskComposite: matchesKeyword('maskComposite'),
  maskMode: matchesKeyword('maskMode'),
  maskOrigin: matchesKeyword('maskOrigin'),
  maskType: matchesKeyword('maskType'),
  maxBlockSize: node => isLength(node) || matchesKeyword('maxBlockSize')(node),
  maxHeight: node => isLength(node) || matchesKeyword('maxHeight')(node),
  minHeight: node => isLength(node) || matchesKeyword('minHeight')(node),
  maxWidth: node => isLength(node) || matchesKeyword('maxWidth')(node),
  maxInlineSize: node =>
    isLength(node) || matchesKeyword('maxInlineSize')(node),
  minBlockSize: node => isLength(node) || matchesKeyword('minBlockSize')(node),
  minWidth: node => isLength(node) || matchesKeyword('minWidth')(node),
  minInlineSize: node =>
    isLength(node) || matchesKeyword('minInlineSize')(node),
  mixBlendMode: matchesKeyword('mixBlendMode'),
  objectFit: matchesKeyword('objectFit'),
  textDecorationColor: isColor,
  // textDecorationLine: matchesKeyword('textDecorationLine'),
  textDecorationStyle: matchesKeyword('textDecorationStyle'),
  boxDecorationBreak: matchesKeyword('boxDecorationBreak'),
  textEmphasisColor: isColor,
  textEmphasisPosition: (node, isValueSet) =>
    isValueSet &&
    node.length === 2 &&
    matchesIdentifier(['over', 'under'])(node[0]) &&
    matchesIdentifier(['left', 'right'])(node[1]),
  textJustify: matchesKeyword('textJustify'),
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
  color: isColor,
  zIndex: node => isInteger(node) || matchesKeyword('zIndex')(node),
  hyphens: matchesKeyword('hyphens'),
  imageRendering: matchesKeyword('imageRendering'),
  imeMode: matchesKeyword('imeMode'),
  initialLetterAlign: matchesKeyword('initialLetterAlign'),
  kerning: node => isSvgLength(node) || matchesKeyword('kerning')(node),
  letterSpacing: node =>
    isLength(node) || matchesKeyword('letterSpacing')(node),
  lineBreak: matchesKeyword('lineBreak'),
  listStyleImage: node => isURL(node) || matchesKeyword('listStyleImage')(node),
  listStypePosition: matchesKeyword('listStylePosition'),
  overflow: matchesKeyword('overflow'),
  overflowX: matchesKeyword('overflowX'),
  overflowClipBox: matchesKeyword('overflowClipBox'),
  overflowBreak: matchesKeyword('overflowBreak'),
  overflowY: matchesKeyword('overflowY'),
  textOrientation: matchesKeyword('textOrientation'),
  textOverflow: (node, isValueSet) => {
    if (isValueSet && node.length === 2) {
      return validateNodeList(
        node => isStringLiteral(node) || matchesKeyword('textOverflow')(node)
      )
    }

    return isStringLiteral(node) || matchesKeyword('textOverflow')(node)
  }
}
