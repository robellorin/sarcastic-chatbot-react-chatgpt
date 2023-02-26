import clsx from "clsx";
import Image from "next/image";
import { ReactNode } from "react";

type MessageProp = {
  className?: string;
  sent?: boolean;
  avatar?: string;
  children?: ReactNode;
};

export const Message = ({ className, sent, avatar, children }: MessageProp) => {
  return (
    <div className={clsx("flex", sent ? "justify-end" : "justify-start", className)}>
      {/* For received messages, show the avatar at the start */}
      {!sent && avatar && (
        <Image
          className="mr-2 h-8 w-8 rounded-full object-cover"
          width={32}
          src={avatar}
          alt="User"
        />
      )}

      {/* Message bubble */}
      <div
        className={clsx(
          "rounded-tl-3xl rounded-tr-xl py-3 px-4 text-white",
          sent ? "rounded-bl-3xl bg-blue-400" : "ml-2 rounded-br-3xl bg-gray-400"
        )}
      >
        {children}
      </div>

      {/* For sent messages, show the avatar at the end */}
      {sent && avatar && (
        <Image
          className="ml-2 h-8 w-8 rounded-full object-cover"
          width={32}
          src={avatar}
          alt="User"
        />
      )}
    </div>
  );
};
