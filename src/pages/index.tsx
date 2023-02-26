import Head from "next/head";
import { useState } from "react";
import { Message } from "src/components/Message";
import { MessageBox } from "src/components/MessageBox";

type MessageItem = {
  body: string;
  sent: boolean;
};

export default function Home() {
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const handleNewMessage = (sentMessage: string, receivedMessage: string) => {
    setMessages([
      ...messages,
      {
        body: sentMessage,
        sent: true,
      },
      {
        body: receivedMessage,
        sent: false,
      },
    ]);
  };

  return (
    <>
      <Head>
        <title>Marv, The Paranoid Android</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container mx-auto">
          <div className="flex w-full flex-col justify-between px-5">
            <div className="mt-5 flex flex-col">
              {/* Loop over all messages and render them */}
              {messages.map((message) => (
                <Message
                  key={message.body}
                  className="mb-4"
                  avatar={message.sent ? "/user.png" : "/marv.jpg"}
                  sent={message.sent}
                >
                  {message.body}
                </Message>
              ))}
            </div>

            <div className="py-5">
              <MessageBox onNewMessage={handleNewMessage} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
