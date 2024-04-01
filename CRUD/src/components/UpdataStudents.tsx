import { Link, useParams } from "react-router-dom";
import { useGetUserById, useUpdateUser } from "../util/StudentsAxios";
import { useState } from "react";

const UpdataStudents = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");

  const { data: User } = useGetUserById(id as string);

  const { mutate, data: two } = useUpdateUser(id as string);
  console.log(two);

  const Hand = () => {
    mutate({
      id: 0,
      FirstName: userName,
      year: "",
      gender: gender,
      subjects: [
        {
          SubjectName: "",
          TeachersNames: "",
          DayTime: "",
        },
      ],
    });
  };
  return (
    <>
      <div>{User?.FirstName}</div>
      <div>
        <input
          type="text"
          placeholder="Update Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <select
          onChange={(e) => setGender(e.target.value)}
          name="gender"
          id="2"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button onClick={Hand}>Update</button>
        <Link
          to={"/"}
          className=" bg-blue-600 text-white px-4  py-2 rounded-md ml-2  "
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default UpdataStudents;
