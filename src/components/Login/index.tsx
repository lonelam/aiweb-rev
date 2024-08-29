import { postAuthLogin } from '@/services/core/auth';
import { auth } from '@/store/auth';
import {
  FormattedMessage,
  Navigate,
  useNavigate,
  useSnapshot,
} from '@umijs/max';
import { Button, Form, Input, Typography } from 'antd';

const { Text } = Typography;

export function Login() {
  const navigate = useNavigate();
  const { isLogin } = useSnapshot(auth.state);

  const onFormSubmit = async (values: API.ILoginByEmailParams) => {
    try {
      const resp = await postAuthLogin(values);
      const { accessToken } = resp;
      const user = await auth.actions.setAccessTokenAndLogin(accessToken);
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  if (isLogin) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="max-w-md mx-auto">
      <Form
        name="login"
        initialValues={{ email: '', password: '' }}
        onFinish={onFormSubmit}
        className="space-y-6"
      >
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
          ]}
        >
          <Input.Password
            autoComplete="current-password"
            className="p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            <FormattedMessage id="sign-in" />
          </Button>
        </Form.Item>
        <Text className="text-center text-sm text-gray-500">
          <FormattedMessage
            id="go-register-sentence"
            values={{
              link1: (
                <a
                  href="/register"
                  className="font-bold text-blue-600 hover:text-blue-500"
                >
                  <FormattedMessage id="sign-up" />
                </a>
              ),
            }}
          />
        </Text>
      </Form>
    </div>
  );
}
