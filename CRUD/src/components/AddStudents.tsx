import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { StringPattern } from "../util/Regex";
import { useAddNewUser } from "../util/StudentsAxios";
import axiosInstance from "../util/axiosInstance";
import { Link } from "react-router-dom";

interface Subject {
  SubjectName: string;
  TeachersNames: string;
  DayTime: string;
}

interface FormData {
  id: string;
  FirstName: string;
  year: string;
  gender: string;
  subjects: Subject[];
}
interface subject {
  SubjectName: string;
  id: string;
  TeachersNames: [
    {
      TeacherName: string;
      DayTime: [];
    }
  ];
}
const AddStudents = () => {
  const [newUser, setNewUser] = useState<FormData>({
    id: "",
    FirstName: "",
    year: "",
    gender: "",
    subjects: [
      {
        SubjectName: "",
        TeachersNames: "",
        DayTime: "",
      },
    ],
  });
  const [select, setSelect] = useState("");

  const { handleSubmit, register } = useForm<FormData>();

  const { mutate } = useAddNewUser();

  const onSubmit = async () => {
    mutate({
      id: Math.floor(Math.random() * 1000),
      FirstName: newUser.FirstName,
      year: select,
      gender: newUser.gender,
      subjects: newUser.subjects,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubjectChange = (
    index: number,
    key: keyof Subject,
    value: string
  ) => {
    setNewUser((prevData) => ({
      ...prevData,
      subjects: prevData.subjects.map((subject, i) =>
        i === index ? { ...subject, [key]: value } : subject
      ),
    }));
  };

  const [se, setSe] = useState<subject[]>([]);

  const [disable, setDisable] = useState(true);

  const addSubject = () => {
    if (newUser.subjects.length < se.map((e) => e.SubjectName).length) {
      setDisable(true);
      setNewUser((prevData) => ({
        ...prevData,
        subjects: [
          ...prevData.subjects,
          { SubjectName: "", TeachersNames: "", DayTime: "" },
        ],
      }));
    } else {
      setDisable(false);
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/${select || "PharmacySubjectsListFirstYear"}`)
      .then((res) => setSe(res.data));
  }, [newUser.year, select]);

  return (
    <div>
      <h1 className=" my-6 m-auto text-2xl self-center text-center">
        Add User
      </h1>
      <form
        className=" w-[290px] sm:w-auto flex flex-col justify-center items-center m-auto gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          variant="outlined"
          className="  md:w-2/5  w-[300px] lg:w-2/5 Label"
        >
          <TextField
            type="text"
            label="First Name"
            placeholder="First Name"
            {...register("FirstName", {
              required: " * required",
              pattern: {
                value: StringPattern,
                message: `pattern is not valid`,
              },
            })}
            value={newUser.FirstName}
            onChange={handleInputChange}
          />
        </FormControl>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={newUser.gender === "male"}
              onChange={handleInputChange}
            />
            Male
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={newUser.gender === "female"}
              onChange={handleInputChange}
            />
            Female
          </label>
        </div>
        <FormControl
          variant="outlined"
          className="  md:w-2/5  w-[300px] lg:w-2/5 Label"
        >
          <FormControl className="  md:w-full  w-[300px] lg:w-2/5 Label">
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Year"
              {...register("year", {
                required: " * required",
              })}
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <MenuItem value={"PharmacySubjectsListFirstYear"}>
                First year
              </MenuItem>
              <MenuItem value={"PharmacySubjectsListSecondYear"}>
                Second Year
              </MenuItem>
              <MenuItem value={"PharmacySubjectsThirdSecondYear"}>
                Third year
              </MenuItem>
            </Select>
          </FormControl>
        </FormControl>

        {newUser.subjects.map((subject, index) => (
          <div
            key={index}
            className=" container flex gap-4 m-auto justify-center items-center"
          >
            <FormControl>
              <InputLabel id="TeacherName">TeacherName</InputLabel>
              <Select
                id="TeacherName"
                {...register("subjects", {
                  required: "* reqireed",
                })}
                onChange={(e) =>
                  handleSubjectChange(index, "TeachersNames", e.target.value)
                }
                value={subject.TeachersNames}
                className=" w-[250px]"
                type="text"
                label="Subject Name"
              >
                {se?.map((e, i) => (
                  <MenuItem key={i} value={e.TeachersNames[0].TeacherName}>
                    {e.TeachersNames[0].TeacherName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="SubjectName">SubjectName</InputLabel>
              <Select
                id="SubjectName"
                {...register("subjects", {
                  required: "* reqireed",
                })}
                onChange={(e) =>
                  handleSubjectChange(index, "SubjectName", e.target.value)
                }
                value={subject.SubjectName}
                className=" w-[250px]"
                type="text"
                label="Subject Name"
              >
                {se?.map((e, i) => (
                  <MenuItem key={i} value={e.SubjectName}>
                    {e.SubjectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="DayTime">Day Time</InputLabel>
              <Select
                id="DayTime"
                className=" w-[250px]"
                {...register("subjects", {
                  required: "* reqireed",
                })}
                value={subject.DayTime}
                onChange={(e) =>
                  handleSubjectChange(index, "DayTime", e.target.value)
                }
                type="text"
                label="DayTime"
              >
                {se
                  ?.filter(
                    (e) =>
                      e.TeachersNames[0].TeacherName === subject.TeachersNames
                  )
                  .map((e, i) =>
                    e.TeachersNames[0].DayTime.map((e) => (
                      <MenuItem key={i} value={e}>
                        {e}
                      </MenuItem>
                    ))
                  )}
              </Select>
            </FormControl>
          </div>
        ))}
        <Button
          variant="contained"
          className=" w-[140px]"
          type="button"
          onClick={addSubject}
          disabled={disable ? false : true}
        >
          {disable ? "Add Subject" : "Disable"}{" "}
        </Button>
        <Button className=" w-[140px]" variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <Link
        to={"/"}
        className=" bg-blue-600 text-white px-4  py-2 rounded-md ml-2"
      >
        Back
      </Link>
    </div>
  );
};

export default AddStudents;
