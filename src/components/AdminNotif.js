import { useEffect, useState } from "react";

const AdminNotif = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FETCH_URL}/admin/notifs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        console.log(resData);
      });
  }, []);

  return (
    <div className="px-4 py-1 flex flex-col gap-6">
      <div className="flex justify-start gap-4 items-center">
        <span className="font-semibold text-3xl">Notifications</span>
      </div>
      {data?.map((notif) => (
        <div className="px-4 py-2 rounded-md shadow-lg border flex gap-2 items-center flex-wrap">
          <div className="flex flex-col w-fit">
            <span className="text-md font-semibold">{notif.oname}</span>
            <span className="text-xs font-semibold text-neutral-500">
              {notif.email}
            </span>
          </div>
          wants to sponsor
          <span className="font-semibold">{notif.ename}</span>
          with amount 
          <span></span>
        </div>
      ))}
    </div>
  );
};
export default AdminNotif;
