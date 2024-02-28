import { Card, Button, TextInput } from "@mantine/core";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Events = (props) => {
  console.log("User type is "+ props.type)
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

  

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if(!props.events) return;
    setFilteredData(
      props.events.filter(
        (event) =>
          event.name.toLowerCase().includes(search.toLowerCase()) ||
          event.type.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, props.events]);

  useEffect(() => {
    console.log(props.events)
  }, [props.events])

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "do MMM yyyy, h:mm a");
  };

  return (
    <div>
      <div className="flex gap-2 p-4 items-center w-full">
        <Search className="w-4 h-4 text-neutral-400" />
        <TextInput
          placeholder="Search for event name or category"
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
        {filteredData.map((event) => (
          <Card
            key={event.eid}
            shadow="md"
            className="m-4 border shadow-md gap-1"
            radius="md"
            padding="md"
          >
            <div className="text-xl mb-2 font-semibold">{event.name}</div>
            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-semibold">Starts</span>
              <span>{dateTimeFormatter(event.start_date_time)}</span>
            </div>

            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-semibold">Ends</span>
              <span>{dateTimeFormatter(event.end_date_time)}</span>
            </div>

            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-semibold">Type</span>
              <span>{event.type}</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-semibold">Registered</span>
              <span>{!event.registered ? "No" : "Yes"}</span>
            </div>
            <Link
              className="w-full text-center bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm mt-2"
              fullWidth
              onClick={() => {
                props.setTab((prev) => 4);
                localStorage.setItem("tab", 4);
                localStorage.setItem("eid", event.eid);
                props.setEid(event.eid);
              }}
            >
              Check Details
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
