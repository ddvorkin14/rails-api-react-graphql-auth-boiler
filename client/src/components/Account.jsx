import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Form } from "react-router-dom";
import { Form as StyledForm, Input } from "antd";
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

}

export const Account = () => {
  const { loading, error, data } = useQuery(GET_USER, { variables: { id: localStorage.getItem('id') } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;
  
  return (
    <>
      <Title>Account</Title>

      <Form>
        <StyledForm.Item label="Name">
          <Input name="name" value={user.name} />
        </StyledForm.Item>
        <StyledForm.Item label="Email">
          <Input name="email" value={user.email} />
        </StyledForm.Item>
      </Form>
    </>
  )
};

export default Account;