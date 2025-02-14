import { useEffect, useState } from "react";
import { getUsers } from "../../../services/user.service";
import { UserCard } from "./userCard";

export const Users = () => {
  const [arrayUsers, setArrayUsers] = useState([]);
  useEffect(() => {
    getUsers().then((resp) => {
      console.log(resp);
      setArrayUsers(resp);
    });

    return () => {};
  }, []);

  return (
    <div className=" flex justify-center">
      <ul role="list" class="divide-y divide-gray-100 w-[75%]">
        {arrayUsers.map((item,index) => (
          <UserCard key={index} data={item}/>
        ))}
      </ul>
    </div>
  );
};
