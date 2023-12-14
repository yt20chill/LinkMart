type ErrorFallBackProps = {
	error: Error;
	resetErrorBoundary: () => void;
};

const logError = (error: Error) => {
	console.error(error);
};

// TODO: Finished it
function ErrorFallBack({ error, resetErrorBoundary }: ErrorFallBackProps) {
	logError(error);
	resetErrorBoundary();
	return <div>Something Went Wrong!!!!!!</div>;
}

export default ErrorFallBack;
