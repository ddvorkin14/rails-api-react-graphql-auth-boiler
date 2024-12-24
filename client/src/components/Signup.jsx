import React from "react";
import { Form, useNavigate, useActionData } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import Title from 'antd/es/typography/Title';
import { gql } from '@apollo/client';
import client from '../apolloClient';

const SIGNUP_MUTATION = gql`
  mutation signupUser($input: SignupUserInput!){
    signupUser(input: $input){
      token
      errors
      user{
        id
        email
        name
        role
      }
    }
  }
`;

export async function signupAction({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');

  try {
    const response = await client.mutate({
      mutation: SIGNUP_MUTATION,
      variables: {
        input: {
          email,
          password,
          name,
          passwordConfirmation: password
        },
      },
    });

    const { token, user } = response.data.signupUser;

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('uid', email);
      localStorage.setItem('id', user.id);
      localStorage.setItem('role', user.role);
      
      return { success: true };
    } else {
      return {
        success: false,
        error: response.errors || 'Signup failed',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'An error occurred during signup',
    };
  }
}

const Signup = () => {
  const navigate = useNavigate();
  const actionData = useActionData();

  React.useEffect(() => {
    if (actionData?.success) {
      navigate('/dashboard');
    } else if (actionData?.error) {
      message.error(actionData.error);
    }
  }, [actionData, navigate]);

  return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Title>Sign Up</Title>
        <Form method="post">
          <div style={{ marginBottom: '1rem' }}>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="mb-2"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Input
              name="name"
              placeholder="Full Name"
              required
              className="mb-2"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Input.Password
              name="password"
              placeholder="Password"
              required
              className="mb-2"
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;