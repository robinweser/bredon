# Changelog

> Dates are in `yyyy/mm/dd` format.

### 2017/11/10
| Package | Version | Changes |
| ------- | ------- | ------- |
| bredon | 3.0.0 | renamed `CSSValue` and `MultiValue` to `Value` and `ValueList`<br>removed `Keyword`<br>`Dimension` now takes an `Integer` or a `Float` as value<br>added `negative` flags to both `Integer` and `Float`<br>removed `Important`, but added an `important` flag to `Value` |
| bredon-types | 3.0.0 | updated validators and builders according the bredon changes |
| bredon-validate | 0.0.1 | Initial experimental version |

### 2.0.0
* complete parser rewrite
* better error messages
* fixed many bugs
* introducing `bredon-types` and `bredon-tools`

### 1.0.1
* Whitespace inside `String` nodes are preserved

### 1.0.0
Initial version
