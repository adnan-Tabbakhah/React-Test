import { Link, useParams } from "react-router-dom";

import { useDeleteUser, useGetUserById } from "../util/StudentsAxios";

const GetUser = () => {
  const { id } = useParams();
  const { mutate } = useDeleteUser(id as string);

  const { data, isLoading } = useGetUserById(id as string);

  if (isLoading) return <div>loadin</div>;

  return (
    <>
    <div>
    <div className=" font-bold text-xl">Name : {data?.FirstName}</div>
      <div className="   font-semibold text-lg">Year : {data?.year}</div>
      <div className=" font-semibold text-lg">Gender : {data?.gender}</div>
    </div>
      <table className="table-auto   m-auto border">
        <thead className="  bg-gray-200 border flex  justify-center items-center ">
          <tr className="flex  justify-center items-center gap-16">
            <th>SubjectName</th>
            <th>Teacher Name</th>
            <th>DayTime</th>
          </tr>
        </thead>
        <tbody className=" border  ">
          {data?.subjects.map((e, i) => (
            <tr key={i} className="  border flex  justify-center items-start ">
              <td className="  m-6 ">{e.SubjectName}</td>
              <td className="  m-6">{e.TeachersNames}</td>
              <td className="  m-6">{e.DayTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/"} className=" bg-blue-600 text-white px-4  py-2 rounded-md ml-2">Back</Link>

      <button className=" flex  justify-center  my-2 mx-auto text-center rounded-md bg-red-400 text-white px-4 py-2 hover:bg-red-500" onClick={() => mutate()}>delete</button>
    </>
  );
};

export default GetUser;
