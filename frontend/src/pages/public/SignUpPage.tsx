import { Link } from "react-router-dom";
import SignUpForm from "../../features/forms/SignUpForm";
import { RouteEnum, siteMap } from "../routes.config";

function SignUpPage() {
	return (
		<>
			<SignUpForm />
			<p>
				Already have an account?{" "}
				<Link to={siteMap(RouteEnum.SignIn)}>Sign In</Link>
			</p>
		</>
	);
}

export default SignUpPage;
