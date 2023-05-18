import { Link, useActionData, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Form as SuperForm } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

export async function action({ request }) {
  const formData = await request.formData();

  const password = formData.get("password");
  const confirm = formData.get("confirm");

  if(password === '' || !password){
    return {
      name: formData.get("name"),
      email: formData.get("email"),
    }
  }

  if(password !== confirm){
    toast.error('Passwords dont match!');
    return null;
  }

  return {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  };
}

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useActionData();
  console.log(data);
  
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (data) {
      const update = async () => {
        try {
          const res = await updateProfile({ _id:userInfo._id, ...data }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Profile Updated')
        } catch (err) {
          toast.error(err.data?.message);
        }
      };
      update();
    }
  }, [data]);

  return (
    <SuperForm method="post">
      <FormContainer>
        <h1>Update Profile</h1>
        <Form.Group className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            required
            defaultValue= {userInfo.name}
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
            defaultValue={userInfo.email}
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
            // required
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
            // required
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader/>}
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </FormContainer>
    </SuperForm>
  );
};

export default ProfilePage;
