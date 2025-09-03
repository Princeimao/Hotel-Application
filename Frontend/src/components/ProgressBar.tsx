import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  progress: number;
  back: string;
  front?: string;
  isBackDisable: boolean;
  isFrontDisable: boolean;
  pathname: string;
  loading?: boolean;
  handleSubmit: any;
}

const ProgressBar = ({
  progress,
  back,
  isBackDisable,
  isFrontDisable,
  pathname,
  loading = false,
  handleSubmit,
}: Props) => {
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const nextUrl = await handleSubmit();
      console.log(nextUrl);
      if (nextUrl) {
        navigate(nextUrl);
      }
    } catch (err) {
      console.error("Progress bar error", err);
    }
  };

  return (
    <div className="w-full h-20 absolute bottom-0 left-0">
      <Progress value={progress} className="h-1 rounded-none" />
      <div
        className={`w-full h-18 flex justify-between items-center px-10 ${
          pathname === "/become-a-host" ? "justify-end" : null
        }`}
      >
        {pathname === "/become-a-host" ? (
          <Button
            disabled={isFrontDisable}
            onClick={() => onSubmit()}
            className="border px-8 text-white bg-red-600 hover:bg-red-700 rounded-xl hover:text-white"
          >
            Next
          </Button>
        ) : (
          <>
            <Button
              disabled={isBackDisable}
              onClick={() => navigate(back)}
              className="bg-transparent border px-8 text-black rounded-2xl hover:text-white"
            >
              Back
            </Button>
            <Button
              disabled={isFrontDisable}
              onClick={() => onSubmit()}
              className="border px-8 text-white bg-red-600 hover:bg-red-700 rounded-xl hover:text-white"
            >
              {loading ? <Loader className="animate-spin" /> : "Next"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
