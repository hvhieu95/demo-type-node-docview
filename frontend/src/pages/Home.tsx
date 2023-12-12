import React, { useState, ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDocuments } from "../DocumentContext";
import { DocumentType } from "../documents";
import { useSelector, useDispatch } from "react-redux";
import { RootStateTask, useAppDispatch } from "../store";
import {
  CreateIcon,
  GridIcon,
  SearchIcon,
  SettingsIcon,
  SortIcon,
  UserIcon,
} from "../icons";
import DialogCreateTask from "../component/DialogCreateTask";
import { fetchTasks } from "../slice/taskSlice";

const Home = () => {
  const { documents } = useDocuments();
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootStateTask) => state.tasks.tasks);
  const [openCreateTasks, setOpenCreateTasks] = useState<boolean>(false);
  // hàm đóng mở form tạo task
  const handleClickOpenCreateTasks = () => {
    setOpenCreateTasks(true);
  };
  const handleCloseCreateTasks = () => {
    setOpenCreateTasks(false);
  };
// gửi yêu cầu lấy endpoint
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="home-container home-page">
      <div className="flex justify-between items-center mb-4 ">
        <div className="flex items-center space-x-4">
          <SearchIcon />
          <input
            className="flex-grow px-4 py-2 border rounded-full bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="search"
            placeholder="Search task name"
          />
        </div>
        <div className="flex items-center space-x-4 ">
          <SettingsIcon />
          <GridIcon />

          <div className="flex items-center">
            <UserIcon />
            <div className="flex flex-col ml-2">
              <span className="text-sm font-semibold">Hieuhv2</span>
              <span className="text-xs font-semibold bg-blue-500 text-white py-1 px-2 rounded-full mt-1">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-between">
        <span className="font-semibold text-xl"> Tasks</span>
        <button
          onClick={handleClickOpenCreateTasks}
          className="mb-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition"
        >
          <CreateIcon /> Create Task
        </button>
        <DialogCreateTask
          open={openCreateTasks}
          onClose={handleCloseCreateTasks}
        />
      </div>

      <div className="bg-white rounded-xl my-6">
        <table className="w-full text-sm text-left text-gray-500 border-collapse border border-slate-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
            <tr>
              <th scope="col" className="py-3 px-6 border border-slate-300 ">
                <div className="flex items-center">
                  <SortIcon /> #
                </div>
              </th>
              <th scope="col" className="py-3 px-6 border border-slate-300">
                <div className="flex items-center">
                  <SortIcon /> TASK NAME
                </div>
              </th>
              <th scope="col" className="py-3 px-6 border border-slate-300">
                <div className="flex items-center">
                  <SortIcon /> ASSIGN
                </div>
              </th>
              <th scope="col" className="py-3 px-6 border border-slate-300">
                <div className="flex items-center">
                  <SortIcon /> SCHEDULE
                </div>
              </th>
              <th scope="col" className="py-3 px-6 border border-slate-300">
                <div className="flex items-center">
                  <SortIcon /> PRIORITY
                </div>
              </th>
              <th scope="col" className="py-3 px-6 border border-slate-300">
                <div className="flex items-center">
                  <SortIcon /> STATUS
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {documents.map((doc: DocumentType, index: number) => (
              <tr key={doc.id} className="bg-white hover:bg-gray-50">
                <td className="py-3 px-6 border border-slate-300">
                  {index + 1}
                </td>
                <td className="py-3 px-6 border border-slate-300">
                  <Link
                    to={`/document/${doc.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {doc.name}
                  </Link>
                </td>
                <td className="py-3 px-6 border border-slate-300">
                  {doc.assign || "Unassigned"}
                </td>
                <td className="py-3 px-6 border border-slate-300"></td>

                <td className="py-3 px-6 border border-slate-300">
                  {/* <span className={`inline-flex text-xs leading-5 font-semibold rounded-full ${doc.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {doc.priority || "Normal"}
                  </span> */}
                </td>
                <td className="py-3 px-6 border border-slate-300">
                  <span
                    className={`inline-flex text-xs leading-5 font-semibold rounded-full ${
                      doc.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {doc.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
            {tasks.map((task, index) => (
              <tr key={task.id} className="bg-white hover:bg-gray-50">
                <td className="py-3 px-6 border border-slate-300">
                  {index + 1}
                </td>
                <td className="py-3 px-6 border border-slate-300">
                  {task.fileUrl && (
                    <Link
                      to={`/tasks-viewer/${task.fileUrl}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {task.title}
                    </Link>
                  )}
                </td>
                <td className="py-3 px-6 border border-slate-300">
                  {task.assigner}
                </td>
                <td className="py-3 px-6 border border-slate-300">
                  {task.endDate}
                </td>
                <td className="py-3 px-6 border border-slate-300">
                  {task.priority}
                </td>
                <td className="py-3 px-6 border border-slate-300">
                  <span
                    className={`inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
