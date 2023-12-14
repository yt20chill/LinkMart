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
	return (
		<div>
			<p>An error occurred: {error.message}</p>
			<button onClick={resetErrorBoundary}>Go back</button>
		</div>
	);
}

export default ErrorFallBack;
