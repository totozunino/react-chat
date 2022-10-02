import React, { useState, useRef } from "react";
import Input from "components/UI/Input";
import { ReactComponent as SendMessage } from "assets/images/send-message.svg";
import { ReactComponent as AttachFiles } from "assets/images/attach-files.svg";
import { useChat } from "contexts/chat-context";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useReactMediaRecorder } from "react-media-recorder";
import { addSeconds, format } from "date-fns";
import { auth, db, storage } from "../firebase";

const ChatForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [audioTime, setAudioTime] = useState(0);
  const [intervalTimer, setIntervalTimer] = useState<NodeJS.Timer>();
  const imgPreviewRef = useRef<HTMLImageElement>(null);
  const { selectedUser } = useChat();
  const { status, startRecording, stopRecording, clearBlobUrl, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: async (blobUrl: string) => {
      if (intervalTimer) {
        clearInterval(intervalTimer);
        setAudioTime(0);
      }
      if (selectedUser && auth.currentUser) {
        const user1 = auth.currentUser.uid;
        const user2 = selectedUser.id;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

        await addDoc(collection(db, "chats", id, "messages"), {
          message,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          media: "",
          audio: blobUrl,
        });
      }
    },
  });

  const handleNewMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message && selectedUser && auth.currentUser) {
      const user1 = auth.currentUser.uid;
      const user2 = selectedUser.id;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      let url = "";
      if (img) {
        const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
        const snap = await uploadBytes(imgRef, img);
        url = await getDownloadURL(ref(storage, snap.ref.fullPath));
      }
      await addDoc(collection(db, "chats", id, "messages"), {
        message,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url,
        audio: mediaBlobUrl,
      });

      setMessage("");
      setImg(null);
    }
  };

  const startSendAudio = () => {
    startRecording();
    const interval = setInterval(() => {
      setAudioTime((prevState) => prevState + 1);
    }, 1000);

    setIntervalTimer(interval);
  };

  const stopSendAudio = async () => {
    stopRecording();
    if (intervalTimer) {
      clearInterval(intervalTimer);
      setAudioTime(0);
    }
    // if (selectedUser && auth.currentUser) {
    //   const user1 = auth.currentUser.uid;
    //   const user2 = selectedUser.id;
    //   const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    //   await addDoc(collection(db, "chats", id, "messages"), {
    //     message,
    //     from: user1,
    //     to: user2,
    //     createdAt: Timestamp.fromDate(new Date()),
    //     media: "",
    //     audio: mediaBlobUrl,
    //   });
    // }
  };

  const cancelSendAudio = () => {
    clearBlobUrl();
    if (intervalTimer) {
      clearInterval(intervalTimer);
      setAudioTime(0);
    }
  };

  const formatAudioTime = (seconds: number) => {
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, "mm:ss");
  };

  return (
    <form onSubmit={handleNewMessage} className="flex flex-col items-center justify-center w-full">
      {img && (
        <div className="w-full px-4">
          <div className="relative w-12 h-12">
            <img
              className="w-12 h-12"
              ref={imgPreviewRef}
              src={URL.createObjectURL(img)}
              alt="Uploaded pic"
              onLoad={() => {
                if (imgPreviewRef.current) URL.revokeObjectURL(imgPreviewRef.current.src);
              }}
            />
            <button
              type="button"
              className="absolute w-6 h-6 text-sm rounded-full -top-2 -right-2 bg-emerald-600"
              onClick={() => setImg(null)}
            >
              X
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center w-full">
        <label htmlFor="img" className="w-6 m-2 ml-6 cursor-pointer">
          <AttachFiles />
          <input
            type="file"
            id="img"
            accept="image/*"
            className="hidden"
            onChange={({ target }) => {
              if (target.files) setImg(target.files[0]);
            }}
          />
        </label>
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <div className="flex items-center p-1 text-xl rounded-full bg-emerald-600">
          {status === "recording" ? (
            <>
              <button type="button" className="pl-2 text-sm" onClick={stopSendAudio}>
                ✅
              </button>
              <span className="relative flex w-3 h-3 mx-2">
                <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-95 animate-ping" />
                <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
              </span>
              {formatAudioTime(audioTime)}
              <button type="button" className="px-2 text-sm" onClick={cancelSendAudio}>
                ❌
              </button>
            </>
          ) : (
            <button type="button" onClick={startSendAudio}>
              🎤
            </button>
          )}
        </div>
        <button type="submit">
          <SendMessage className="w-12 h-12 p-3 cursor-pointer" />
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
