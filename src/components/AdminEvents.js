import { Modal, Table, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { Info, Trash2 } from "lucide-react";
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

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "do MMM yyyy, h:mm a");
  };

  const onDelete = (id) => {
    console.log("DELETING: ", id);
    close2();
  };

  return (
    <div className="px-4 py-1 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-3xl">Events</span>
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
                  <Info onClick={open1} className="w-4 h-4 text-neutral-500" />
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
                  <Trash2 onClick={open2} className="w-5 h-5 text-red-600" />
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default AdminEvents;
