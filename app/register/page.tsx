/* Copied from original template except for class names for cards.
Classnames used:
-page
-page-center
-card 
-card--form

*/

"use client"; // For components that need React hooks and browser APIs, SSR (server side rendering) has to be disabled. Read more here: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering

import { useRouter } from "next/navigation"; // use NextJS router for navigation
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { RegisterPostDTO, UserAuthDTO, LoginPostDTO } from "@/types/user";
import { Button, Form, Input } from "antd";


const Register: React.FC = () => {
  const router = useRouter();
  const apiService = useApi();
  const [form] = Form.useForm();

  const {set: setToken} = useLocalStorage<string>("token", "");


  const handleRegistration = async (values: RegisterPostDTO) => {
    try {
      await apiService.post<UserAuthDTO>("/register", values);
      const loginCredentials: LoginPostDTO = {
        username: values.username,
        password: values.password,
      }
      const response = await apiService.post<UserAuthDTO>("/login", loginCredentials)
      setToken(response.token)
      router.push(`/users/${response.userId}`)

    } catch (error) {

      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="page-center page-content" >
      <div className="card card--form">
        <h2 className="form-title">Create an Account</h2>
        <Form
          form={form}
          name="login"
          size="large"
          variant="outlined"
          onFinish={handleRegistration}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="userBio"
            label="UserBio"
            rules={[{ required: false, message: "Please input your userBio!" }]}
          >
            <Input.TextArea placeholder="Enter username" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-button">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
