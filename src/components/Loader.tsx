import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src="/loading.gif"
        alt="Chargement en cours"
        width={400}
        height={400}
      />
    </div>
  );
}
