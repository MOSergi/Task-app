import Title from "antd/es/typography/Title";
import { Button, Form, FormProps, Input } from "antd";
import { FaUser, FaKey } from "react-icons/fa"

import "./index.css";

export const LoginPage = ()=>{

    const login : FormProps<{
        email : string,
        password : string
    }>['onFinish'] = async (values)=>{
        alert('login...');
    }

    return(
        <div id="login">
            <Title level={2}>
                Login
            </Title>
            <Form
                name="login"
                onFinish={login}
                className="loginForm"
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type : "email",
                            required : true,
                            message : "Insert user email"
                        }
                    ]}
                >
                    <Input
                        placeholder="Enter email"
                        prefix={<FaUser />}
                        className="loginInputs"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            type : "string",
                            required : true,
                            message : "Insert user password"
                        }
                    ]}
                >
                    <Input 
                        placeholder="Enter password"
                        type="password"
                        prefix={<FaKey />}
                        className="loginInputs"
                    />
                </Form.Item>
                <Button
                    type="primary"
                    className="loginBtn"
                    htmlType="submit"
                >
                    Login
                </Button>
            </Form>
        </div>
    );
}