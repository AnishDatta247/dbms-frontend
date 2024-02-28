import { Modal, Pill } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { useState } from "react";

const Event = (props) => {
  const input = {
    id: 1,
    name: "Overnite",
    start_date_time: "2021-10-01 18:00:00",
    end_date_time: "2021-10-02 07:00:00",
    type: "competition",
    location: "Computer Informatics Center",
    first_prize: 30000,
    second_prize: 20000,
    third_prize: 10000,
    registered: false,
    sponsored: false,
    volunteered: false,
  };

  const [data, setData] = useState(input);
  const [opened1, { open: open1, close: close1 }] = useDisclosure();
  const [opened2, { open: open2, close: close2 }] = useDisclosure();
  const [opened3, { open: open3, close: close3 }] = useDisclosure();

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "do MMM yyyy, h:mm a");
  };

  const onClick1 = () => {
    // Register
    close1();
  };
  const onClick2 = () => {
    // Volunteer
    close2();
  };
  const onClick3 = () => {
    // Sponsor
    close3();
  };

  return (
    <div>
      <button
        className="pr-4 pl-3 py-2 rounded-md border-2 font-semibold text-sm mt-2 flex gap-1 items-center"
        onClick={() => {
          props.setTab(0);
          localStorage.setItem("tab", 0);
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center mt-4 mb-6">
          <div className="text-3xl font-semibold">{data.name}</div>
          <Pill className="font-semibold capitalize">{data.type}</Pill>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col mr-8">
            <span className="text-sm font-semibold">From</span>
            <span>{dateTimeFormatter(data.start_date_time)}</span>
          </div>
          <div className="flex flex-col mr-8">
            <span className="text-sm font-semibold">To</span>
            <span>{dateTimeFormatter(data.end_date_time)}</span>
          </div>
          <div className="flex flex-col mr-8">
            <span className="text-sm font-semibold">Location</span>
            <span>{data.location}</span>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          {"registered" in data &&
            (!data.registered ? (
              <div>
                <Modal
                  centered
                  opened={opened1}
                  onClose={close1}
                  title="Confirm"
                >
                  Are you sure you want to register for:
                  <p className="font-medium">
                    {" " + data.name} {"(" + data.type + ")"}
                  </p>
                  <button
                    onClick={onClick1}
                    className="mt-4 bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm"
                  >
                    Confirm
                  </button>
                </Modal>
                <button
                  onClick={open1}
                  className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="border px-4 py-2 rounded-md text-neutral-500 font-semibold text-sm">
                Already Registered
              </div>
            ))}
          {"volunteered" in data &&
            (!data.volunteered ? (
              <div>
                <Modal
                  centered
                  opened={opened2}
                  onClose={close2}
                  title="Confirm"
                >
                  Are you sure you want to volunteer for:
                  <p className="font-medium">
                    {" " + data.name} {"(" + data.type + ")"}
                  </p>
                  <button
                    onClick={onClick2}
                    className="mt-4 bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm"
                  >
                    Confirm
                  </button>
                </Modal>
                <button
                  onClick={open2}
                  className=" border border-blue-500 px-4 py-2 rounded-md text-blue-500 font-semibold text-sm"
                >
                  Volunteer
                </button>
              </div>
            ) : (
              <div className=" border px-4 py-2 rounded-md text-neutral-500 font-semibold text-sm">
                Already Volunteered
              </div>
            ))}
          {"sponsored" in data &&
            (!data.sponsored ? (
              <div>
                <Modal
                  centered
                  opened={opened3}
                  onClose={close3}
                  title="Sponsor"
                >
                  Are you sure you want to sponsor:
                  <p className="font-medium">
                    {" " + data.name} {"(" + data.type + ")"}
                  </p>
                  <button
                    onClick={onClick3}
                    className="mt-4 bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm"
                  >
                    Confirm
                  </button>
                </Modal>
                <button
                  onClick={open3}
                  className="border border-green-500 px-4 py-2 rounded-md text-green-500 font-semibold text-sm"
                >
                  Sponsor
                </button>
              </div>
            ) : (
              <div className=" border px-4 py-2 rounded-md text-neutral-500 font-semibold text-sm">
                Already Sponsored
              </div>
            ))}
        </div>
        <div className="flex flex-col mt-4 gap-1">
          <span className="text-sm font-semibold">Prizes</span>
          <div className="flex gap-4">
            <span className="bg-yellow-500 px-2 py-1 text-sm rounded-full text-white font-semibold">
              1st: <IndianRupee className="inline w-4 h-4 ml-1 mb-0.5" />
              {data.first_prize}
            </span>
            <span className="bg-neutral-300 px-2 py-1 text-sm rounded-full text-neutral-500 font-semibold">
              2nd: <IndianRupee className="inline w-4 h-4 ml-1 mb-0.5" />
              {data.second_prize}
            </span>
            <span className="bg-[#b08d57] px-2 py-1 text-sm rounded-full text-white font-semibold">
              3rd: <IndianRupee className="inline w-4 h-4 ml-1 mb-0.5" />
              {data.first_prize}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
