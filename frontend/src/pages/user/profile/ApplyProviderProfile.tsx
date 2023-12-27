import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { SweetAlertOptions } from "sweetalert2";
import FormModal from "../../../components/modal/FormModal";
import CancelButton from "../../../components/ui/CancelButton";
import { FormLayout } from "../../../components/ui/FormLayout";
import Table from "../../../components/ui/Table";
import ApplyProviderForm from "../../../features/forms/ApplyProviderForm";
import SkeletonForm from "../../../features/forms/SkeletonForm";
import { fireAlert } from "../../../lib/formUtils";
import { ApplicationStatus } from "../../../schemas/responseSchema";
import {
  abortApplicationAJAX,
  getProviderApplicationStatusAJAX,
} from "../../../services/api/providerApi";
import { ControlModalContext } from "../../../services/context/ControlModalContext";
import { queryKey } from "../../../services/query.config";

const ApplyProviderProfile = () => {
  const { data: status, isLoading } = useQuery({
    queryKey: [queryKey.AUTH, "providerApplication"],
    queryFn: getProviderApplicationStatusAJAX,
  });
  const [showToS, setShowToS] = useState(false);
  if (isLoading) return <SkeletonForm />;
  if (status?.data === null)
    return (
      <>
        <FormLayout title="Become Provider" bootstrapIcon="bi-check2-circle">
          <ApplyProviderForm />
        </FormLayout>
        <div className="text-center mb-6">
          <span
            className="text-primary-400 hover:text-primary-500 cursor-pointer me-2 text-normal"
            onClick={(e) => {
              e.preventDefault();
              setShowToS(true);
            }}
          >
            Terms of Service
          </span>
          Applies
        </div>
        <ControlModalContext.Provider
          value={{ isShow: showToS, setIsShow: setShowToS }}
        >
          <FormModal>
            <div className="px-12 py-6">
              <h2>Terms of Service</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptatibus, voluptatum, dolorum, quia quod quos voluptate
                voluptatem quibusdam voluptates quae doloribus
              </p>
            </div>
          </FormModal>
        </ControlModalContext.Provider>
      </>
    );
  return status && status.data && <PendingApproval {...status.data} />;
};

export default ApplyProviderProfile;

const sweetAlertOptions: SweetAlertOptions = {
  icon: "warning",
  title: "Abort Application",
  text: "Are you sure you want to abort your application?",
  confirmButtonText: "Yes, abort it!",
  showCancelButton: true,
  cancelButtonText: "No, keep it!",
};
const PendingApproval = (data: ApplicationStatus) => {
  const queryClient = useQueryClient();
  const { mutateAsync: abortApplication, isLoading } = useMutation({
    mutationFn: abortApplicationAJAX,
    onSuccess: async () => {
      toast.success("Application aborted");
      await queryClient.invalidateQueries();
    },
  });
  const onConfirmed = async () => {
    await abortApplication();
  };
  return (
    <div>
      <h2 className="text-xl inline-flex gap-2 text-primary-400 font-bold p-6 pb-3 border-b border-primary-400 shadow-3xl w-full">
        <i className="bi bi-person-lines-fill"></i>Provider Validation
      </h2>
      <div className="pt-6 px-6 inline-flex">
        <i className="bi bi-file-earmark-person text-7xl me-2 text-primary-400"></i>
        <div className="flex flex-col">
          <div className="text-lg">Your Submission</div>
          <span className="text-sm text-gray-400">Validation Status</span>
          <span className="text-center uppercase px-2 bg-gray-400 text-white rounded-full">
            {data.statusName}
          </span>
        </div>
      </div>
      <div className="py-6 px-6">
        <ul className="flex flex-col gap-2 mb-3">
          <li className="flex justify-between bg-base-100 p-3 rounded-lg shadow">
            Proof of Address
            <a
              href={data.addressDocument}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-800"
            >
              <i className="bi bi-file-earmark-arrow-down me-1"></i>View
            </a>
          </li>

          <li className="flex justify-between bg-base-100 p-3 rounded-lg shadow">
            ID Verification
            <a
              href={data.idDocument}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-800"
            >
              <i className="bi bi-file-earmark-arrow-down me-1"></i>View
            </a>
          </li>
          <li className="flex justify-between bg-base-100 p-3 rounded-lg shadow">
            Bank Information
            <a
              href={data.bankDocument}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-800"
            >
              <i className="bi bi-file-earmark-arrow-down me-1"></i>
              View
            </a>
          </li>
        </ul>
        <div className="flex justify-end">
          <CancelButton
            label="Abort"
            onClick={fireAlert({
              options: sweetAlertOptions,
              onConfirmed: onConfirmed,
            })}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
