import clsx from "clsx";
import { KeyboardEvent, useState } from "react";

type MessageBoxProps = {
  className?: string;
  onNewMessage: (sentMessage: string, receivedMessage: string) => void;
};

export const MessageBox = ({ className, onNewMessage }: MessageBoxProps) => {
  const [message, setMessage] = useState("");

  const [isSending, setIsSending] = useState(false);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSending) {
      setIsSending(true);
      // Call the endpoint
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });
      // Parse the response and notify
      const responseBody = await response.json();
      onNewMessage(message, responseBody);
      // Update the flag
      setIsSending(false);
      // Clear the previous message that was sent
      setMessage("");
    }
  };

  return (
    <input
      className={clsx(
        "w-full rounded-md border-2 border-gray-300 py-5 px-3 disabled:cursor-not-allowed disabled:bg-gray-100",
        className
      )}
      type="text"
      placeholder="Type your message here..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      disabled={isSending}
    />
  );
};
