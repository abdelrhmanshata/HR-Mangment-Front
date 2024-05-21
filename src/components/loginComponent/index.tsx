"use client";
import { useRouter } from "next/navigation";
import client from "@/utils/client";
import { ChangeEvent, FormEvent, useState } from "react";
import Cookies from 'js-cookie';

export default function LoginForm() {
  
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Reset the form after submission

    try {
      // Call the login API
      const response = await client.post("api/login/", { email: email });
      // Handle successful login (e.g., redirect to dashboard)
      if (response.status == 200) {
        Cookies.set('token', response.data.token);
        router.push("/home");
      }
      console.log("Login successful:", response.data.token);
    } catch (error: any) {
      // Handle login error (e.g., display error message)
      console.error("Login failed:", error.response.data.error);
      console.error("Login failed:", error.response);
    }
    setEmail("");
  };

  return <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <h5 className="card-header">Login</h5>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  
}
