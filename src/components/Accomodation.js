import { Input, Modal, Radio, Select, Table, Tooltip } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

const Accomodation = () => {
  const input = {
    location: "SAM Guest House",
    no_of_days: 3,
    food_type: "veg",
    payment_amount: 2000,
  };

  const [data, setData] = useState();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");

  const [payment, setPayment] = useState(0);

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "dd MMM yyyy");
  };

  const dateString = (dateTime) => {
    return format(dateTime, "yyyy-MM-dd");
  };

  const paymentCalc = () => {
    let payment = 0;
    let total_time = to - from;
    let no_of_days = Math.ceil(total_time / (1000 * 3600 * 24));
    payment += no_of_days * 500;

    if (form.values.food_type === "veg") {
      payment += no_of_days * 100;
    } else {
      payment += no_of_days * 200;
    }

    return payment;
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
      console.log("SUCCESS", {
        ...values,
        from: dateString(from),
        to: dateString(to),
        payment: paymentCalc(),
      });
    }
  };

  const form = useForm({
    initialValues: {
      location: "",
      food_type: "",
    },
    validate: {
      location: (value) => (value?.length > 0 ? null : "Location is required"),
      food_type: (value) =>
        value?.length > 0 ? null : "Food type is required",
    },
  });

  // useEffect(() => {
  //   if (form.values.from.length > 0 && form.values.to.length > 0) {
  //     setPayment(paymentCalc(data));
  //   }
  // }, [form.values.from, form.values.to]);

  return (
    <div className="px-4 py-1">
      <div className="flex flex-col">
        <span className="font-semibold text-3xl">Food and Accomodation</span>
        <span className="text-sm font-semibold text-neutral-500">
          Choose food and accomodation details
        </span>
      </div>
      {data && (
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-sm font-medium">Location</span>
            <div className="bg-neutral-200 px-4 py-2 rounded-md">
              {data.location}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">From</span>
            <div className="bg-neutral-200 px-4 py-2 rounded-md">
              {dateTimeFormatter(data.from)}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">To</span>
            <div className="bg-neutral-200 px-4 py-2 rounded-md">
              {dateTimeFormatter(data.to)}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">Food Type</span>
            <div className="bg-neutral-200 px-4 py-2 rounded-md">
              {data.food_type}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">Payment</span>
            <div className="bg-neutral-200 px-4 py-2 rounded-md">
              {data.payment_amount}
            </div>
          </div>
        </div>
      )}
      {!data && (
        <form
          onSubmit={form.onSubmit((values) => onSubmit(values))}
          className="flex flex-col gap-4"
        >
          <Select
            mt="md"
            clearable={false}
            label="Location"
            placeholder="Select location of residence"
            data={[
              {
                label: "New Technology Guest House",
                value: "New Technology Guest House",
              },
              { label: "Alumni Guest House", value: "Alumni Guest House" },
              { label: "SAM Guest House", value: "SAM Guest House" },
            ]}
            {...form.getInputProps("location")}
          />

          <div>
            <DateInput
              label="From"
              placeholder="Staying from"
              value={from}
              onChange={setFrom}
              error={fromError.length !== 0}
            />
            <span className="text-xs text-red-500">{fromError}</span>
          </div>

          <div>
            <DateInput
              label="To"
              placeholder="Staying till"
              value={to}
              onChange={setTo}
              error={toError.length !== 0}
            />
            <span className="text-xs text-red-500">{toError}</span>
          </div>

          <Select
            mt="md"
            label="Food type"
            placeholder="veg or non-veg"
            data={[
              {
                label: "Veg",
                value: "veg",
              },
              { label: "Non-veg", value: "non-veg" },
            ]}
            {...form.getInputProps("food_type")}
          />
          <div>
            <span className="text-sm font-medium">Payment</span>
            <div className="bg-neutral-200 px-4 py-2 rounded-md">{payment}</div>
          </div>
          <button
            className="mt-4 w-fit bg-blue-500 px-4 py-2 rounded-md text-white
            font-semibold text-sm"
            onClick={onSubmit}
          >
            Confirm
          </button>
        </form>
      )}
    </div>
  );
};

export default Accomodation;
