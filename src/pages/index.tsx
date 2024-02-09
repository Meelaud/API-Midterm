// import Header from "@/components/header";
import Image from "next/image";


export default function Home() {
  return (
    <main className={`flex-auto flex-col justify-normal bg-amber-200`}>
      <header className={`w-3/5 flex flex-row gap-10 flex-row bg-lime-700 text-5xl font-semibold text-indigo-950 p-5 rounded-l-full rounded-r-full `}>
      <Image src="/images/Asset 3.png" alt="Custom Icon" width = "100" height = "100"/>
        Weather Compass
      </header>
     
    </main>
  );
}
