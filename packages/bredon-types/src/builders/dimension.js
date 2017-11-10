/* @flow */
import type {
  DimensionNode,
  FloatNode,
  IntegerNode,
} from '../../../../flowtypes/AST'

type Unit =
  | '%'
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | 'cm'
  | 'mm'
  | 'q'
  | 'in'
  | 'pt'
  | 'pc'
  | 'px'
  | 'deg'
  | 'grad'
  | 'rad'
  | 'turn'
  | 's'
  | 'ms'
  | 'Hz'
  | 'kHz'
  | 'dpi'
  | 'dpcm'
  | 'dppx'

export default function dimension(
  value: FloatNode | IntegerNode,
  unit: Unit
): DimensionNode {
  return {
    type: 'Dimension',
    value,
    unit,
  }
}
