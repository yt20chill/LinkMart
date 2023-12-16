import { Link } from "react-router-dom";
import SignInForm from "../../features/forms/SignInForm";
import { useLoggedInRedirect } from "../../features/hooks/useLoggedInRedirect";
import { RouteEnum, siteMap } from "../../services/routes.config";

function SignInPage() {
	useLoggedInRedirect();
	return (
		<>
			<SignInForm />
			<p className="my-3">
				New user? <Link to={siteMap(RouteEnum.SignUp)}>Sign up </Link>
				for free!
			</p>
		</>
	);
}

export default SignInPage;
