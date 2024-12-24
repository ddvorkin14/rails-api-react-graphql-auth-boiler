import React from "react";
import { Select, Table } from "antd";
import { gql, useQuery } from "@apollo/client";

const USERS_QUERY = gql`
  query getUsers{
    users {
      id
      name
      email
      role
    }
  }
`;

const Users = () => {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onChange = (value, id) => {
    console.log(`selected ${value} with id ${id}`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      onFilter: (value, record) => record.role.indexOf(value) === 0,
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortDirections: ['descend', 'ascend'],
      render: (role, record) => (
        <Select defaultValue={role} style={{ width: '100%' }} onChange={(value) => onChange(value, record.key)}>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="moderator">Moderator</Select.Option>
          <Select.Option value="viewer">Viewer</Select.Option>
        </Select>
      )
    },
  ];

  

  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  const dataSource = data.users.map(user => ({
    key: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return (
    <Table 
      columns={columns} 
      dataSource={dataSource} 
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
    />
  );
}

export default Users;