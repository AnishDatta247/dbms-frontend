import { Modal, Pill, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

  const [data, setData] = useState();
  const [opened1, { open: open1, close: close1 }] = useDisclosure();
  const [opened2, { open: open2, close: close2 }] = useDisclosure();
  const [opened3, { open: open3, close: close3 }] = useDisclosure();

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "do MMM yyyy, h:mm a");
  };

  const form = useForm({
    initialValues: {
      role: "",
    },
    validate: {
      role: (value) => (value.length > 0 ? null : "Role required"),
    },
  });

  const onClick1 = () => {
    //register
    let status;
    fetch(
      `${process.env.REACT_APP_FETCH_URL}/event/register_student/${props.eid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    )
      .then((response) => {
        status = response.status;
        response.json();
      })
      .then((data) => {
        if (status !== 200) {
          toast.error(data.message);
        } else {
          setData((prev) => {
            return { ...prev, registered: true };
          });
          // props.setEventsData(prev => (
          //   prev.map(event => {
          //     if(event.eid!==data.eid) return event;
          //     else return {...event, registered: true}
          //   })
          // ))
          toast.success("Registered for event!");
        }
      })
      .catch((e) => toast.error(e.message));
    close1();
  };

  const onClick2 = () => {
    //volunteer
    let status;
    fetch(
      `${process.env.REACT_APP_FETCH_URL}/event/volunteer_student/${props.eid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          role: form.values.role,
          info: getRoleInfo(form.values.role),
        }),
      }
    )
      .then((response) => {
        status = response.status;
        response.json();
      })
      .then((data) => {
        if (status !== 200) {
          toast.error(data.message);
        } else {
          setData((prev) => {
            return { ...prev, volunteered: true };
          });
          // props.setEventsData(prev => (
          //   prev.map(event => {
          //     if(event.eid!==data.eid) return event;
          //     else return {...event, registered: true}
          //   })
          // ))
          toast.success("Volunteering for event!");
        }
      })
      .catch((e) => toast.error(e.message));
    close2();
  };
  const onClick3 = () => {
    // Sponsor
    close3();
  };

  const getRoleInfo = (role) => {
    if (role === "Operations Manager")
      return "Operations Manager is responsible for the overall operations of the event. They are responsible for the smooth functioning of the event.";
    else if (role === "Logistics Coordinator")
      return "Logistics Coordinator is responsible for the logistics of the event. They are responsible for the transportation and storage of the event materials.";
    return "-";
  };

  useEffect(() => {
    if (!props.eid) return;

    fetch(`${process.env.REACT_APP_FETCH_URL}/event/${props.eid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, [props.eid]);

  return (
    <div className="ml-4">
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
      {data && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center mt-4 mb-6">
            <div className="text-3xl font-semibold">{data.name}</div>
            <Pill className="font-semibold capitalize">{data.type}</Pill>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col mr-8">
              <span className="text-sm font-semibold">From</span>
              <span>{data.start_date_time}</span>
            </div>
            <div className="flex flex-col mr-8">
              <span className="text-sm font-semibold">To</span>
              <span>{data.end_date_time}</span>
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
                    onClick={() => {
                      if (data.volunteered)
                        toast.error("You are a volunteer, cannot register!");
                      else open1();
                    }}
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
                    <form
                      onSubmit={form.onSubmit((values) => onClick2(values))}
                    >
                      <Select
                        label="Role"
                        placeholder="Select volunteer role"
                        data={[
                          {
                            value: "Operations Manager",
                            label: "Operations Manager",
                          },
                          {
                            value: "Logistics Coordinator",
                            label: "Logistics Coordinator",
                          },
                        ]}
                        {...form.getInputProps("role")}
                      />
                      <div className="flex flex-col my-4">
                        <span className="text-sm">Info</span>
                        <span className="bg-neutral-300 rounded-md px-3 py-2 text-sm">
                          {getRoleInfo(form.values.role)}
                        </span>
                      </div>
                      <button
                        action="submit"
                        className="mt-4 bg-blue-500 px-4 py-2 rounded-md text-white font-semibold text-sm"
                      >
                        Confirm
                      </button>
                    </form>
                  </Modal>
                  <button
                    onClick={() => {
                      if (data.registered)
                        toast.error("You are registered, cannot volunteer!");
                      else open2();
                    }}
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
          {data.first_prize && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default Event;
