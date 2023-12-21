type ErrorMessageProps = {
  message: string;
};
function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mt-2">
      <div
        role="alert"
        className="px-2  gap-2 text-red-500 border border-red-500 pe-8 flex items-center rounded-badge text-sm overflow-hidden bg-red-100/80 backdrop-blur-lg"
      >
        <i className="bi bi-x text-xl max-h-8"></i>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default ErrorMessage;
