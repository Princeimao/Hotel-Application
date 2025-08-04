import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface Props {
  progress: number;
  back: string;
  front: string;
  isBackDisable: boolean;
  isFrontDisable: boolean;
  pathname: string;
}

const ProgressBar = ({
  progress,
  back,
  front,
  isBackDisable,
  isFrontDisable,
  pathname,
}: Props) => {
  const navigate = useNavigate();

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
            onClick={() => navigate(front)}
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
              onClick={() => navigate(front)}
              className="border px-8 text-white bg-red-600 hover:bg-red-700 rounded-xl hover:text-white"
            >
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
