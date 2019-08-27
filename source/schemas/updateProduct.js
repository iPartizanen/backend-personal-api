export const updateProduct = {
    type:       'object',
    properties: {
        title: {
            type:      'string',
            minLength: 3,
        },
        description: {
            type:      'string',
            minLength: 5,
        },
        price: {
            type:    'number',
            minimum: 0,
        },
        discount: {
            type:    'number',
            minimum: 0,
            maximum: 50,
        },
        total: {
            type: 'number',
        },
    },
    additionalProperties: false,
};
