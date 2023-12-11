import { useNavigate } from "react-router-dom";
import PostRequestForm from "../../features/forms/PostRequestForm";

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<div className="grid h-screen px-4 bg-white place-content-center">
			<div className="text-center">
				<h1 className="font-black text-gray-200 text-9xl">404</h1>

				<p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Uh-oh!
				</p>
				<PostRequestForm />
				<p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
				<p
					onClick={() => {
						navigate("/");
					}}
					className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
				>
					Go Back Home
				</p>
			</div>
		</div>
	);
};

export default NotFoundPage;
