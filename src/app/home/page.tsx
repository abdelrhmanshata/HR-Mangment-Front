"use client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import client from "@/utils/client";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    client
      .get("api/employees/")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editEmployee = async (id: number) => {
    router.push(`/employee/${id}`);
  };

  const deleteEmployee = async (id: number) => {
    try {
      const response = await client.delete(`api/employees/${id}`);
      if (response.status === 204) {
        setEmployees((employees) =>
          employees.filter((emp: { id: number }) => emp.id !== id)
        );
      }
      console.log("Employee added successfully:", response.data);
    } catch (error: any) {
      console.error("Failed to add employee:", error.response);
    }
  };

  const [employeeId, setEmployeeId] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const AddAttendance = () => {
    client
      .post("api/employee_attendances/", { id: employeeId, date: selectedDate })
      .then((res) => {
        console.log(res);
        setSelectedDate("");
        setEmployeeId(0);
      });
  };

  const itemEmployee = (
    item: { id: number; name: string; email: string },
    index: number
  ) => {
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>
          <button
            className="btn btn-outline-primary mx-2"
            type="button"
            onClick={() => {
              editEmployee(item.id);
            }}
          >
            Edit
          </button>

          <button
            className="btn btn-outline-danger mx-2"
            type="button"
            onClick={() => {
              deleteEmployee(item.id);
            }}
          >
            Delete
          </button>

          <button
            type="button"
            className="btn btn-outline-success mx-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              setEmployeeId(item.id);
            }}
          >
            Add Attendance
          </button>
        </td>
      </tr>
    );
  };

  const ModelAttendance = () => {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Attendance Date
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="dateInput">Select a date:</label>
              <input
                type="date"
                id="dateInput"
                value={selectedDate}
                onChange={handleDateChange}
              />
              <p>Selected Date: {selectedDate}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={!selectedDate}
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  AddAttendance();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      
      <Navbar />

      <div className="pt-5">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length ? (
              employees.map(
                (
                  item: { id: number; name: string; email: string },
                  index: number
                ) => itemEmployee(item, index)
              )
            ) : (
              <tr>
                <th colSpan={4} className="text-center">
                  No Employees
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ModelAttendance/>

    </div>
  );
}
