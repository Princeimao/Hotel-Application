import UserForm from "@/components/forms/UserForm";

const UserSignUp = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UserForm type="signup" />
      </div>
    </div>
  );
};

export default UserSignUp;
