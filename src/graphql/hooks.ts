import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GraphQLError } from 'graphql';

export const useCustomQuery = <ResultType, VariablesType = unknown>(
  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
  query: any,
  queryOptions: Record<string, any>,
  onSuccess: (data: ResultType) => void,
  onError: (errors: readonly GraphQLError[]) => void = () => {}
  /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
) => {
  const queryResponse = useQuery<ResultType, VariablesType>(query, queryOptions);

  useEffect(() => {
    if (queryResponse.data) {
      onSuccess(queryResponse.data);
    }
    // eslint-disable-next-line
  }, [queryResponse.data]);

  useEffect(() => {
    if (queryResponse.error) {
      onError(queryResponse.error.graphQLErrors);
    }
    // eslint-disable-next-line
  }, [queryResponse.error]);

  return {
    loading: queryResponse.loading,
    refetch: queryResponse.refetch,
  };
};
