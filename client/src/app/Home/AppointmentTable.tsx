import { DataGrid } from "@mui/x-data-grid";
import { CreateGetAppointment } from "../../types/appointment";
import getAppointmentColumn from "../../config/getAppointmentColumn";

interface AppointmentTableProps {
  appointmentData: CreateGetAppointment[];
  handleUpdate: (selectedId: string) => void;
  handleDelete: (selectedId: string) => void;
  isError: boolean;
}

const AppointmentTable = ({
  appointmentData,
  isError,
  handleUpdate,
  handleDelete,
}: AppointmentTableProps) => {
  // Column Configuration
  const appointmentColumn = getAppointmentColumn(handleUpdate, handleDelete);

  if (isError) {
    <div className="w-full h-fit overflow-auto">
      <h1 className="font-semibold text-xl text-center">
        No Appoinments Found
      </h1>
    </div>;
  }

  return (
    <div className="w-full h-fit overflow-auto">
      <h1 className="mb-2">Your Appointments</h1>
      <DataGrid
        rows={appointmentData}
        columns={appointmentColumn}
        getRowId={(row) => row.appointment_id}
        classes={{
          root: "border border-gray-300",
          columnHeader: "custom-header",
          cell: "custom-cell",
          row: "custom-hover-row",
        }}
      />
    </div>
  );
};

export default AppointmentTable;
