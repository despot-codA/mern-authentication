import { Link, useActionData, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Form as SuperForm } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

export async function action({ request }) {
  const formData = await request.formData();

  const password = formData.get("password");
  const confirm = formData.get("confirm");

  if(password !== confirm){
    toast.error('Passwords dont match!');
    return null;
  }

  if (password)
    return {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm: formData.get("confirm"),
    };
  return null;
}

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useActionData();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    if (data) {
      const registerUser = async () => {
        try {
          // console.log({...data});
          const res = await register({ ...data }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate("/");
        } catch (err) {
          toast.error(err.data?.message);
        }
      };
      registerUser();
    }
  }, [navigate, userInfo, data]);

  return (
    <SuperForm method="post">
      <FormContainer>
        <h1>Sign Up</h1>
        <Form.Group className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            required
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            required
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            required
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirm"
            required
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader/>}
        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to={`/login`}>Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </SuperForm>
  );
};

export default RegisterPage;
