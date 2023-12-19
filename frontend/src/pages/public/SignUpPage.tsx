import { Link } from "react-router-dom";
import SignUpForm from "../../features/forms/SignUpForm";
import { useLoggedInRedirect } from "../../features/hooks/useLoggedInRedirect";
import { RouteEnum, siteMap } from "../../services/routes.config";

const SignUpPage = () => {
  useLoggedInRedirect();
  return (
    <>
      <SignUpForm />
      <p className="my-3 mx-auto font-roboto text-base tracking-wide [&_a]:hover:text-primary-500 [&_a]:hover:border-b-4  border-primary-500">
        Already have an account?{" "}
        <Link to={siteMap(RouteEnum.SignIn)} className="text-primary-300">
          Sign In
        </Link>
      </p>
    </>
  );
};

export default SignUpPage;
