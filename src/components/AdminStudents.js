import { Input, Modal, Select, Table, TextInput, Tooltip } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { Info, Trash2 } from "lucide-react";
import { useState } from "react";

const AdminStudents = () => {
  const input = [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "college": "Example University"
    },
    {
      "id": 2,
      "name": "Alice Smith",
      "email": "alice.smith@example.com",
      "college": "Another University"
    },
    {
      "id": 3,
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "college": "Some College"
    },
    {
      "id": 4,
      "name": "Emily Davis",
      "email": "emily.davis@example.com",
      "college": "Yet Another College"
    },
    {
      "id": 5,
      "name": "Michael Brown",
      "email": "michael.brown@example.com",
      "college": "University of Example"
    }
  ];  

  const [data, setData] = useState(input);

  const [opened1, { open: open1, close: close1 }] = useDisclosure();
  const [opened2, { open: open2, close: close2 }] = useDisclosure();
  const [opened3, { open: open3, close: close3 }] = useDisclosure();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      college: "",
    },
    validate: {
      name: (value) => (value.length > 0 ? null : "Name is required"),
      email: (value) => (value.length > 0 ? null : "Type is required"),
      college: (value) => (value.length > 0 ? null : "Location is required"),
    },
  });

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "do MMM yyyy, h:mm a");
  };

  const onDelete = (id) => {
    console.log("DELETING: ", id);
    close2();
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="px-4 py-1 flex flex-col gap-6">
      <div className="flex justify-start gap-4 items-center">
        <span className="font-semibold text-3xl">Students</span>
        <button
          onClick={open3}
          className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm -mb-1"
        >
          New
        </button>
        <Modal opened={opened3} onClose={close3} title="New Student">
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              label="Name"
              placeholder="Name"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Email"
              {...form.getInputProps("email")}
            />
             <TextInput
              label="College"
              placeholder="College"
              {...form.getInputProps("college")}
            />

          </form>
        </Modal>
      </div>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>College</Table.Th>
            <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data &&
            data.map((student) => (
              <Table.Tr key={student.id}>
                <Table.Td>{student.name}</Table.Td>
                <Table.Td>{student.email}</Table.Td>
                <Table.Td>{student.college}</Table.Td>
                
                
                <Table.Td>
                  <Modal
                    centered
                    title="Confirm Delete"
                    opened={opened2}
                    onClose={close2}
                  >
                    <p>Do you want to delete this student?</p>
                    <button
                      onClick={() => onDelete(student.id)}
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
    </div>
  );
};

export default AdminStudents;
