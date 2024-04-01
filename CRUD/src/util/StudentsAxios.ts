import { useMutation, useQuery } from "@tanstack/react-query";

import axiosInstance from "./axiosInstance";
import { Users } from "./interfaces";

// get All Users
export const useGetAllUsers = () => {
  const GetUsers = () =>
    axiosInstance
      .get(`/users`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.error?.message || "Faild");
      });

  return useQuery<Users[], Error>({
    queryKey: ["GetAllUsers"],
    queryFn: GetUsers,
    onSuccess: () => console.log("successs"),
    onError: () => console.log("you have an error"),
  });
};

// Get user By Id
export const useGetUserById = (Id: string) => {
  const GetUserById = () =>
    axiosInstance
      .get(`/users/${Id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.error?.message || "Faild");
      });

  return useQuery<Users, Error>({
    queryKey: ["GetUserById"],
    queryFn: GetUserById,
    onSuccess: () => console.log("successs"),
    onError: () => console.log("you have an error"),
  });
};

// Add User

export const useAddNewUser = () => {
  const Add = async (data: Users) => {
    await axiosInstance
      .post("/users", data)
      .then((res) => console.log(res.data))
      .catch((err) => {
        throw new Error(err.response?.data?.error?.message || "Network Error");
      });
  };
  return useMutation({
    mutationKey: ["AddUser"],
    mutationFn: Add,
    onSuccess: () => console.log("successs"),
    onError: () => console.log("you have an error"),
  });
};
// update User
export const useUpdateUser = (id: string) => {
  const Update = async (data: Users) => {
    await axiosInstance
      .patch(`/users/${id}`, data)
      .then((res) => console.log(res.data))
      .catch((err) => {
        throw new Error(err.response?.data?.error?.message || "Network Error");
      });
  };
  return useMutation({
    mutationKey: ["UpdateUser"],
    mutationFn: Update,
  });
};

// delete User;
export const useDeleteUser = (Id: string) => {
  const DeleteUserById = async () => {
    await axiosInstance.delete(`/users/${Id}`).then((res) => res.data);
  };

  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: DeleteUserById,
    onSuccess: () => console.log("successs"),
    onError: () => console.log("you have an error"),
  });
};
