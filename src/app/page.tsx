import Image from "next/image";
import GuillochePattern from "@/components/ui/guillochePattern"

export default function Homie() {
  return (
    <>
      <header>
        It's what the ladies want
      </header>
      <main>
        <GuillochePattern width={600} height={600}/>
        <Image
          src="/images/victor.jpg"
          alt="Portrait of Victor E Gator"
          width={180}
          height={38}
          priority
        />
      </main>
      <footer>
        It's what the gentlemen want
      </footer>
    </>
  );
}
