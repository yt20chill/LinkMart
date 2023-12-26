import { ReactNode } from "react";
import { useControlModalContext } from "../../services/context/ControlModalContext";

type FormModalProps = {
  children: ReactNode;
};

const FormModal = ({ children }: FormModalProps) => {
  const { isShow, setIsShow } = useControlModalContext();
  return (
    isShow && (
      <div className="flex items-center justify-center inset-0 fixed select-none pointer-events-none z-40">
        <div className="flex flex-col max-w-md w-screen bg-base-100 rounded-xl shadow select-auto pointer-events-auto relative z-50">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              setIsShow(false);
            }}
          >
            ✕
          </button>
          <>{children}</>
        </div>
        <div
          className="inset-0 fixed bg-black/50 select-none  z-10 h-full has-[body]:overflow-hidden"
          onClick={() => {
            setIsShow(false);
          }}
        ></div>
      </div>
    )
  );
};

export default FormModal;
