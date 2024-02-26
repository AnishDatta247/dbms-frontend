import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Stepper,
  Group,
  NativeSelect,
  Select,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SignupStudent = (props) => {
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
      college: props.type === "native" ? "IIT KGP" : "",
      department: "",
      year: "",
    },
    validate: (values) => {
      if (active === 0) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
          name: values.name.trim().length > 0 ? null : "Name is required",
          password:
            values.password.length > 5 ? null : "Atleast 6 characters required",
          confirm_password:
            values.confirm_password === values.password
              ? null
              : "Passwords do not match",
        };
      } else if (active === 1) {
        return {
          roll_number:
            values.roll_number.length > 0 ? null : "Roll number is required",
          phone:
            values.phone.length > 0
              ? /^\d{10}$/g.test(values.phone)
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
    console.log("FUNCTION CALLED");
    if (!form.validate().hasErrors) {
      if (active === 0) setActive(1);
      else {
        onSubmit(form.values);
      }
    }
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via bg-blue-500 to-blue-300">
      <div className="bg-white rounded-xl px-8 py-6 flex flex-col gap-4 w-[350px] sm:w-[450px]">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">Student Signup</span>
          <span className="text-sm text-neutral-500 font-semibold">
            {`Create a ${props.type} student account`}
          </span>
        </div>
        {/* <form onSubmit={form.onSubmit((values) => onSubmit(values))}> */}
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
            <div className="flex gap-4">
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
            </div>
            {props.type === "guest" && (
              <TextInput
                mt="sm"
                label="College"
                placeholder="IIT KGP"
                {...form.getInputProps("college")}
              />
            )}
            <Select
              clearable
              mt="sm"
              label="Department"
              {...form.getInputProps("department")}
              data={[
                { value: "CSE", label: "Computer Science and Engineering" },
                { value: "EE", label: "Electrical Engineering" },
                { value: "ME", label: "Mechanical Engineering" },
                { value: "CE", label: "Civil Engineering" },
                {
                  value: "ECE",
                  label: "Electronics and Communication Engineering",
                },
                { value: "MNC", label: "Mathematics and Computing" },
              ]}
            />
            <Select
              clearable
              mt="sm"
              label="Year of study"
              {...form.getInputProps("year")}
              data={["1st", "2nd", "3rd", "4th", "5th"]}
            />
          </Stepper.Step>
        </Stepper>
        <div className="flex gap-4 justify-end">
          {active !== 0 ? (
            <button
              className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-2"
              variant="default"
              onClick={prevStep}
            >
              Back
            </button>
          ) : (
            <Link
              to="/signup"
              className=" bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-2"
            >
              Prev
            </Link>
          )}
          {active !== 1 ? (
            <button
              className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-2"
              onClick={nextStep}
            >
              Next step
            </button>
          ) : (
            <button
              // type="submit"
              onClick={nextStep}
              className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-2"
            >
              Submit
            </button>
          )}
        </div>
        <Link
          to="/signup"
          className="text-sm hover:underline text-center w-fit m-auto"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default SignupStudent;
