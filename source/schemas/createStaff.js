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
            type:    'string',
            pattern: '^\\+380\\d{9}$',
        },
        role: {
            type:      'string',
            minLength: 1,
        },
        password: {
            type:    'string',
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
        },
    },
    required:             [ 'name', 'email', 'role' ],
    additionalProperties: false,
};
