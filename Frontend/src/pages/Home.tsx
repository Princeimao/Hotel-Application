import RoomCard from "@/components/RoomCard";

const Home = () => {
  return (
    <div className="px-9 py-3">
      <h1 className="px-2 font-bold font-[Arial] text-xl">
        Popular homes in Gurgaon District
      </h1>
      <div className="w-full flex">
        <RoomCard />
        <RoomCard />
      </div>
    </div>
  );
};

export default Home;
