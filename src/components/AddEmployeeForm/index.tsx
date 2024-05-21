"use client";
import { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import client from "@/utils/client";
import { useRouter } from "next/navigation";

interface Props {
  id?: number;
}

export default function AddEmployeeForm({ id }: Props) {
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<{
    name: string;
    email: string;
    group: string;
  }>({
    name: "",
    email: "",
    group: "",
  });

  useEffect(() => {
    if (id) {
      client
        .get(`api/employees/${id}`)
        .then((response) => {
          setEmployeeData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = id
        ? await client.put(`api/employees/${id}`, employeeData)
        : await client.post("api/employees/", employeeData);
      if (response.status === 201) {
        router.push("/home");
      }
      console.log(
        `Employee ${id ? "Updated" : "Added"} successfully:`,
        response.data
      );
    } catch (error: any) {
      console.error(
        `Failed to ${id ? "Updated" : "Added"} employee:`,
        error.response
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          placeholder="userName"
          type="text"
          id="name"
          className="form-control"
          value={employeeData.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmployeeData((empData) => ({ ...empData, name: e.target.value }))
          }
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          placeholder="example@example.com"
          type="email"
          id="email"
          className="form-control"
          value={employeeData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmployeeData((empData) => ({ ...empData, email: e.target.value }))
          }
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="group" className="form-label">
          Group:
        </label>
        <select
          id="group"
          className="form-select"
          title="Group"
          value={employeeData.group}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setEmployeeData((empData) => ({ ...empData, group: e.target.value }))
          }
          required
        >
          <option value="">Select group</option>
          <option value="HR">HR</option>
          <option value="Normal">Normal Employee</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {id ? "Update Employee" : " Add Employee"}
      </button>
    </form>
  );
}
