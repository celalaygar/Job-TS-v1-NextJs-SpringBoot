import React from "react";
import { Alert } from "@mui/material";
import Link from "next/link";
import { Task } from "@/data/tasks";

type MainFrameProps = {
  tasks: Task[] | undefined;
  title: string;
};

const TaskListPage: React.FC<MainFrameProps> = ({ tasks, title }) => {

  return (
    <>
      <div className="bg-white rounded-lg py-1">
        <div className="flex p-2 my-2 text-center text-lg sm:text-xl font-bold">
          {title}
        </div>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id}
              className={`shadow-md border border-1 rounded-lg p-2 hover:bg-gray-100 transition duration-200 w-full flex flex-col sm:flex-row sm:items-center justify-between mb-4`}
            >
              <h5 className="text-md font-bold w-full sm:w-1/4">{task.taskNumber}</h5>
              <div className="w-full sm:w-2/4 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
                <p>
                  <strong>Title:</strong> {task.title}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
              </div>
              <div className=" flex flex-col md:flex-row md:justify-between md:items-center">
                <button className="bg-blue-500/15  hover:bg-blue-500/25  text-black px-4 py-2 text-sm mt-2 rounded-md ">
                  <Link href={`/tasks/${task.id}`}>
                    Show
                  </Link>
                </button>
              </div>

            </div>
          ))
        ) : (
          <Alert severity="info">No tasks found</Alert>
        )}
      </div>
    </>
  );
};

export default TaskListPage;
