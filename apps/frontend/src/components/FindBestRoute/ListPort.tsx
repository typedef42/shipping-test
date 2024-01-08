import { Port } from "@/app/api/shipment/find-best-route";
import { getListPort } from "@/app/api/shipment/get-list-port";
import twMerge from "@/utils/twMerge";
import { useEffect, useState } from "react";

interface ListPortProps {
  country: string;
  highlightPort?: Port;
}

const ListPort: React.FC<ListPortProps> = ({ country, highlightPort }) => {
  const [listPort, setListPort] = useState<Array<Port>>([]);

  useEffect(() => {
    const fetchPorts = async () => {
      if (!country) {
        setListPort([]);
        return;
      }
      const ports = await getListPort(country);
      setListPort(ports);
    };
    fetchPorts();
  }, [country]);

  return (
    <div className="flex flex-col gap-4">
      {listPort.map(({ name }) => (
        <div
          key={name}
          className={twMerge(
            "flex gap-4 items-center justify-center py-2 px-4 bg-blue-100 shadow-md text-lg font-bold text-black w-80 rounded-full",
            name === highlightPort?.name && "bg-green-500",
          )}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default ListPort;
