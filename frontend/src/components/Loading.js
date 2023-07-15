import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = ({ size = 100 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "cneter",
        width: "100%",
        height: "100%",
      }}
    >
      <Spinner
        style={{ width: size, height: size }}
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
// const Loading = () => {
//   return (
//     <Spinner animation="border" role="status">
//       <span className="visually-hidden">Loading...</span>
//     </Spinner>
//   );
// };

export default Loading;
