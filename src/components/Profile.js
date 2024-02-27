import { useState } from "react";

const Profile = (props) => {
  const input = {
    sid: 123,
    email: "johndoe56@gmail.com",
    name: "John Doe",
    phone: "1234567890",
    roll_number: "21CS30006",
    college: "IIT Kanpur",
    department: "ECE",
    year: "1st",
  };

  // const input = {
  //   oid: 123,
  //   email: "johndoe56@gmail.com",
  //   name: "John Doe",
  //   phone: "1234567890",
  // };

  const [data, setData] = useState(input);

  return (
    <div className="px-4 py-1">
      <div className="flex flex-col">
        <span className="font-semibold text-3xl">Profile</span>
        <span className="text-sm font-semibold text-neutral-500">
          {`${
            props.type === "guest"
              ? "Guest Student"
              : props.type === "native"
              ? "Native Student"
              : "Organizer"
          } Profile`}
        </span>
      </div>
      <div className="flex flex-col gap-6 w-full md:max-w-[800px] mt-8">
        <div className="flex gap-4 items-center">
          <span className="font-semibold  w-[170px]">{`${
            props.type === "organizer" ? "Organizer" : "Student"
          } ID`}</span>
          <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
            {data.sid}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-semibold w-[170px]">Name</span>
          <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
            {data.name}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-semibold w-[170px]">Email</span>
          <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
            {data.email}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-semibold w-[170px]">Phone</span>
          <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
            {data.phone}
          </div>
        </div>
        {props.type !== "organizer" && (
          <div className="flex flex-col gap-6">
            <hr />
            <div className="flex gap-4 items-center">
              <span className="font-semibold w-[170px]">Roll Number</span>
              <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
                {data.roll_number}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-semibold w-[170px]">College</span>
              <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
                {data.college}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-semibold w-[170px]">Department</span>
              <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
                {data.department}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-semibold w-[170px]">Year</span>
              <div className="px-5 py-3 border border-neutral-300 rounded-lg text-sm w-full">
                {data.year}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
