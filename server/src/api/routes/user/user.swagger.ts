export default {
  '/api/click/:wholeCategoryId': {
    get: {
      tags: ['User'],
      description: 'Set click log',
      operationId: 'getProduct',
      parameters: [
        {
          name: 'wholeCategoryId',
          in: 'params',
          description: `Whole Category Id`,
        },
      ],
      responses: {
        '200': {
          description: 'Reflect user click log',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    },
  },
  '/api/users/like': {
    get: {
      tags: ['User'],
      description: 'Get user liek list',
      operationId: 'getProducts',
      parameters: [
        {
          name: 'page',
          in: 'query',
          schema: {
            type: 'string',
            default: 1,
          },
          required: false,
        },
      ],
      responses: {
        '200': {
          description: 'User like list',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Products',
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['User'],
      description: 'Create add like item',
      operationId: 'createUsers',
      parameters: [
        {
          name: 'productNo',
          in: 'body',
          schema: {
            type: 'string',
          },
          required: true,
        },
        {
          name: 'wholeCategoryId',
          in: 'body',
          schema: {
            type: 'string',
          },
          required: true,
        },
        {
          name: 'exist',
          in: 'body',
          schema: {
            type: 'boolean',
          },
          required: true,
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
        required: true,
      },
      responses: {
        '200': {
          description: 'New Product was created',
        },
      },
    },
  },
};
