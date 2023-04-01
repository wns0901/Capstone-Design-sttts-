import { useNavigate } from "react-router-dom";

export default function Hello() {
  const navigate = useNavigate();

  const movePage = () => {
    navigate("/test");
  };

  return (
    <div>
      <p>Hello</p>
      <button onClick={movePage}>이동</button>
    </div>
  );
}
