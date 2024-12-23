import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from '@apollo/client';
import { Form, Input, Tabs, Button, notification } from "antd";
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

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        name
        email
      }
      errors
    }
  }
`;

const UPDATE_PASSWORD = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        name
        email
      }
      errors
    }
  }
`;

export const Account = () => {
  const { loading, error, data } = useQuery(GET_USER, { variables: { id: localStorage.getItem('id') } });
  const [updateUser] = useMutation(UPDATE_USER);
  const [updatePassword] = useMutation(UPDATE_PASSWORD);

  const [accountForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    if (notificationMessage) {
      notification.info({
        message: "Notification",
        description: notificationMessage,
        placement: "topRight",
      });
      setNotificationMessage(null); // Reset after showing notification
    }
  }, [notificationMessage]);

  const changePasswordAction = async (values) => {  
    try {
      const { data } = await updatePassword({
        variables: {
          input: {
            id: localStorage.getItem('id'),
            old_password: values.currentPassword,
            password: values.newPassword,
            password_confirmation: values.confirmationPassword
          },
        },
      });
      const { user, errors } = data.updateUser;
      if (user) {
        setNotificationMessage("Password updated successfully");
      } else {
        setNotificationMessage("Account update failed: " + errors.join(", "));
      }
    } catch(error){
      console.log("error: ", error);
    }
  };

  const updateAccountAction = async (values) => {
    try {
      const { data } = await updateUser({
        variables: {
          input: {
            id: localStorage.getItem('id'),
            name: values.name,
            email: values.email,
          },
        },
      });
      const { user, errors } = data.updateUser;
      if (user) {
        setNotificationMessage("Account updated successfully");
      } else {
        setNotificationMessage("Account update failed: " + errors.join(", "));
      }
    } catch(error){
      console.log("error: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;

  const items = [
    {
      key: '1',
      label: 'Details',
      children: (
        <Form 
          form={accountForm} 
          onFinish={updateAccountAction} 
          initialValues={{
            name: user.name,
            email: user.email,
          }}
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form>
      ),
    },
    {
      key: '2',
      label: 'Change Password',
      children: (
        <Form form={passwordForm} onFinish={changePasswordAction}>
          <Form.Item name="currentPassword" label="Current Password">
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword" label="New Password">
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmationPassword" label="Password Confirmation">
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit">Change Password</Button>
        </Form>
      )
    },
  ];
  
  return (
    <>
      <Title>Account</Title>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default Account;