import productPath from './routes/product/product.swagger';
import userPath from './routes/user/user.swagger';

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Influencer API Docs',
    description: '2020 Hackday Fighting 🔥🔥',
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/',
      description: 'Local server',
    },
    {
      url: 'http://101.101.160.205:1024',
      description: 'Influencer001',
    },
    {
      url: 'http://101.101.160.205:1025',
      description: 'Influencer002',
    },
    {
      url: 'http://101.101.160.205:1026',
      description: 'Influencer003',
    },
    {
      url: 'http://101.101.160.205:1027',
      description: 'Influencer004',
    },
    {
      url: 'http://101.101.160.205:1028',
      description: 'Influencer005',
    },
    {
      url: 'http://101.101.160.205:1029',
      description: 'Influencer006',
    },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  paths: {
    ...productPath, ...userPath
  },
  components: {
    schemas: {
      name: {
        type: 'string',
        example: 'MacBook Pro',
      },
      Product: {
        type: 'object',
        properties: {
          name: {
            $ref: '#/components/schemas/name',
          },
        },
      },
      Products: {
        type: 'object',
        properties: {
          products: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },

      // 참고용 다른 예시
      //   identificationNumber: {
      //     type: 'integer',
      //     description: 'User identification number',
      //     example: 1234,
      //   },
      //   username: {
      //     type: 'string',
      //     example: 'raparicio',
      //   },
      //   userType: {
      //     type: 'string',
      //     enum: 'USER_TYPES',
      //     default: 'asd',
      //   },
      //   companyId: {
      //     type: 'integer',
      //     description: 'Company id where the user works',
      //     example: 15,
      //   },
      //   User: {
      //     type: 'object',
      //     properties: {
      //       identificationNumber: {
      //         $ref: '#/components/schemas/identificationNumber',
      //       },
      //       username: {
      //         $ref: '#/components/schemas/username',
      //       },
      //       userType: {
      //         $ref: '#/components/schemas/userType',
      //       },
      //       companyId: {
      //         $ref: '#/components/schemas/companyId',
      //       },
      //     },
      //   },
      //   Users: {
      //     type: 'object',
      //     properties: {
      //       users: {
      //         type: 'array',
      //         items: {
      //           $ref: '#/components/schemas/User',
      //         },
      //       },
      //     },
      //   },
      //   Error: {
      //     type: 'object',
      //     properties: {
      //       message: {
      //         type: 'string',
      //       },
      //       internal_code: {
      //         type: 'string',
      //       },
      //     },
      //   },
      // },
      // securitySchemes: {
      //   ApiKeyAuth: {
      //     type: 'apiKey',
      //     in: 'header',
      //     name: 'x-api-key',
      //   },
    },
  },
};
