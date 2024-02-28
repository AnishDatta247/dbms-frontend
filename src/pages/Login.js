import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { toast } from "sonner";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(process.env.REACT_APP_FETCH_URL);
    await fetch(`${process.env.REACT_APP_FETCH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(values),
    }).then(async (res) => {
      let jsonData = await res.json();
      console.log(jsonData);
      if (!res.ok) {
        toast.error(jsonData.message);
      } else {
        localStorage.setItem("access_token", jsonData.access_token);
        navigate("/dashboard");
        toast.success("Logged in successfully!");
      }
      setLoading(false);
    });
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 0 ? null : "Password is required"),
    },
  });

  if (localStorage.getItem("access_token")) {
    // console.log("HII");
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via bg-blue-500 to-blue-300">
      <div className="bg-white rounded-xl px-8 py-6 flex flex-col gap-4 w-[350px] sm:w-[400px]">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">Login Form</span>
          <span className="text-sm text-neutral-500 font-semibold">
            Login to your account
          </span>
        </div>
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="sm"
            label="Password"
            type="password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 px-4 py-2 rounded-md w-full text-white font-semibold text-sm mt-6"
          >
            Submit
          </button>
        </form>
        <Link
          to="/signup"
          className="text-sm hover:underline text-center w-fit m-auto"
        >
          Do not have an account?
        </Link>
      </div>
    </div>
  );
};

export default Login;
