interface DistanceProps {
  distance: number;
}

const Distance: React.FC<DistanceProps> = ({ distance }) => {
  return (
    <div className="flex flex-col items-center justify-center py-2 min-w-20 bg-blue-100 rounded-lg shadow-md text-black p-4 mt-4">
      <div className="flex text-lg font-bold">
        Distance: <span className="font-normal ml-2">{distance}</span>
      </div>
    </div>
  );
};

export default Distance;
