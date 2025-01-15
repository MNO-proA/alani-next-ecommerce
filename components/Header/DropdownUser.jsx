import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import {
 SignedIn, UserButton
} from "@clerk/nextjs"

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <SignedIn>
        <UserButton />
      </SignedIn>
    </ClickOutside>
  );
};

export default DropdownUser;
