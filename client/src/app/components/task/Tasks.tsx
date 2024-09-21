import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { MdDelete, MdEdit } from "react-icons/md";

const Tasks = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex md:flex-row items-center mb-5">
        <Input
          type="text"
          placeholder="+ Add Task to"
          className="flex-1 mr-6 mt-2 md:mt-0 md:mr-5 text-black mb-2 md:mb-0"
        />
        <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 ">
          Add Task
        </Button>
      </div>
      <div className="pt-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5">
          Tasks
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table text-black">
          <thead>
            <tr className="text-base font-bold text-black border-gray-300">
              <th></th>
              <th>Task</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {[1].map((item , index) => (
            <tbody key={index}>
              <tr className="border-gray-300">
                <th>
                  <label>
                    <Checkbox />
                  </label>
                </th>
                <td>
                  <input
                    type="text"
                    value={"jghuggjhghghghghghghghggdsfffff"}
                    className="w-full bg-white text-black outline-none"
                    readOnly
                  />
                </td>
                <td>10-11-2024</td>
                <td>
                  <button className="text-blue-500">
                    <MdEdit size={22} />   
                  </button>
                  <button className="text-red-500 ml-2">
                    <MdDelete size={22} />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Tasks;
