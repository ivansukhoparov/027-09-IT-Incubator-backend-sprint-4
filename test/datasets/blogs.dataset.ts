export class ViewModelResponse {
  static emptyBody = {
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    items: [],
  };
}

function errorsResponse(fields: string[]) {
  const response: { errorsMessages: Object[] } = { errorsMessages: [] };
  fields.forEach((f) => {
    response.errorsMessages.push({ message: 'Invalid value', field: f });
  });
  return response;
}

function createOverLength(number: number) {
  let string = '';
  for (let i = 0; i < number; i++) {
    string += 'o';
  }
  return string;
}

export const blogsDataset = {
  valid: {
    createModel: {
      name: 'Blog',
      description: 'some valid description',
      websiteUrl: 'http://www.validurl.com',
    },
    responseModel: {
      id: expect.any(String),
      name: 'Blog',
      description: 'some valid description',
      websiteUrl: 'http://www.validurl.com',
      createdAt: expect.any(String),
      isMembership: false,
    },
    responseCode: 201,
  },
  invalid: {
    empty: {
      createModel: {
        name: '',
        description: '',
        websiteUrl: '',
      },
      responseModel: errorsResponse(['name', 'description', 'websiteUrl']),
      responseCode: 400,
    },
    overlength: {
      createModel: {
        name: createOverLength(16),
        description: createOverLength(501),
        websiteUrl: 'http://www.' + createOverLength(100) + '.com',
      },
      responseModel: errorsResponse(['name', 'description', 'websiteUrl']),
      responseCode: 400,
    },
    websiteUrlPattern: {
      createModel: {
        name: 'Blog',
        description: 'some valid description',
        websiteUrl: 'foo_web_site',
      },
      responseModel: errorsResponse(['websiteUrl']),
      responseCode: 400,
    },
    spaces: {
      createModel: {
        name: '          ',
        description: '          ',
        websiteUrl: '          ',
      },
      responseModel: errorsResponse(['name', 'description', 'websiteUrl']),
      responseCode: 400,
    },
    name: {
      createModel: {
        name: '',
        description: 'some valid description',
        websiteUrl: 'http://www.validurl.com',
      },
      responseModel: errorsResponse(['name']),
      responseCode: 400,
    },
    nameAndDescription: {
      createModel: {
        name: '',
        description: '',
        websiteUrl: 'http://www.validurl.com',
      },
      responseModel: errorsResponse(['name', 'description']),
      responseCode: 400,
    },
  },
};
