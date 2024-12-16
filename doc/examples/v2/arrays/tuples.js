const id = 'tuples'

const title = 'Tuples'

const description = `Arrays can be defined with multiple item schemas instead of just one. In this case the array has a fixed size and each item is rendered as a property.

This pattern is suitable for lat/lon pairs for example.

Note that to make items of the tuples required you can use the minItems attribute. If an item is filled all previous items are automatically required.`

const schema = {
  type: 'object',
  properties: {
    numberTupleProp: {
      type: 'array',
      title: 'I\'m a tuple of 2 numbers',
      items: [
        { type: 'number', title: 'I\'m a number', default: 0 },
        { type: 'number', title: 'I\'m another number', default: 0 },
      ],
    },
    stringTupleProp: {
      type: 'array',
      title: 'I\'m a tuple of 2 strings, first one is required',
      minItems: 1,
      items: [
        { type: 'string', title: 'I\'m a required string' },
        { type: 'string', title: 'I\'m a string' },
      ],
    },
  },
}

const model = {}

export default { id, title, description, schema, model }
