import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/noteActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import { useAccordionButton } from "react-bootstrap/AccordionButton";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  //ERROR NOT WORKING WITHOUT LOGING IN
  useEffect(() => {
    if (userInfo === null) {
      console.log("Hi");
      navigate("/login");
    }
    dispatch(listNotes());
  }, [
    dispatch,
    successCreate,
    userInfo,
    navigate,
    successUpdate,
    successDelete,
  ]);

  const name = userInfo ? userInfo.name : "User";

  // const [notes, setNotes] = useState([]);

  // function CustomToggle({ children, eventKey }) {
  //   const decoratedOnClick = useAccordionButton(eventKey, () =>
  //     console.log("totally custom!")
  //   );

  //   return (
  //     <button
  //       type="button"
  //       // style={{ backgroundColor: "pink" }}
  //       onClick={decoratedOnClick}
  //     >
  //       {children}
  //     </button>
  //   );
  // }

  // const fetchNotes = async () => {
  //   const { data } = await axios.get("/api/notes");
  //   setNotes(data);
  // };

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  console.log(notes);

  return (
    <MainScreen title={`Welcome Back ${name}...`}>
      <Link to="/createnote">
        <Button
          style={{
            marginLeft: 10,
            marginBottom: 6,
          }}
          size="lg"
          variant="outline-primary"
        >
          Create New Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion key={note._id}>
            <Accordion.Item eventKey="0">
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    {/* <Accordion.Toggle as={Card.Text} variant="link" eventKey="0"> */}
                    <Accordion.Header>{note.title}</Accordion.Header>
                    {/* </Accordion.Toggle> */}
                    {/* <CustomToggle eventKey="0">{note.title}</CustomToggle> */}
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                {/* <Accordion.Collapse eventKey="0"> */}
                <Accordion.Body>
                  <Card.Body>
                    <h5>
                      <Badge bg="success" size="">
                        Category - {note.category}
                      </Badge>
                    </h5>
                    <blockquote className="blockquote mb-0">
                      {/* <p>{note.content}</p> */}
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>{" "}
                {/* </Accordion.Collapse> */}
              </Card>
            </Accordion.Item>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
