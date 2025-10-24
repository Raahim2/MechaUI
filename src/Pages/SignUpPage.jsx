import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp forceRedirectUrl={"/dashboard"}/> 
    </div>
  );
}
