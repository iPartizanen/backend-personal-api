export const updateCustomer = {
    type:       'object',
    properties: {
        name: {
            type:       'object',
            properties: {
                first: {
                    type:      'string',
                    minLength: 1,
                },
                last: {
                    type:      'string',
                    minLength: 1,
                },
            },
        },
        emails: {
            type:  'array',
            items: {
                type:       'object',
                properties: {
                    email: {
                        type:   'string',
                        format: 'email',
                    },
                    action: {
                        type: 'string',
                        enum: [ 'add', 'remove' ],
                    },
                },
            },
        },
        phones: {
            type:  'array',
            items: {
                type:       'object',
                properties: {
                    phone: {
                        type:    'string',
                        pattern: '^\\+380\\d{9}$',
                    },
                    action: {
                        type: 'string',
                        enum: [ 'add', 'remove' ],
                    },
                },
            },
        },
        city: {
            type:      'string',
            minLength: 1,
        },
        country: {
            type:      'string',
            minLength: 2,
        },
    },
    additionalProperties: false,
};
