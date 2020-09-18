import { gql, useQuery } from '@apollo/client';
import { IPagerInfo } from 'entries/IPagerInfo';
import { IPagerParams } from 'entries/IPagerParams';
import { IUser } from 'entries/IUser';

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

export const useUsersQuery = () => {
  const { loading, data, fetchMore } = useQuery<IUserResponse, IPagerParams>(GET_USERS_WITH_PAGES, {
    variables: {
      page: 1,
      perPage: 2,
    },
    notifyOnNetworkStatusChange: true,
    partialRefetch: true,
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });

  const getMoreUsers = () =>
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

  const reset = () => {
    fetchMore({
      variables: {
        page: 1,
      },
    });
  };

  return {
    data,
    loading,
    reset,
    getMoreUsers,
  };
};
