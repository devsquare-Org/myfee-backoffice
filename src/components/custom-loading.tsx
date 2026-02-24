import Image from "next/image";

export default function CustomLoading() {
  return (
    <div className="flex justify-center items-center h-200">
      <Image
        src="/images/logo.png"
        alt="MyFee Logo"
        width={40}
        height={40}
        className="animate-spin"
      />
    </div>
  );
}
