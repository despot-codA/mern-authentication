import { useEffect } from "react";
import { Link, useActionData, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Form as SuperForm } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
  
    return{ email, password};
}

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useActionData();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if(userInfo) {
            navigate('/');
        }
        if(data){
            const authenticate = async() =>{
                try{
                    // console.log({...data});
                    const res = await login({ ...data}).unwrap();
                    dispatch(setCredentials({...res}))
                    navigate('/');
                }catch(err){
                    toast.error(err.data?.message);
                }
            }
            authenticate();
        }
    }, [navigate, userInfo, data]);


  return (
    <SuperForm method='post' >
      <FormContainer>
        <h1>Sign In</h1>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name='email'
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name='password'
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {isLoading && <Loader />}

          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>

        <Row className="py-3">
          <Col>
            New Customer? <Link to={`/register`}>Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </SuperForm>
  );
};

export default LoginPage;
