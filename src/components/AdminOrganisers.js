import { Input, Modal, Select, Table, TextInput, Tooltip } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { Info, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const AdminOrganisers = (props) => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(props.organiserdata);
    if (!props.organiserdata) return;
    setData(props.organiserdata);
  }, [search, props.organiserdata]);

  console.log(data);

  const [opened1, { open: open1, close: close1 }] = useDisclosure();
  const [opened2, { open: open2, close: close2 }] = useDisclosure();
  const [opened3, { open: open3, close: close3 }] = useDisclosure();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      events_sponsered: "",
    },
    validate: {
      email: (value) => (value.length > 0 ? null : "Type is required"),
      name: (value) => (value.length > 0 ? null : "Name is required"),
      phone: (value) => (value.length > 0 ? null : "Phone is required"),
    },
  });

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "do MMM yyyy, h:mm a");
  };

  const onDelete = (oid) => {
    console.log("DELETING: ", oid);
    close2();
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="px-4 py-1 flex flex-col gap-6">
      <div className="flex justify-start gap-4 items-center">
        <span className="font-semibold text-3xl">organisers</span>{" "}
        <Modal centered opened={opened3} onClose={close3} title="New organiser">
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
              label="Phone"
              placeholder="Phone"
              {...form.getInputProps("phone")}
            />
          </form>
        </Modal>
      </div>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data &&
            data.map((organiser) => (
              <Table.Tr key={organiser.oid}>
                <Table.Td>{organiser.name}</Table.Td>
                <Table.Td>{organiser.email}</Table.Td>
                <Table.Td>{organiser.phone}</Table.Td>

                <Table.Td>
                  <Modal
                    centered
                    title="Confirm Delete"
                    opened={opened2}
                    onClose={close2}
                  >
                    <p>Do you want to delete this organiser?</p>
                    <button
                      onClick={() => onDelete(organiser.oid)}
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
        <span>New Organizer</span>
      </button>
    </div>
  );
};

export default AdminOrganisers;
