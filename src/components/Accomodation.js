import { Input, Modal, Radio, Select, Table, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

const Accomodation = () => {
  const input = {
    location: "Radhakrishnan Hall of Residence, IIT KGP",
    no_of_days: 3,
    from: "2021-10-01",
    to: "2021-10-03",
    food_type: "veg",
    payment_amount: 2000,
  };

  const [data, setData] = useState(input);
  const [opened, { open, close }] = useDisclosure(false);

  const dateTimeFormatter = (dateTime) => {
    return format(dateTime, "dd MMM yyyy");
  };

  const onSubmit = () => {
    close();
  };

  return (
    <div className="px-4 py-1">
      <div className="flex flex-col">
        <span className="font-semibold text-3xl">Food and Accomodation</span>
        <span className="text-sm font-semibold text-neutral-500">
          Choose preferred food type
        </span>
      </div>
      <div className="flex flex-col gap-6 w-full md:max-w-[800px] mt-8">
        <div className="flex gap-4 items-center">
          <span className="font-semibold  w-[170px]">Location</span>
          <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
            {data.location}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-semibold w-[170px]">Staying From</span>
          <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
            {dateTimeFormatter(data.from)}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-semibold w-[170px]">To</span>
          <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
            {dateTimeFormatter(data.to)}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="font-semibold w-[170px] flex gap-2 items-center">
            <span>Food Type</span>
            <Tooltip
              label={
                <div>
                  <p>You can only choose food type once.</p>
                  <p>Veg price: 2300, Non-veg price: 2600</p>
                  <p>(including accomodation)</p>
                </div>
              }
            >
              <Info className="w-4 h-4 text-neutral-500 mt-1" />
            </Tooltip>
          </div>
          <div className="flex gap-4 w-full">
            <Radio
              onChange={() => {
                if (input.food_type === "none") {
                  setData({
                    ...data,
                    food_type: "non-veg",
                    payment_amount: 2600,
                  });
                }
              }}
              disabled={
                input.food_type !== "none" && input.food_type !== "non-veg"
              }
              checked={data.food_type === "non-veg"}
              label="Non-veg"
              value="non-veg"
            />
            <Radio
              onChange={() => {
                if (input.food_type === "none") {
                  setData({
                    ...data,
                    food_type: "veg",
                    payment_amount: 2300,
                  });
                }
              }}
              disabled={input.food_type !== "none" && input.food_type !== "veg"}
              checked={data.food_type === "veg"}
              label="Veg"
              value="veg"
            />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <span className="font-semibold w-[170px]">Payment</span>
          <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
            {data.payment_amount}
          </div>
        </div>
      </div>
      {input.food_type === "none" && (
        <button
          className="bg-blue-500 px-4 py-2 rounded-md text-white
        font-semibold text-sm mt-6"
          onClick={open}
        >
          Confirm
        </button>
      )}

      <Modal
        centered
        opened={opened}
        onClose={close}
        title="You cannot edit the changes later. Are you sure?"
      >
        <button
          className="bg-blue-500 px-4 py-2 rounded-md text-white
        font-semibold text-sm"
          onClick={onSubmit}
        >
          Confirm
        </button>
      </Modal>
    </div>
  );
};

export default Accomodation;
