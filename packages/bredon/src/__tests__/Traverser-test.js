import Traverser from '../Traverser'

describe('Traversing CSS values', () => {
  it('should correctly traverse ast nodes', () => {
    const visitor = {
      Identifier(node) {
        if (node.value === 'flex-start') {
          node.value = 'flex-end'
        }
      }
    }

    const traverser = new Traverser([visitor])

    expect(
      traverser.traverse({
        body: [
          {
            type: 'Identifier',
            value: 'flex-start'
          }
        ],
        important: false,
        type: 'CSSValue'
      })
    ).toEqual({
      body: [
        {
          type: 'Identifier',
          value: 'flex-end'
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly merge visitors from left to right', () => {
    const visitor = {
      Identifier(node) {
        if (node.value === 'flex-start') {
          node.value = 'flex-end'
        }
      }
    }

    const visitor2 = {
      Identifier(node) {
        if (node.value === 'flex-end') {
          node.value += '-test'
        }
      }
    }

    const traverser = new Traverser([visitor, visitor2])

    expect(
      traverser.traverse({
        body: [
          {
            type: 'Identifier',
            value: 'flex-start'
          }
        ],
        important: false,
        type: 'CSSValue'
      })
    ).toEqual({
      body: [
        {
          type: 'Identifier',
          value: 'flex-end-test'
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly enter and exit nodes', () => {
    const visitor = {
      Identifier: {
        enter(node) {
          node.value = 'entered'
        },
        exit(node) {
          node.value += ':exited'
        }
      }
    }

    const traverser = new Traverser([visitor])

    expect(
      traverser.traverse({
        body: [
          {
            type: 'Identifier',
            value: ''
          }
        ],
        important: false,
        type: 'CSSValue'
      })
    ).toEqual({
      body: [
        {
          type: 'Identifier',
          value: 'entered:exited'
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })
})
