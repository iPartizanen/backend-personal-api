export const createStaff = {
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
        role: {
            type:      'string',
            minLength: 1,
        },
        password: {
            type:      'string',
            minLength: 8,
        },
    },
    required:             [ 'name', 'email', 'role' ],
    additionalProperties: false,
};
