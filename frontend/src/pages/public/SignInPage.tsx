import { Link } from "react-router-dom";
import SignInForm from "../../features/forms/SignInForm";
import { useLoggedInRedirect } from "../../features/hooks/useLoggedInRedirect";
import { RouteEnum, siteMap } from "../../services/routes.config";

function SignInPage() {
	useLoggedInRedirect();
	return (
		<>
			<SignInForm />
			<p className="my-3 mx-auto font-roboto text-base tracking-wide [&_a]:hover:text-secondary-500 [&_a]:hover:border-b-4 border-secondary-500">
				New user?{" "}
				<Link to={siteMap(RouteEnum.SignUp)} className="text-secondary-300">
					Sign up{" "}
				</Link>
				for free!
			</p>
			{/* <SignPageAnimatedBG /> */}
		</>
	);
}

export default SignInPage;
