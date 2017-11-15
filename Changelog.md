# Changelog

> Dates are in `dd/mm/yy` format.

### 15/10/17
| Package | Version | Changes |
| ------- | ------- | ------- |
| bredon | 4.0.0 | added support for assignments, IE hacks, nested callees<br>using decimal numbers for the Float's `fractional` part<br>traverse AST one-by-one instead of one combined visitors<br>visitors can be functions that receive the bredon API<br>added bredon-types as a direct export to the bredon API<br>visitors now take a single `path` parameter |
| bredon-types | 3.0.1 | added `assignment` and `isAssignment` |
| bredon-tools | 4.0.0 | reduced APIs |
| bredon-plugin-color<br>bredon-plugin-case<br>bredon-plugin-color<br>bredon-plugin-initial<br>bredon-plugin-precision<br>bredon-plugin-trim-hex<br>bredon-plugin-unit | 1.0.0 | initial release |
| bredon-validate | 0.0.3 | Updated some property validators |
| postcss-bredon-validate | 0.0.2 | updated bredon-validate to 0.0.3 |
| bredon-minify | 1.0.0 | initial release |
| postcss-bredon-minify | 1.0.0 | initial release |

### 10/10/17
| Package | Version | Changes |
| ------- | ------- | ------- |
| bredon | 3.0.1 | renamed `CSSValue` and `MultiValue` to `Value` and `ValueList`<br>removed `Keyword`<br>`Dimension` now takes an `Integer` or a `Float` as value<br>added `negative` flags to both `Integer` and `Float`<br>removed `Important`, but added an `important` flag to `Value` |
| bredon-types | 3.0.0 | updated validators and builders according the bredon changes |
| bredon-validate | 0.0.2 | Initial experimental version |

### 2.0.0
* complete parser rewrite
* better error messages
* fixed many bugs
* introducing `bredon-types` and `bredon-tools`

### 1.0.1
* Whitespace inside `String` nodes are preserved

### 1.0.0
Initial version
