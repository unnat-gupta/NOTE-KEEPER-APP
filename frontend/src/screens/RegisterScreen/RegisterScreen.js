import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button } from "react-bootstrap";
import "../LoginScreen/LoginScreen.css";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error } = userRegister;
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords Do not match!");
    } else {
      dispatch(register(name, email, password, pic));
    }
    // if (password !== confirmpassword) {
    //   setMessage("Passwords Do not match!");
    // } else {
    //   setMessage(null);
    //   try {
    //     const config = {
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     };

    //     setLoading(true);

    //     const { data } = await axios.post(
    //       "/api/users",
    //       { name, pic, email, password },
    //       config
    //     );

    //     setLoading(false);
    //     localStorage.setItem("userInfo", JSON.stringify(data));
    //   } catch (error) {
    //     setError(error.response.data.message);
    //   }
    // }
  };

  const postDetails = async (pics) => {
    try {
      if (
        pics ===
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      ) {
        return setPicMessage("Please Select an Image");
      }
      setPicMessage(null);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "notekeeper");
        data.append("cloud_name", "dpyrwjcf6");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dpyrwjcf6/image/upload",
          data
        );
        console.log(res.data);
        setPic(res.data.url.toString());
      } else {
        return setPicMessage("Please Select an Image");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {/* ERROR DOES NOT WORK */}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="my-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmpassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
              type="file"
            />
          </Form.Group>
          <Button className="my-2" variant="primary" type="submit">
            REGISTER
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
