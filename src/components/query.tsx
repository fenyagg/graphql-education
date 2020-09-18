import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useUsersQuery } from 'components/useUsersQuery';
import { IUser } from 'entries/IUser';
import React, { FC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export const Query: FC = () => {
  const { data, getMoreUsers, loading, reset } = useUsersQuery();

  const users: IUser[] = data?.Page.users ?? [];
  return (
    <>
      <ButtonGroup>
        <Button onClick={getMoreUsers} disabled={loading}>
          Get more
        </Button>
        <Button onClick={reset} disabled={loading}>
          Reset
        </Button>
      </ButtonGroup>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant={'head'}>id</TableCell>
              <TableCell variant={'head'}>name</TableCell>
              <TableCell variant={'head'}>avatar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell variant="body">{user.id}</TableCell>
                <TableCell variant="body">{user.name}</TableCell>
                <TableCell variant="body">
                  <Avatar src={user.avatar.medium} alt="" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
