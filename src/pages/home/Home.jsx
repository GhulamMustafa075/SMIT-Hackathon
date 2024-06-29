import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear("user");
    window.location.href = "/login";
  };
  return (
    <>
      <h1>Landing Page</h1>
      {user ? (
        <div className="flow-root">
          <a
            onClick={logout}
            className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
          >
            Logout
          </a>
        </div>
      ) : (
        <div className="flow-root">
          <Link
            to={"/login"}
            className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};
export default Home;
