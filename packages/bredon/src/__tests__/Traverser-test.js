import Traverser from '../Traverser'

describe('Traversing CSS values', () => {
  it('should correctly traverse ast nodes', () => {
    const visitor = ({ types }) => ({
      Identifier(path) {
        if (path.node.value === 'flex-start') {
          path.replaceNode(types.identifier('flex-end'))
        }
      },
    })

    const traverser = new Traverser([visitor])

    expect(
      traverser.traverse({
        body: [
          {
            type: 'Identifier',
            value: 'flex-start',
          },
        ],
        important: false,
        type: 'Value',
      })
    ).toEqual({
      body: [
        {
          type: 'Identifier',
          value: 'flex-end',
        },
      ],
      important: false,
      type: 'Value',
    })
  })

  it('should correctly remove a value', () => {
    const visitor = {
      Identifier(path) {
        if (path.node.value === 'flex-start') {
          path.removeNode()
        }
      },
    }

    const traverser = new Traverser([visitor])

    expect(
      traverser.traverse({
        body: [
          {
            type: 'Identifier',
            value: 'flex-start',
          },
          {
            type: 'Identifier',
            value: 'flex-end',
          },
        ],
        important: false,
        type: 'Value',
      })
    ).toEqual({
      body: [
        {
          type: 'Identifier',
          value: 'flex-end',
        },
      ],
      important: false,
      type: 'Value',
    })
  })

  it('should correctly merge visitors from left to right', () => {
    const visitor = ({ types }) => ({
      Identifier(path) {
        if (path.node.value === 'flex-start') {
          path.replaceNode(types.identifier('flex-end'))
        }
      },
    })

    const visitor2 = {
      Identifier(path) {
        if (path.node.value === 'flex-end') {
          path.node.value += '-test'
        }
      },
    }

    const traverser = new Traverser([visitor, visitor2])

    expect(
      traverser.traverse({
        body: [
          {
            type: 'Identifier',
            value: 'flex-start',
          },
        ],
        important: false,
        type: 'Value',
      })
    ).toEqual({
      body: [
        {
          type: 'Identifier',
          value: 'flex-end-test',
        },
      ],
      important: false,
      type: 'Value',
    })
  })

  it('should correctly traverse nested nodes', () => {
    const visitor = {
      FunctionExpression(path) {
        if (path.node.callee === 'foo') {
          path.node.callee = 'buz'

          path.traverse({
            Identifier(innerPath) {
              if (innerPath.node.value === 'bar') {
                innerPath.node.value = 'baz'
              }
            },
          })
        }
      },
    }

    const traverser = new Traverser([visitor])

    expect(
      traverser.traverse({
        type: 'Value',
        body: [
          {
            type: 'FunctionExpression',
            callee: 'foo',
            params: [
              {
                type: 'Identifier',
                value: 'bar',
              },
              {
                type: 'Identifier',
                value: 'baz',
              },
            ],
          },
          {
            type: 'Identifier',
            value: 'bar',
          },
        ],
      })
    ).toEqual({
      type: 'Value',
      body: [
        {
          type: 'FunctionExpression',
          callee: 'buz',
          params: [
            {
              type: 'Identifier',
              value: 'baz',
            },
            {
              type: 'Identifier',
              value: 'baz',
            },
          ],
        },
        {
          type: 'Identifier',
          value: 'bar',
        },
      ],
    })
  })

  it('should correctly enter and exit nodes', () => {
    const visitor = {
      Identifier: {
        enter(path) {
          path.node.value = 'entered'
        },
        exit(path) {
          path.node.value += ':exited'
        },
      },
    }

    const traverser = new Traverser([visitor])

    expect(
      traverser.traverse({
        body: [
          {
            type: 'Identifier',
            value: '',
          },
        ],
        important: false,
        type: 'Value',
      })
    ).toEqual({
      body: [
        {
          type: 'Identifier',
          value: 'entered:exited',
        },
      ],
      important: false,
      type: 'Value',
    })
  })
})
