'use client';

import Desktop from "@/components/os/Desktop";
import Dock from "@/components/os/Dock";
import BootScreen from "@/components/os/BootScreen";

export default function Home() {
  return (
    <>
      <BootScreen />
      <Desktop>
        <Dock />
      </Desktop>
    </>
  );
}

