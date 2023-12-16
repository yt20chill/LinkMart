import { Link } from "react-router-dom";
import SignUpForm from "../../features/forms/SignUpForm";
import { useLoggedInRedirect } from "../../features/hooks/useLoggedInRedirect";
import { RouteEnum, siteMap } from "../../services/routes.config";

const SignUpPage = () => {
	useLoggedInRedirect();
	return (
		<>
			<SignUpForm />
			<p>
				Already have an account?{" "}
				<Link to={siteMap(RouteEnum.SignIn)}>Sign In</Link>
			</p>
		</>
	);
};

export default SignUpPage;
