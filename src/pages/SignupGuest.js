import { useForm } from "@mantine/form";
import { TextInput, Button, Stepper, Group, NativeSelect } from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignupGuest = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      confirm_password: "",
      password: "",
      roll_number: "",
      phone: "",
      college: "",
      department: "",
      year: "",
    },
    validate: (values) => {
      if (active === 0) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
          name: values.name.length > 0 ? null : "Name is required",
          password:
            values.password.length > 5 ? null : "Atleast 6 characters required",
          confirm_password:
            values.confirm_password === values.password
              ? null
              : "Passwords do not match",
        };
      }
      if (active === 1) {
        return {
          roll_number:
            values.roll_number.length > 0 ? null : "Roll number is required",
          phone:
            values.phone.length > 0
              ? /^\D+$/.test(values.email)
                ? null
                : "Invalid Phone Number"
              : "Phone number is required",
          college:
            values.college.length > 0 ? null : "College name is required",
          department:
            values.department.length > 0 ? null : "Department name is required",
          year: values.year.length > 0 ? null : "Year of study is required",
        };
      }

      return {};
    },
  });

  const nextStep = () => {
    setActive((current) => {
      if (form.validate().hasErrors) return current;
      return current < 1 ? current + 1 : current;
    });
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via bg-blue-500 to-blue-300">
      <div className="bg-white rounded-xl px-8 py-6 flex flex-col gap-4 w-[350px] sm:w-[450px]">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">Signup</span>
          <span className="text-sm text-neutral-500 font-semibold">
            Create an account
          </span>
        </div>
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Stepper active={active}>
            <Stepper.Step label="Step 1">
              <TextInput
                label="Email"
                placeholder="Email"
                {...form.getInputProps("email")}
              />
              <TextInput
                mt="sm"
                label="Full Name"
                placeholder="John Doe"
                {...form.getInputProps("name")}
              />
              <TextInput
                mt="sm"
                label="Password"
                type="password"
                placeholder="Password"
                {...form.getInputProps("password")}
              />
              <TextInput
                mt="sm"
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                {...form.getInputProps("confirm_password")}
              />
            </Stepper.Step>
            <Stepper.Step label="Step 2">
              <TextInput
                label="Roll Number"
                placeholder="21CS30006"
                {...form.getInputProps("roll_number")}
              />
              <TextInput
                label="Phone"
                placeholder="10 digit phone number"
                {...form.getInputProps("phone")}
              />
              <TextInput
                mt="sm"
                label="College"
                placeholder="IIT KGP"
                {...form.getInputProps("college")}
              />
              <TextInput
                mt="sm"
                label="Department"
                placeholder="CSE"
                {...form.getInputProps("department")}
              />
              <NativeSelect
                mt="sm"
                label="Year of study"
                {...form.getInputProps("year")}
                data={["1st", "2nd", "3rd", "4th", "5th"]}
              />
            </Stepper.Step>
          </Stepper>
          <Group justify="flex-end">
            {active !== 0 && (
              <button
                className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-6"
                variant="default"
                onClick={prevStep}
              >
                Back
              </button>
            )}
            {active !== 1 ? (
              <button
                className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-6"
                onClick={nextStep}
              >
                Next step
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-6"
              >
                Submit
              </button>
            )}
          </Group>
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

export default SignupGuest;
