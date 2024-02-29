import { useState, useEffect } from "react";

const Profile = ({data, type}) => {
  return (
    <div className="px-4 py-1">
      {type && <div className="flex flex-col">
        <span className="font-semibold text-3xl">Profile</span>
        <span className="text-sm font-semibold text-neutral-500">
          {`${
            type === "guest"
              ? "Guest Student"
              : type === "native"
              ? "Native Student"
              : "Organizer"
          } Profile`}
        </span>
      </div>}
      {data && <div className="flex flex-col gap-6 w-full md:max-w-[800px] mt-8">
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
        {type !== "organiser" && (
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
      </div>}
    </div>
  );
};

export default Profile;
