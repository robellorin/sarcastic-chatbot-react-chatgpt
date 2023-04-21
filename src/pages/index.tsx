import Head from "next/head";
import { useState, useRef } from "react";
import { Message } from "src/components/Message";
import { MessageBox } from "src/components/MessageBox";

type MessageItem = {
  body: string;
  sent: boolean;
};

export default function Home() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const messageRef = useRef<any>(null);

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
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messageRef.current.scroll({
        top: messageRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <>
      <Head>
        <title>Marv - Sarcastic ChatBot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container mx-auto">
          <div className="container mx-auto my-[2rem] w-full items-center text-center text-2xl">
            <div className="text-slate-600">ChatGPT - Sarcastic Demo App</div>
          </div>
          <div className="flex w-full flex-col justify-between px-5">
            <div className="message-panel flex h-[30rem] flex-col overflow-auto" ref={messageRef}>
              {/* Loop over all messages and render them */}
              {messages.length > 0 &&
                messages.map((message) => (
                  <Message
                    key={message.body}
                    className="mb-4 "
                    avatar={message.sent ? "/user.png" : "/marv.jpg"}
                    sent={message.sent}
                  >
                    {message.body}
                  </Message>
                ))}
              {messages.length == 0 && (
                <div className="text-slate-400">
                  My name is Marv. Please ask me if you have any questions.
                </div>
              )}
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
