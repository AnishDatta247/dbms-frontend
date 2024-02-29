import { Input, Modal, NumberInput, Select, Table, TextInput, Tooltip } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { Info,Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminStudents = (props) => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(props.studentdata);
    if (!props.studentdata) return;
    setData(props.studentdata);
  }, [search, props.studentdata]);

  console.log(data);

  const [opened1, { open: open1, close: close1 }] = useDisclosure();
  const [opened2, { open: open2, close: close2 }] = useDisclosure();
  const [opened3, { open: open3, close: close3 }] = useDisclosure();

  // const [from, setFrom] = useState(null);
  // const [to, setTo] = useState(null);
  // const [fromError, setFromError] = useState("");
  // const [toError, setToError] = useState("");
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      roll_number: "",
      phone: "",
      college: "",
      department: "",
      year: "",
      type: "",
      password: "",
    },
    validate: {
      email: (value) => (value.length > 0 ? null : "Type is required"),
      name: (value) => (value.length > 0 ? null : "Name is required"),
      roll_number: (value) =>
        value.length > 0 ? null : "Roll Number is required",
      phone: (value) => (value.length > 0 ? null : "Phone is required"),
      college: (value) => (value.length > 0 ? null : "college is required"),
      department: (value) =>
        value.length > 0 ? null : "department is required",
      year: (value) => (value > 0 ? null : "year is required"),
      type: (value) => (value.length > 0 ? null : "type is required"),
    },
  });

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "do MMM yyyy, h:mm a");
  };

  const onDelete = (sid) => {
    console.log("DELETING: ", sid);
    console.log("DELETING: ", `${process.env.REACT_APP_FETCH_URL}/admin/remove_student/`+ sid);
    fetch(`${process.env.REACT_APP_FETCH_URL}/admin/remove_student/`+ sid, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then(() => {
        close2();
      })
      .catch((e) => {
        toast.error(e.message);
      });

  };

  const onSubmit = (values) => {
    console.log(values);

    form.validate();
    if (Object.keys(form.errors).length > 0) {
      return;
    }

      setData((prev) => [
        ...prev,
        {
          email: values.email,
          name: values.name,
          roll_number: values.roll_number,
          phone: values.phone,
          college: values.college,
          department: values.department,
          year: values.year,
          type: values.type,
          password: values.password,
        },
      ]);


      fetch(`${process.env.REACT_APP_FETCH_URL}/admin/add_student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          roll_number: values.roll_number,
          phone: values.phone,
          college: values.college,
          department: values.department,
          year: values.year,
          type: values.type,
          password: values.password,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          close3();
          form.reset();
          // setFrom(null);
          // setTo(null);
        })
        .catch((e) => {
          toast.error(e.message);
        });

      // close3();
      // form.reset();
      // setFrom(null);
      // setTo(null);

  };

  return (
    <div className="px-4 py-1 flex flex-col gap-6">
      <div className="flex justify-start gap-4 items-center">
        <span className="font-semibold text-3xl">Students</span>{" "}
        <Modal centered opened={opened3} onClose={close3} title="New Student">
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              label="Email"
              placeholder="Email"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Name"
              placeholder="Name"
              {...form.getInputProps("name")}
            />

            <TextInput
              label="Roll Number"
              placeholder="Roll Number"
              {...form.getInputProps("roll_number")}
            />

            <TextInput
              label="Phone"
              placeholder="Phone"
              {...form.getInputProps("phone")}
            />

            <TextInput
              label="College"
              placeholder="College"
              {...form.getInputProps("college")}
            />

            <TextInput
              label="Department"
              placeholder="Department"
              {...form.getInputProps("department")}
            />
          
            <NumberInput
              label="Year"
              placeholder="Year"
              {...form.getInputProps("year")}
            />
            <Select
              label="Type"
              placeholder="Type"
              data={[
                { label: "External", value: "external" },
                { label: "Internal", value: "internal" },
              ]}
              {...form.getInputProps("type")}
            />
            <TextInput
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-6"
            >
              Submit
            </button>
          </form>
        </Modal>
      </div>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Roll Number</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>College</Table.Th>
            <Table.Th>Department</Table.Th>
            <Table.Th>Year</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data &&
            data.map((student) => (
              <Table.Tr key={student.sid}>
                <Table.Td>{student.name}</Table.Td>
                <Table.Td>{student.email}</Table.Td>
                <Table.Td>{student.roll_number}</Table.Td>
                <Table.Td>{student.phone}</Table.Td>
                <Table.Td>{student.college}</Table.Td>
                <Table.Td>{student.department}</Table.Td>
                <Table.Td>{student.year}</Table.Td>
                <Table.Td>{student.type}</Table.Td>

                <Table.Td>
                  <Modal
                    centered
                    title="Confirm Delete"
                    opened={opened2}
                    onClose={close2}
                  >
                    <p>Do you want to delete this student?</p>
                    <button
                      onClick={() => onDelete(student.sid)}
                      className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-6"
                    >
                      Delete
                    </button>
                  </Modal>
                  <Trash2 onClick={open2} className="w-5 h-5 text-red-600" />
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
      <button
        onClick={open3}
        className="flex gap-1 items-center bg-blue-500 w-fit m-auto px-4 py-2 rounded-md text-white font-semibold text-sm -mb-1"
      >
        <Plus className="w-5 h-5" />
        <span>New Student</span>
      </button>
    </div>
  );
};

export default AdminStudents;
