import UserForm from "@/components/forms/UserForm";

const UserSignIn = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UserForm type="signin" />
      </div>
    </div>
  );
};

export default UserSignIn;
