import { postAuthRegister } from '@/services/core/user';
import { auth } from '@/store/auth';
import { FormattedMessage, useNavigate } from '@umijs/max';
import { Button, Form, Input, Typography, message } from 'antd';
import { useState } from 'react';
import { isStrongPassword } from 'validator';

const { Text } = Typography;

export function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for loading indicator

  const onFormSubmit = async (values: API.IRegisterUser) => {
    setLoading(true); // Start loading
    try {
      const resp = await postAuthRegister(values);
      const { accessToken } = resp;
      const user = await auth.actions.setAccessTokenAndLogin(accessToken);
      if (user) {
        message.success(<FormattedMessage id="registration-success" />); // Show success message
        navigate('/home');
      }
    } catch (error) {
      console.error('Registration failed', error);
      message.error(<FormattedMessage id="registration-failed" />); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Form
        name="register"
        initialValues={{
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: '',
        }}
        onFinish={onFormSubmit}
        className="space-y-6"
        layout="vertical" // Improved form layout for better spacing
      >
        <Form.Item
          name="firstName"
          label={<FormattedMessage id="first-name" />}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="required" />,
            },
          ]}
        >
          <Input className="p-2 block w-full border-gray-300 rounded-md shadow-sm" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label={<FormattedMessage id="last-name" />}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="required" />,
            },
          ]}
        >
          <Input className="p-2 block w-full border-gray-300 rounded-md shadow-sm" />
        </Form.Item>
        <Form.Item
          name="userName"
          label={<FormattedMessage id="user-name" />}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="required" />,
            },
          ]}
        >
          <Input className="p-2 block w-full border-gray-300 rounded-md shadow-sm" />
        </Form.Item>
        <Form.Item
          name="email"
          label={<FormattedMessage id="email-address" />}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="required" />,
            },
            {
              type: 'email',
              message: <FormattedMessage id="invalid-email-address" />,
            },
          ]}
        >
          <Input
            type="email"
            autoComplete="email"
            className="p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={<FormattedMessage id="password" />}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="password-is-required" />,
            },
            {
              validator: (_, value) =>
                value && isStrongPassword(value)
                  ? Promise.resolve()
                  : Promise.reject(
                      <FormattedMessage id="password-is-not-strong" />,
                    ),
            },
          ]}
        >
          <Input.Password
            autoComplete="new-password"
            className="p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading} // Button shows loading indicator
          >
            <FormattedMessage id="register" />
          </Button>
        </Form.Item>
        <Text className="text-center text-sm text-gray-500">
          <FormattedMessage
            id="go-login-sentence"
            values={{
              link1: (
                <a
                  href="/login"
                  className="font-bold text-blue-600 hover:text-blue-500"
                >
                  <FormattedMessage id="sign-in" />
                </a>
              ),
            }}
          />
        </Text>
      </Form>
    </div>
  );
}
