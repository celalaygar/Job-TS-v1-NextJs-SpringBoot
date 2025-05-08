// components/UserDetailsDialog.tsx
import { Dialog } from "@mui/material";
import { ProjectUser } from "@/data/project";
import Moment from "../Moment";

type UserDetailsDialogProps = {
  open: boolean;
  onClose: () => void;
  selectedUser: ProjectUser | null;
};

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ open, onClose, selectedUser }) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <div className="py-6 px-4 w-full max-w-lg mx-auto">
        <h3 className="text-xl font-bold mb-4 text-center">{selectedUser?.email} Informatıon</h3>
        <div className="w-full p-4">
          {selectedUser ? (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedUser.firstname} {selectedUser.lastname}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Birth City:</strong> {selectedUser.birthcity}
              </p>
              <p>
                <strong>Birth Date:</strong> <Moment date={selectedUser.birthdate} />
              </p>
              <h5 className="text-md font-bold mb-4 text-center">Premium</h5>
              <p>
                <strong>Premium Type:</strong> {selectedUser.premium?.premiumType || "None"}
              </p>
              <p>
                <strong>Start Date:</strong> <Moment date={selectedUser.premium?.startDate} />
              </p>
              <p>
                <strong>End Date:</strong> <Moment date={selectedUser.premium?.endDate} />
              </p>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-end mt-5 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default UserDetailsDialog;
