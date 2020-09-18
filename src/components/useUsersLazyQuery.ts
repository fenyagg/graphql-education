import { gql, useLazyQuery } from '@apollo/client';
import { IPagerInfo } from 'entries/IPagerInfo';
import { IPagerParams } from 'entries/IPagerParams';
import { IUser } from 'entries/IUser';
import { useEffect } from 'react';

interface IUserResponse {
  Page: {
    pageInfo: IPagerInfo;
    users: IUser[];
  };
}

const GET_USERS_WITH_PAGES = gql`
  query($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        perPage
        total
      }
      users {
        id
        name
        avatar {
          large
          medium
        }
      }
    }
  }
`;

export const useUsersLazyQuery = () => {
  const [loadUsers, { loading, data, fetchMore }] = useLazyQuery<IUserResponse, IPagerParams>(
    GET_USERS_WITH_PAGES,
    {
      variables: {
        page: 1,
        perPage: 2,
      },
      notifyOnNetworkStatusChange: true,
      partialRefetch: true,
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const getMoreUsers = () => {
    if (fetchMore) {
      fetchMore({
        variables: {
          page: (data?.Page.pageInfo.currentPage ?? 1) + 1,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            Page: {
              ...fetchMoreResult.Page,
              users: [...prev.Page.users, ...fetchMoreResult.Page.users],
            },
          };
        },
      });
    }
  };

  const reset = () => loadUsers();

  return {
    data,
    loading,
    reset,
    getMoreUsers,
  };
};
