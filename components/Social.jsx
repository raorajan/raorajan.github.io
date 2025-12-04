import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/raobaba" },
  { icon: <FaLinkedinIn />, path: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/kumar-rajan" },
  { icon: <FaTwitter />, path: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/RajanRao7061" },
];

function Social({ containerStyles, iconStyles }) {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <a
          key={index}
          href={item.path}
          className={`${iconStyles} hover:bg-green-500 hover:text-white`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

export default Social;
