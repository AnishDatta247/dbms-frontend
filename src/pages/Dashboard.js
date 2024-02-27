import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../components/Logo";
import {
  BedDouble,
  CalendarFold,
  CircleUserRound,
  TicketCheck,
} from "lucide-react";
import { useState } from "react";
import Schedule from "../components/Schedule";
import Accomodation from "../components/Accomodation";
import Events from "../components/Events"
import Profile from "../components/Profile";

const Dashboard = () => {
  const type = "native";

  const [opened, { toggle }] = useDisclosure();
  const [tab, setTab] = useState(() => {
    var prevTab = localStorage.getItem("tab") || 0;
    return parseInt(prevTab);
  });

  const saveTab = (tab) => {
    localStorage.setItem("tab", tab);
    setTab(tab);
  };

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
      <AppShell.Header className="flex gap-4 items-center pl-4">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Logo />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ul className="mt-1">
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
        </ul>
      </AppShell.Navbar>

      <AppShell.Main>
        {tab === 0 ? (
          <Events />
        ) : tab === 1 ? (
          <Schedule />
        ) : tab === 2 ? (
          <Accomodation />
        ) : (
          <Profile type={type} />
        )}
      </AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;
