import React from 'react';
import { useNavigate } from 'react-router-dom'; // Remove Form, useActionData
import { Button, Input, message, Form, notification } from 'antd'; // Import Form from antd instead
import Title from 'antd/es/typography/Title';
import { gql, useMutation } from '@apollo/client'; // Add useMutation
import { set } from 'mongoose';

const LOGIN_MUTATION = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
      client
      user {
        id
        email
      }
      errors
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Use Ant Design's form

  const [successMsg, setSuccessMsg] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [infoMsg, setInfoMsg] = React.useState(null);

  React.useEffect(() => {
    if (infoMsg) {
      notification.info({
        message: "Warning",
        description: infoMsg,
        placement: "topRight",
      });
      setInfoMsg(null); // Reset after showing notification
    }

    if (successMsg) {
      notification.success({
        message: "Success",
        description: successMsg,
        placement: "topRight",
      });
      setSuccessMsg(null); // Reset after showing notification
    }

    if (errorMsg) {
      notification.error({
        message: "Error",
        description: errorMsg,
        placement: "topRight",
      });
      setErrorMsg(null); // Reset after showing notification
    }
  }, [successMsg, errorMsg, infoMsg]);

  // Use Apollo's useMutation hook
  const [loginUser] = useMutation(LOGIN_MUTATION);

  const onFinish = async (values) => {
    try {
      const { data } = await loginUser({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });
      
      const { token, user, client, errors } = data.loginUser;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('client', client);
        localStorage.setItem('id', user.id);
        if (data.loginUser.client) {
          localStorage.setItem('client', data.loginUser.client);
        }
        setSuccessMsg("Login successful");
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        setErrorMsg(errors?.join(", "));
      }
    } catch (error) {
      setInfoMsg('An error occurred during login: ', error.message);
    }
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Title className="text-center">Login</Title>
        <Form 
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              placeholder="Email"
              type="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' }
            ]}
          >
            <Input.Password 
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;