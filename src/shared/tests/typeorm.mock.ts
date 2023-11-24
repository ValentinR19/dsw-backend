import { SelectQueryBuilder } from 'typeorm';

export interface QueryBuilderResponses {
  getOneResponse?: unknown;
  rejectExecute?: boolean;
}

export function mockQueryBuilder(responses?: QueryBuilderResponses): Partial<SelectQueryBuilder<unknown>> {
  const queryBuilder = {
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getOneOrFail: responses?.rejectExecute ? jest.fn().mockRejectedValueOnce(new Error('Test error')) : jest.fn().mockResolvedValue(responses?.getOneResponse),
  };

  return queryBuilder;
}
