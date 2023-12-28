import { useState } from "react";
import { Link } from "react-router-dom";
import FormModal from "../../components/modal/FormModal";
import TermsOfService from "../../features/TermsOfService";
import SignUpForm from "../../features/forms/SignUpForm";
import { useLoggedInRedirect } from "../../features/hooks/useLoggedInRedirect";
import { ControlModalContext } from "../../services/context/ControlModalContext";
import { RouteEnum, siteMap } from "../../services/routes.config";

const SignUpPage = () => {
	useLoggedInRedirect();
	const [showTOS, setShowTOS] = useState(false);
	return (
		<div className="flex flex-col justify-center">
			<SignUpForm />
			<div className="my-3 mx-auto font-roboto text-base tracking-wide [&_a]:hover:text-primary-500 [&_a]:hover:border-b-4  border-primary-500">
				By registering, you accept our
				<span
					className="text-primary-300 hover:text-primary-500 cursor-pointer me-2 text-normal"
					onClick={(e) => {
						e.preventDefault();
						setShowTOS(true);
					}}
				>
					{" "}
					Terms of Service
				</span>
			</div>
			<div className="my-3 mx-auto font-roboto text-base tracking-wide [&_a]:hover:text-primary-500 [&_a]:hover:border-b-4  border-primary-500">
				Already have an account?{" "}
				<Link to={siteMap(RouteEnum.SignIn)} className="text-primary-300">
					Sign In
				</Link>
			</div>

			<ControlModalContext.Provider
				value={{ isShow: showTOS, setIsShow: setShowTOS }}
			>
				<FormModal>
					<TermsOfService />
				</FormModal>
			</ControlModalContext.Provider>
			{/* <SignPageAnimatedBG /> */}
		</div>
	);
};

export default SignUpPage;
