export const updateOrder = {
    type:       'object',
    properties: {
        uid: {
            type:    'string',
            pattern: '^[a-f\\d]{24}$',
        },
        pid: {
            type:    'string',
            pattern: '^[a-f\\d]{24}$',
        },
        count: {
            type:    'number',
            minimum: 1,
        },
        comment: {
            type:      'string',
            minLength: 3,
        },
    },
    additionalProperties: false,
};
