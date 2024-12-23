import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Form } from "react-router-dom";
import { Form as StyledForm, Input, Tabs, Button } from "antd";
import Title from 'antd/es/typography/Title';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

export async function updateAccountAction({ request }) {
  debugger;
}

export async function changePasswordAction({ request }) {
  debugger;
}

export const Account = () => {
  const { loading, error, data } = useQuery(GET_USER, { variables: { id: localStorage.getItem('id') } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;

  const items = [
    {
      key: '1',
      label: 'Details',
      children: (
        <Form onSubmit={updateAccountAction}>
          <StyledForm.Item label="Name">
            <Input name="name" value={user.name} />
          </StyledForm.Item>
          <StyledForm.Item label="Email">
            <Input name="email" value={user.email} />
          </StyledForm.Item>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form>
      ),
    },
    {
      key: '2',
      label: 'Change Password',
      children: (
        <Form onSubmit={changePasswordAction}>
          <StyledForm.Item label="Current Password">
            <Input.Password name="currentPassword" />
          </StyledForm.Item>
          <StyledForm.Item label="New Password">
            <Input.Password name="newPassword" />
          </StyledForm.Item>
          <StyledForm.Item label="Password Confirmation">
            <Input.Password name="confirmationPassword" />
          </StyledForm.Item>
          <Button type="primary" htmlType="submit">Change Password</Button>
        </Form>
      )
    },
  ]
  
  return (
    <>
      <Title>Account</Title>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  )
};

export default Account;