import Parser from '../Parser'

describe('Parsing CSS values', () => {
  it('should correctly parse identifiers', () => {
    const parser = new Parser()

    expect(['flex-start', parser.parse('flex-start')]).toMatchSnapshot()
  })

  it('should correctly parse integers', () => {
    const parser = new Parser()

    expect(['400', parser.parse('400')]).toMatchSnapshot()
  })

  it('should correctly parse !important', () => {
    const parser = new Parser()

    expect(['!important', parser.parse('!important')]).toMatchSnapshot()
  })

  it('should correctly parse algebraic signs', () => {
    const parser = new Parser()

    expect(['-400', parser.parse('-400')]).toMatchSnapshot()
  })

  it('should correctly parse parentheses', () => {
    const parser = new Parser()

    expect(['(', parser.parse('(')]).toMatchSnapshot()
  })

  it('should correctly parse HexColors', () => {
    const parser = new Parser()

    expect(['#66FF66', parser.parse('#66FF66')]).toMatchSnapshot()
  })

  it('should correctly parse strings', () => {
    const parser = new Parser()

    expect([
      '"hello, it\'s me."',
      parser.parse('"hello, it\'s me."'),
    ]).toMatchSnapshot()
  })

  it('should correctly parse dimensions', () => {
    const parser = new Parser()

    expect(['300px', parser.parse('300px')]).toMatchSnapshot()
  })

  it('should correctly parse floats', () => {
    const parser = new Parser()

    expect(['200.55', parser.parse('200.55')]).toMatchSnapshot()

    expect(['-.55', parser.parse('-.55')]).toMatchSnapshot()
  })

  it('should correctly parse function expressions', () => {
    const parser = new Parser()

    expect(['rgba(200,300)', parser.parse('rgba(200,300)')]).toMatchSnapshot()
  })

  it('should correctly parse URLs', () => {
    const parser = new Parser()

    expect([
      'url(https://www.google.de/request#something?param=true&foo=bar%20)',
      parser.parse(
        'url(https://www.google.de/request#something?param=true&foo=bar%20)'
      ),
    ]).toMatchSnapshot()
  })

  it('should correctly parse expressions', () => {
    const parser = new Parser()

    expect(['calc(100%+5/2)', parser.parse('calc(100%+5/2)')]).toMatchSnapshot()
  })

  it('should correctly skip whitespaces', () => {
    const parser = new Parser()

    expect(['300 400   700', parser.parse('300 400   700')]).toMatchSnapshot()

    expect([
      ' 1px   inherit rgba( 255  , 94 ,  0.34 ) , 300ms all linear ',
      parser.parse(
        ' 1px   inherit rgba( 255  , 94 ,  0.34 ) , 300ms all linear '
      ),
    ]).toMatchSnapshot()
  })

  // complex test
  it('should return a correct AST', () => {
    const parser = new Parser()

    expect([
      '1px inherit rgba(255, 94, 0.34), 300ms all linear',
      parser.parse('1px inherit rgba(255, 94, 0.34), 300ms all linear'),
    ]).toMatchSnapshot()
  })
})
