export const createCustomer = {
    type:       'object',
    properties: {
        name: {
            type:      'string',
            minLength: 3,
        },
        email: {
            type:   'string',
            format: 'email',
        },
        phone: {
            type:      'string',
            minLength: 7,
        },
        city: {
            type:      'string',
            minLength: 1,
        },
        country: {
            type:      'string',
            minLength: 2,
        },
        password: {
            type:      'string',
            minLength: 8,
        },
    },
    required:             [ 'name', 'email' ],
    additionalProperties: false,
};
