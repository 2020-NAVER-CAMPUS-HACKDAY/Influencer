export default {
  '/api/products': {
    get: {
      tags: ['Product'],
      description: 'Get products',
      operationId: 'getProducts',
      parameters: [
        {
          name: 'page',
          in: 'query',
          schema: {
            type: 'integer',
            default: 1,
          },
          required: false,
        },
        {
          name: 'limit',
          in: 'query',
          schema: {
            type: 'integer',
            default: 10,
          },
          required: false,
        },
      ],
      responses: {
        '200': {
          description: 'Products were obtained',
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
      tags: ['Product'],
      description: 'Create users',
      operationId: 'createUsers',
      parameters: [
        {
          name: 'name',
          in: 'body',
          schema: {
            type: 'string',
            default: 'MacBook',
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
  '/api/products/category/{id}': {
    get: {
      tags: ['Product'],
      description: 'Get products By Category',
      operationId: 'getProductsByCategory',
      parameters: [
        {
          name: 'id',
          in: 'path',
          schema: {
            type: 'integer',
          },
          description: `category's id`,
        },
        {
          name: 'limit',
          in: 'query',
          schema: {
            type: 'integer',
            default: 10,
          },
          required: false,
        },
      ],
      responses: {
        '200': {
          description: 'Product was obtained',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
      },
    },
  },
  '/api/products/{id}': {
    get: {
      tags: ['Product'],
      description: 'Get product',
      operationId: 'getProduct',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: `product's id`,
        },
      ],
      responses: {
        '200': {
          description: 'Product was obtained',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
      },
    },
  },
};
