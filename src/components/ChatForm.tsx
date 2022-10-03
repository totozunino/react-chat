import { FC, FormEvent, useState, useRef, useEffect } from "react";
import Input from "components/UI/Input";
import { ReactComponent as SendMessage } from "assets/images/send-message.svg";
import { ReactComponent as AttachFiles } from "assets/images/attach-files.svg";
import { useChat } from "contexts/chat-context";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { addSeconds, format } from "date-fns";
import useAudioRecorder from "hooks/useAudioRecorder";
import { auth, db, storage } from "../firebase";

const ChatForm: FC = () => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [sendAudio, setSendAudio] = useState(false);
  const imgPreviewRef = useRef<HTMLImageElement>(null);
  const { selectedUser } = useChat();
  const { startRecording, stopRecording, time, audio, isRecording } = useAudioRecorder();

  useEffect(() => {
    if (sendAudio && audio) {
      const audioRef = ref(storage, `audios/${new Date().getTime()}`);
      uploadBytes(audioRef, audio).then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.ref.fullPath)).then((url) => {
          if (selectedUser && auth.currentUser) {
            const user1 = auth.currentUser.uid;
            const user2 = selectedUser.id;
            const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
            addDoc(collection(db, "chats", id, "messages"), {
              message,
              from: user1,
              to: user2,
              createdAt: Timestamp.fromDate(new Date()),
              media: "",
              audio: url,
            });
          }
        });
      });
    }
  }, [audio]);

  const handleNewMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (!message && !img) return;

    if (selectedUser && auth.currentUser) {
      const user1 = auth.currentUser.uid;
      const user2 = selectedUser.id;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      let url = "";

      if (img) {
        const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
        const snap = await uploadBytes(imgRef, img);
        url = await getDownloadURL(ref(storage, snap.ref.fullPath));
        setImg(null);
      }

      addDoc(collection(db, "chats", id, "messages"), {
        message,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url,
        audio: null,
      });

      setMessage("");
    }
  };

  const startSendAudio = () => {
    setSendAudio(false);
    startRecording();
  };

  const stopSendAudio = async () => {
    stopRecording();
    setSendAudio(true);
  };

  const cancelSendAudio = () => {
    stopRecording();
  };

  const formatAudioTime = (seconds: number) => {
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, "mm:ss");
  };

  return (
    <form onSubmit={handleNewMessage} className="flex flex-col items-center justify-center w-full">
      {img && (
        <div className="w-full pt-3 pl-4">
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
              className="absolute flex items-center justify-center w-4 h-4 pb-1 text-sm text-white rounded-full -top-1 -right-1 bg-emerald-600"
              onClick={() => setImg(null)}
            >
              x
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
          {isRecording ? (
            <>
              <button type="button" className="pl-2 text-sm" onClick={stopSendAudio}>
                ✅
              </button>
              <span className="relative flex w-3 h-3 mx-2">
                <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-95 animate-ping" />
                <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
              </span>
              {formatAudioTime(time)}
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
