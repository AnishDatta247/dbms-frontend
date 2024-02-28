import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../components/Logo";
import {
  BedDouble,
  CalendarFold,
  CircleUserRound,
  TicketCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import Schedule from "../components/Schedule";
import Accomodation from "../components/Accomodation";
import Events from "../components/Events";
import Profile from "../components/Profile";
import Event from "../components/Event";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AdminAccodomations from "../components/AdminAccomodations";
import AdminStudents from "../components/AdminStudents";
import AdminEvents from "../components/AdminEvents";

const Dashboard = () => {
  const [type, setType] = useState("");
  const [data, setData] = useState();
  const [events, setEvents] = useState();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_FETCH_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.hasOwnProperty('sid'));
        setData(data);
        if(data.hasOwnProperty('sid')){
          setType('student');
        }
        else if (data.hasOwnProperty('oid')){
          setType('organiser');
        }
        else setType('admin');        
      });
  }, []);

  useEffect(() => {
    if(!type) return;
    var base_url = process.env.REACT_APP_FETCH_URL;
    if (type === 'student' || type === 'organiser')base_url+= "/event";
    else base_url+= "/admin/events"
    fetch(base_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEvents(data)
      });
  }, [type]);

  console.log("user type is "+ type);
  const [opened, { toggle }] = useDisclosure();
  const [tab, setTab] = useState(() => {
    var prevTab = localStorage.getItem("tab") || 0;
    return parseInt(prevTab);
  });
  const [eid, setEid] = useState(() => {
    var eventId = localStorage.getItem("eid")
    return eventId
  });

  const saveTab = (tab) => {
    localStorage.setItem("tab", tab);
    setTab(tab);
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("http://10.109.10.13:8080/profile", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("access_token"),
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  if (!localStorage.getItem("access_token")) {
    // console.log("HII");
    return <Navigate to="/login" replace />;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="flex gap-4 items-center justify-between pl-4">
        <div className="flex gap-4 items-center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Logo />
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            navigate("/login");
            toast.success("Logged out");
          }}
          className="border-2 px-4 py-2 rounded-md font-semibold text-sm mr-4"
        >
          Logout
        </button>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ul className="mt-1">
          {type !== "admin" && (
            <li
              className={`flex gap-4 items-center mb-8 px-4 py-2 rounded-full cursor-pointer duration-300 ${
                tab === 0 ? "bg-blue-200 text-blue-600" : ""
              }`}
              onClick={() => {
                saveTab(0);
                toggle();
              }}
            >
              <TicketCheck className="w-6 h-6" />
              <span className="font-semibold text-md">Events</span>
            </li>
          )}
          {type !== "admin" && (
            <li
              className={`flex gap-4 items-center mb-8 px-4 py-2 rounded-full cursor-pointer duration-300 ${
                tab === 1 ? "bg-blue-200 text-blue-600" : ""
              }`}
              onClick={() => {
                saveTab(1);
                toggle();
              }}
            >
              <CalendarFold className="w-6 h-6" />
              <span className="font-semibold text-md">Schedule</span>
            </li>
          )}
          {type === "guest" && (
            <li
              className={`flex gap-4 items-center mb-8 px-4 py-2 rounded-full cursor-pointer duration-300 ${
                tab === 2 ? "bg-blue-200 text-blue-600" : ""
              }`}
              onClick={() => {
                saveTab(2);
                toggle();
              }}
            >
              <BedDouble className="w-6 h-6" />
              <span className="font-semibold text-md">
                Food and Accomodation
              </span>
            </li>
          )}
          {type !== "admin" && (
            <li
              className={`flex gap-4 items-center mb-8 px-4 py-2 rounded-full cursor-pointer duration-300 ${
                tab === 3 ? "bg-blue-200 text-blue-600" : ""
              }`}
              onClick={() => {
                saveTab(3);
                toggle();
              }}
            >
              <CircleUserRound className="w-6 h-6" />
              <span className="font-semibold text-md">Profile</span>
            </li>
          )}

          {/* admin tabs */}
          {type == "admin" && (
            <li
              className={`flex gap-4 items-center mb-8 px-4 py-2 rounded-full cursor-pointer duration-300 ${
                tab === 5 ? "bg-blue-200 text-blue-600" : ""
              }`}
              onClick={() => {
                saveTab(5);
                toggle();
              }}
            >
              <TicketCheck className="w-6 h-6" />
              <span className="font-semibold text-md">Events</span>
            </li>
          )}
          {type == "admin" && (
            <li
              className={`flex gap-4 items-center mb-8 px-4 py-2 rounded-full cursor-pointer duration-300 ${
                tab === 6 ? "bg-blue-200 text-blue-600" : ""
              }`}
              onClick={() => {
                saveTab(6);
                toggle();
              }}
            >
              <BedDouble className="w-6 h-6" />
              <span className="font-semibold text-md">Accomodations</span>
            </li>
          )}
          {type == "admin" && (
            <li
              className={`flex gap-4 items-center mb-8 px-4 py-2 rounded-full cursor-pointer duration-300 ${
                tab === 7 ? "bg-blue-200 text-blue-600" : ""
              }`}
              onClick={() => {
                saveTab(7);
                toggle();
              }}
            >
              <CircleUserRound className="w-6 h-6" />
              <span className="font-semibold text-md">Students</span>
            </li>
          )}
        </ul>
      </AppShell.Navbar>

      <AppShell.Main>
        {tab === 0 ? (
          console.log("type is "+ type),
          <Events setTab={setTab} setEid={setEid} type={type} events={events}/>
        ) : tab === 1 ? (
          <Schedule events={events}/>
        ) : tab === 2 ? (
          <Accomodation />
        ) : tab === 3 ? (
          <Profile type={type} data={data}/>
        ) : tab === 4 ? (
          <Event eid={eid} setTab={setTab} setEventsData={setEvents} />
        ) : tab === 5 ? (
          <AdminEvents />
        ) : tab === 6 ? (
          <AdminAccodomations />
        ) : tab === 7 ? (
          <AdminStudents />
        ) : null}
      </AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;
