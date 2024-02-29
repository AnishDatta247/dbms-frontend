import { Input, Modal, Select, Table, TextInput, Tooltip } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { Info, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
    console.log("DELETING: ", `${process.env.REACT_APP_FETCH_URL}/admin/remove_organiser/`+ oid);
    fetch(`${process.env.REACT_APP_FETCH_URL}/admin/remove_student/`+ oid, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then(() => {
        close2();
      })
      .catch((e) => {
        toast.error(e.message);
      });

  };

  const onSubmit = (values) => {
    console.log(values);

    form.validate();
    if (Object.keys(form.errors).length > 0) {
      return;
    }
    setData((prev) => [
      ...prev,
      {
        email: values.email,
        name: values.name,
        phone: values.phone,
        password: values.password,
      },
    ]);
    // console.log()/
    fetch(`${process.env.REACT_APP_FETCH_URL}/admin/add_organiser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        phone: values.phone,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        close3();
        form.reset();
        // setFrom(null);
        // setTo(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
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
            <TextInput
              label="Password"
              placeholder="Password"
              {...form.getInputProps("p assword")}
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
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Sponsered Events</Table.Th>
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
                      title="Sponsored Events"
                      opened={opened1}
                      onClose={close1}
                    >
                      {console.log("vdgrf",organiser,organiser.events_sponsored)}
                      {/* iterate on organisr.events_sponsered using loop and print */
                      
                        <div>
                         {/* make a tabe to display  */}
                          <Table striped highlightOnHover withTableBorder>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th>Event Name</Table.Th>
                              <Table.Th>Payment Status</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {organiser.events_sponsored.map((event1) => (
                            <Table.Tr key={event1.eid}>
                              <Table.Td>{event1.name}</Table.Td>
                              <Table.Td>{event1.payment_status}</Table.Td>
                            </Table.Tr>
                            ))}
                          </Table.Tbody>
                          
                        </Table>
                        </div>
                      
                      

                      }
                      </Modal>
                  <Info onClick={open1} className="w-4 h-4" />
                </Table.Td>

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
        <span>New Organiser</span>
      </button>
    </div>
  );
};

export default AdminOrganisers;
