import AddEmployeeForm from "@/components/AddEmployeeForm";
const AddEmployee = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      {params.id ? <h1>Update Employee</h1> : <h1>Add New Employee</h1>}
      <AddEmployeeForm id={params.id} />
    </div>
  );
};
export default AddEmployee;
