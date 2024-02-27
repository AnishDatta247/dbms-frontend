import { Card, Button } from "@mantine/core";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const Events = () => {
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
        setData(
          input.sort((a, b) => {
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
      }, [sortBy]);
    
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

  const handleRegister = (eventId) => {
    // Implement your registration logic here
    console.log(`Register button clicked for event with ID ${eventId}`);
  };

  return (
    
    <div className="flex flex-wrap justify-center">
        
      {input.map((event) => (
        <Card
          key={event.id}
          shadow="xs"
          className="m-4"
          style={{ width: 300 }}
          radius="md"
          padding="md"
        >
          <div className="text-lg font-semibold">{event.name}</div>
          <div>Start Date-Time: {dateTimeFormatter(event.start_date_time)}</div>
          <div>End Date-Time: {dateTimeFormatter(event.end_date_time)}</div>
          <div>Type: {event.type}</div>
          <div>Registered: {event.registered === 0 ? "No" : "Yes"}</div>
          <div className="mt-4">
            <Button onClick={() => handleRegister(event.id)} fullWidth>
              Register
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Events;
