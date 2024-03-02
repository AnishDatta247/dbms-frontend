import { useForm } from "@mantine/form";
import { TextInput, Button, Modal } from "@mantine/core";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { toast } from "sonner";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useDisclosure } from "@mantine/hooks";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [opened, { open, close }] = useDisclosure();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(`${process.env.REACT_APP_FETCH_URL}/login`);
    await fetch(`${process.env.REACT_APP_FETCH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        let jsonData = await res.json();
        if (!res.ok) {
          toast.error(jsonData.message);
        } else {
          localStorage.setItem("access_token", jsonData.access_token);
          navigate("/dashboard");
          toast.success("Logged in successfully!");
        }
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
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

  const form2 = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit2 = (values) => {
    let status;
    fetch(`${process.env.REACT_APP_FETCH_URL}/forgot_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form2.values),
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((resData) => {
        if (status !== 200) {
          toast.error(resData.message);
          form2.reset();
          return;
        }
        toast.success(resData.message);
        form2.reset();
        close();
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  if (localStorage.getItem("access_token")) {
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
            className={
              loading
                ? "flex flex-row gap-4 justify-center bg-slate-400 text-white px-4 py-2 rounded-md w-full mt-6 text-sm font-semibold cursor-not-allowed"
                : "bg-blue-500 px-4 py-2 rounded-md w-full text-white font-semibold text-sm mt-6"
            }
          >
            {loading && (
              <TailSpin
                height={20}
                width={20}
                color="white"
                ariaLabel="loading"
              />
            )}
            Submit
          </button>
        </form>
        <div className="flex justify-between w-full">
          <Modal
            centered
            opened={opened}
            onClose={close}
            title="Forgot Password"
          >
            <form onSubmit={form2.onSubmit((values) => onSubmit2(values))}>
              <TextInput
                label="Email"
                placeholder="Send new password to..."
                {...form2.getInputProps("email")}
              />
              <button className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-6">
                Send Email
              </button>
            </form>
          </Modal>
          <Link
            onClick={open}
            className="text-sm hover:underline text-center w-fit"
          >
            Forgot Password?
          </Link>
          <Link
            to="/signup"
            className="text-sm hover:underline text-center w-fit"
          >
            Do not have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
