import { Navigate, useNavigate, Route, Routes } from "react-router-dom";
const Post = () => {
  const navigate = useNavigate();
  const status = 200;

  if (status === 404) {
    return <Navigate to="/notfound" />;
  }

  const onClick = () => {
    console.log("You have been redirected");

    navigate("/");
  };

  return (
    <div>
      <button onClick={onClick}> CLICK ME</button>
      <Routes>
        <Route path="/show" element={<h1>Hello Man!</h1>}></Route>
      </Routes>
    </div>
  );
};

export default Post;
