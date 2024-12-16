const id = 'validation-basic'

const title = 'Basic validation'

const description = `Some JSON schema syntax elements are translated as validation rules: required, length, pattern, etc.

You can also use the \`x-rules\` annotation to set custom rules indirectly as strings referencing functions in the \`rules\` option.

If you wrap the \`vjsf\` element in a \`v-form\` the validation mechanisms will work.

Click on the button at bottom-right of the example to trigger validation.

Initial display of validation errors is conditioned by the \`initialValidation\` option. By default the errors of properties with already filled values are displayed while pristine properties wait for user interactions or explicit call of \`validate()\`.`

const schema = {
  type: 'object',
  required: ['requiredStringProp'],
  properties: {
    requiredStringProp: { type: 'string', title: 'I\'m a required string' },
    patternStringProp: { 'type': 'string', 'title': 'I\'m a string with a pattern (letters only)', 'pattern': '^[a-zA-Z]*$', 'examples': ['valid', 'not-valid'], 'x-options': { messages: { pattern: 'Only letters are accepted' } } },
    ruleStringProp: { 'type': 'number', 'title': 'I\'m a number with a custom rule (even numbers only)', 'x-rules': ['even'] },
    limitedInteger: { type: 'integer', title: 'I\'m a integer with min/max value and bad initial value', minimum: 0, maximum: 100 },
    limitedString: { type: 'string', title: 'I\'m a string with min/max length and bad initial value', minLength: 10, maxLength: 100 },
    limitedArray: { type: 'array', title: 'I\'m an array with min/max items', items: { type: 'string' }, minItems: 1, maxItems: 100 },
    patternStringArray: { type: 'array', title: 'I\'m an array whose items have a pattern', items: { 'type': 'string', 'pattern': '^[a-zA-Z]*$', 'x-options': { messages: { pattern: 'Only letters are accepted' } } } },
    limitedObjectsArray: { type: 'array', title: 'I\'m an array of objects with min/max items', items: { type: 'object', properties: { stringProp: { type: 'string' } } }, minItems: 2, maxItems: 100 },
  },
}

const model = {
  limitedInteger: 101,
  limitedString: 'abc',
}

const options = {
  rules: {
    even: val => (!val || val % 2 === 0 || 'Only even numbers accepted'),
  },
}

export default { id, title, description, schema, model, options }
