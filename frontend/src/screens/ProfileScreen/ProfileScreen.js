import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Col, Row, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import "./ProfileScreen.css";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";

const ProfileScreen = () => {
  const imgName = "Choose Image";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

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

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      dispatch(updateProfile({ name, email, password, pic }));
    }
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {success && (
                <ErrorMessage variant="success">
                  Profile Updated Successfully
                </ErrorMessage>
              )}
              {/* {message && (
                <ErrorMessage variant="danger">{message}</ErrorMessage>
              )} */}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  label={imgName}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-2">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
