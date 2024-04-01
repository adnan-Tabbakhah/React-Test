import { Link, useNavigate } from "react-router-dom";
import { useGetAllUsers } from "../util/StudentsAxios";
import axiosInstance from "../util/axiosInstance";

const AllStudents = () => {
  const { data } = useGetAllUsers();
  const Nav = useNavigate();

  const Delete = async (id: number) => {
    const message = window.confirm("Delete User?");
    if (message) {
      await axiosInstance
        .delete(`users/${id}`)
        .then(() => {
          window.location.reload();
        })
        .finally(() => console.log("succuess"));
    }
  };

  return (
    <div>
      <Link
        to={"/AddStdent"}
        className="w-[150px] flex  justify-center items-center px-4 py-2 rounded-md bg-green-400  my-4 mx-auto text-white hover:bg-green-500 transition-all text-center"
      >
        Add Student
      </Link>
      <table className="table-auto   m-auto border">
        <thead className="  bg-gray-200 ">
          <tr>
            <th className=" border m-4">ID</th>
            <th>First Name</th>
            <th>gender</th>
            <th>year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className=" border">
          {data?.map((e, i) => (
            <tr key={i} className="border ">
              <td className="  m-4">{e.id}</td>
              <td className="  m-4">{e.FirstName}</td>
              <td className="  m-4">{e.gender}</td>
              <td className="  m-4">{e.year}</td>
              <td className=" flex flex-row gap-4 m-4">
                <button onClick={() => Nav(`GetUser/${e.id}`)}>get</button>
                <button onClick={() => Nav(`/UpdateStudent/${e.id}`)}>
                  update
                </button>
                <button onClick={() => Delete(e.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudents;
