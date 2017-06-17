/* @flow */
import type { DimensionNode } from '../../../../flowtypes/AST'

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

const dimensionMap = {
  'absolute-length': ['cm', 'mm', 'q', 'in', 'pt', 'pc', 'px'],
  'font-length': ['em', 'ex', 'ch', 'rem'],
  'viewport-length': ['vw', 'vh', 'vmin', 'vmax'],
  percentage: ['%'],
  angle: ['deg', 'grad', 'rad', 'turn'],
  duration: ['ms', 's'],
  frequency: ['kHz', 'Hz'],
  resolution: ['dpi', 'dpcm', 'dppx']
}

const dimensions = Object.keys(dimensionMap)

export default function dimension(value: number, unit: Unit): DimensionNode {
  const dimension = dimensions.find(
    dim => dimensionMap[dim].indexOf(unit) !== -1
  )

  return {
    type: 'Dimension',
    value,
    unit,
    dimension
  }
}
