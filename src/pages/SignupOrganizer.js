import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { Link } from "react-router-dom";

const SignupOrganizer = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    validate: (values) => {
      return {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        name: (value) =>
          value.trim().length > 3 ? null : "Atleast 3 characters",
        phone: (value) => (/^\d{10}$/.test(value) ? null : "Invalid phone"),
        password: (value) => (value.length > 6 ? null : "Atleast 6 characters"),
        confirm_password: (value) =>
          values.password === value ? null : "Passwords do not match",
      };
    },
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via bg-blue-500 to-blue-300">
      <div className="bg-white rounded-xl px-8 py-6 flex flex-col gap-4 w-[350px] sm:w-[450px]">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">Organizer Signup</span>
          <span className="text-sm text-neutral-500 font-semibold">
            Create an organizer account
          </span>
        </div>
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <div className="flex gap-4">
            <TextInput
              mt="xs"
              label="Name"
              placeholder="Name"
              {...form.getInputProps("name")}
            />
            <TextInput
              mt="xs"
              label="Phone"
              placeholder="10 digits"
              {...form.getInputProps("phone")}
            />
          </div>
          <TextInput
            mt="xs"
            type="password"
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <TextInput
            mt="xs"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            {...form.getInputProps("confirm-password")}
          />
          <div className="flex justify-end gap-4">
            <Link
              to="/signup"
              className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-6"
            >
              Prev
            </Link>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-6"
            >
              Submit
            </button>
          </div>
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

export default SignupOrganizer;
