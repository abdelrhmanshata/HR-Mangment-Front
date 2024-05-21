"use client";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
export default function Navbar() {
  const router = useRouter();
  const logout = () => {
    Cookies.remove('token');
    router.push("/login");
  };

  const addEmployee = () => {
    router.push("/employee");
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          HR System
        </a>

        <div className="d-flex" role="search">
          <button
            className="btn btn-outline-primary mx-2"
            type="button"
            onClick={() => {
              addEmployee();
            }}
          >
            Add New Employee
          </button>

          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
