import {
  Input,
  Modal,
  NumberInput,
  Select,
  Table,
  TextInput,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { Info, Pen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const AdminEvents = () => {
  const input = [
    {
      id: 1,
      name: "Overnite",
      start_date_time: "2021-10-01 18:00:00",
      end_date_time: "2021-10-02 07:00:00",
      type: "competition",
      location: "Computer Informatics Center",
      first_prize: 30000,
      second_prize: 20000,
      third_prize: 10000,
      info: "Overnite is the annual cultural fest of IITB. It is a 36-hour long festival that is a perfect blend of cultural, technical, and artistic events. It is one of the most awaited events of the year.",
    },
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
      type: "",
      location: "",
      first_prize: 0,
      second_prize: 0,
      third_prize: 0,
      info: "",
    },
    validate: {
      name: (value) => (value.length > 0 ? null : "Name is required"),
      type: (value) => (value.length > 0 ? null : "Type is required"),
      location: (value) => (value.length > 0 ? null : "Location is required"),
      first_prize: (value) => (value >= 0 ? null : "First Prize is required"),
      second_prize: (value) => (value >= 0 ? null : "Second Prize is required"),
      third_prize: (value) => (value >= 0 ? null : "Third Prize is required"),
      info: (value) => (value.length > 0 ? null : "Info is required"),
    },
  });

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "do MMM yyyy, h:mm a");
  };

  const onDelete = (id) => {
    setData((prev) => prev.filter((event) => event.id !== id));
    close2();
  };

  const dateString = (dateTime) => {
    return format(dateTime, "yyyy-MM-dd");
  };

  const onSubmit = (values) => {
    form.validate();
    if (!from) {
      setFromError("From date required");
    } else setFromError("");
    if (!to) {
      setToError("To date required");
    } else setToError("");
    if (Object.keys(form.errors).length > 0) {
      return;
    }
    if (from && to) {
      setFromError("");
      setToError("");
      //   add record
      setData((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: values.name,
          type: values.type,
          start_date_time: from,
          end_date_time: to,
          location: values.location,
          first_prize: values.first_prize,
          second_prize: values.second_prize,
          third_prize: values.third_prize,
          info: values.info,
        },
      ]);
      close3();
      form.reset();
      setFrom(null);
      setTo(null);
    }
  };

  return (
    <div className="px-4 py-1 flex flex-col gap-6">
      <div className="flex justify-start gap-4 items-center">
        <span className="font-semibold text-3xl">Events</span>

        <Modal centered opened={opened3} onClose={close3} title="New Event">
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              label="Name"
              placeholder="Name"
              {...form.getInputProps("name")}
            />
            <Select
              mt="sm"
              label="Type"
              placeholder="Type"
              data={[
                { label: "Competition", value: "competition" },
                { label: "Cultural", value: "cultural" },
                { label: "Workshop", value: "workshop" },
                { label: "Talk", value: "talk" },
                { label: "Other", value: "other" },
              ]}
              {...form.getInputProps("type")}
            />

            <div className="flex gap-4 w-full">
              <div className="w-full">
                <DateInput
                  mt="md"
                  label="From"
                  placeholder="Staying from"
                  value={from}
                  onChange={setFrom}
                  error={fromError.length !== 0}
                />
                <span className="text-xs text-red-500">{fromError}</span>
              </div>

              <div className="w-full">
                <DateInput
                  mt="md"
                  label="To"
                  placeholder="Staying till"
                  value={to}
                  onChange={setTo}
                  error={toError.length !== 0}
                />
                <span className="text-xs text-red-500">{toError}</span>
              </div>
            </div>

            <TextInput
              mt="sm"
              label="Location"
              placeholder="Location"
              {...form.getInputProps("location")}
            />
            <NumberInput
              mt="sm"
              label="First Prize"
              placeholder="First Prize"
              {...form.getInputProps("first_prize")}
            />
            <NumberInput
              mt="sm"
              label="Second Prize"
              placeholder="Second Prize"
              {...form.getInputProps("second_prize")}
            />
            <NumberInput
              mt="sm"
              label="Third Prize"
              placeholder="Third Prize"
              {...form.getInputProps("third_prize")}
            />
            <Textarea
              mt="sm"
              label="Info"
              placeholder="Info"
              {...form.getInputProps("info")}
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
            <Table.Th>Event Name</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Start Date-Time</Table.Th>
            <Table.Th>End Date-Time</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>First Prize</Table.Th>
            <Table.Th>Second Prize</Table.Th>
            <Table.Th>Third Prize</Table.Th>
            <Table.Th>Info</Table.Th>
            <Table.Th>Update</Table.Th>
            <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data &&
            data.map((event) => (
              <Table.Tr key={event.id}>
                <Table.Td>{event.name}</Table.Td>
                <Table.Td className="capitalize">{event.type}</Table.Td>
                <Table.Td>{dateTimeFormatter(event.start_date_time)}</Table.Td>
                <Table.Td>{dateTimeFormatter(event.end_date_time)}</Table.Td>
                <Table.Td>{event.location}</Table.Td>
                <Table.Td>{event.first_prize}</Table.Td>
                <Table.Td>{event.second_prize}</Table.Td>
                <Table.Td>{event.third_prize}</Table.Td>
                <Table.Td>
                  <Modal
                    centered
                    title="Information"
                    opened={opened1}
                    onClose={close1}
                  >
                    {event.info}
                  </Modal>
                  <Info onClick={open1} className="w-4 h-4" />
                </Table.Td>
                <Table.Td>
                  <Pen className="cursor-pointer w-5 h-5" />
                </Table.Td>
                <Table.Td>
                  <Modal
                    centered
                    title="Confirm Delete"
                    opened={opened2}
                    onClose={close2}
                  >
                    <p>Do you want to delete this event?</p>
                    <button
                      onClick={() => onDelete(event.id)}
                      className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-6"
                    >
                      Delete
                    </button>
                  </Modal>
                  <Trash2
                    onClick={open2}
                    className="cursor-pointer w-5 h-5 text-red-600"
                  />
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
        <span>New Event</span>
      </button>
    </div>
  );
};

export default AdminEvents;
