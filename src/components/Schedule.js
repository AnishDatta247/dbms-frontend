import { Input, Select, Table, TextInput } from "@mantine/core";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const Schedule = ({events}) => {
  const input = [
    {
      id: 1,
      name: "Overnite",
      start_date_time: "2021-10-01 18:00:00",
      end_date_time: "2021-10-02 07:00:00",
      type: "competition",
      registered: 0,
    },
    {
      id: 2,
      name: "NextJS Hackathon",
      start_date_time: "2021-10-02 09:00:00",
      end_date_time: "2021-10-04 18:00:00",
      type: "competition",
      registered: 0,
    },
    {
      id: 3,
      name: "Ed Sheeran Live Concert",
      start_date_time: "2021-10-03 09:00:00",
      end_date_time: "2021-10-03 18:00:00",
      type: "cultural",
      registered: 0,
    },
    {
      id: 4,
      name: "VueJS Conference",
      start_date_time: "2021-10-04 09:00:00",
      end_date_time: "2021-10-04 18:00:00",
      type: "workshop",
      registered: 0,
    },
    {
      id: 5,
      name: "Entrepreneurship Summit",
      start_date_time: "2021-10-05 09:00:00",
      end_date_time: "2021-10-05 18:00:00",
      type: "talk",
      registered: 0,
    },
  ];

  const [sortBy, setSortBy] = useState("start_date_time");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if(!events) return;
    setData(
      events.sort((a, b) => {
        if (sortBy === "start_date_time") {
          return new Date(a.start_date_time) - new Date(b.start_date_time);
        } else if (sortBy === "end_date_time") {
          return new Date(a.end_date_time) - new Date(b.end_date_time);
        } else {
          return (
            new Date(a.end_date_time) -
            new Date(a.start_date_time) -
            (new Date(b.end_date_time) - new Date(b.start_date_time))
          );
        }
      })
    );
  }, [events, sortBy]);

  useEffect(() => {
    setFilteredData(
      data.filter((event) =>
        event.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "do MMM yyyy, h:mm a");
  };

  return (
    <div className="px-4 py-1">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-3xl">Event Schedule</span>
        <Select
          placeholder="Sort by"
          allowDeselect={false}
          data={[
            { label: "Start Date-Time", value: "start_date_time" },
            { label: "End Date-Time", value: "end_date_time" },
            { label: "Duration", value: "duration" },
          ]}
          value={sortBy}
          onChange={(value) => setSortBy(value)}
        />
      </div>
      <div className="flex gap-2 py-6 items-center w-full">
        <Search className="w-4 h-4 text-neutral-400" />
        <TextInput
          placeholder="Search for event name"
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Event Name</Table.Th>
            <Table.Th className="hidden md:block">Type</Table.Th>
            <Table.Th>Start Date-Time</Table.Th>
            <Table.Th>End Date-Time</Table.Th>
            <Table.Th className="hidden md:block">Registered</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredData &&
            filteredData.map((event) => (
              <Table.Tr key={event.id}>
                <Table.Td>{event.name}</Table.Td>
                <Table.Td className="hidden md:block">{event.type}</Table.Td>
                <Table.Td>{dateTimeFormatter(event.start_date_time)}</Table.Td>
                <Table.Td>{dateTimeFormatter(event.end_date_time)}</Table.Td>
                <Table.Td className="hidden md:block">
                  {!event.registered ? "No" : "Yes"}
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default Schedule;
