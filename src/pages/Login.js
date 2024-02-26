import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";

const Login = () => {
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

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via bg-blue-500 to-blue-300">
      <div className="bg-white rounded-xl px-8 py-6 flex flex-col gap-4 w-[50%]">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">Login Form</span>
          <span className="text-sm text-neutral-500 font-semibold">
            Login to your account
          </span>
        </div>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="sm"
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <Button type="submit" mt="lg">
            Submit
          </Button>
        </form>
        <span className="text-sm ">Already have an account?</span>
      </div>
    </div>
  );
};

export default Login;
