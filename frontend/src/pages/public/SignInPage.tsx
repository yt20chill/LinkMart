import { Link } from "react-router-dom";
import SignInForm from "../../features/forms/SignInForm";
import { RouteEnum, siteMap } from "../routes.config";

function SignInPage() {
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
