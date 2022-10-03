import { useEffect, useState } from "react";

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}

const useAudioRecorder = () => {
  const [audio, setAudio] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalTimer, setIntervalTimer] = useState<NodeJS.Timer>();
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder).catch(console.error);
      }

      return undefined;
    }

    if (isRecording) {
      recorder.start();
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      setIntervalTimer(timer);
    } else {
      recorder.stop();
      setTime(0);
      clearInterval(intervalTimer);
    }

    const handleData = (e: BlobEvent) => {
      setAudio(e.data);
    };

    recorder.addEventListener("dataavailable", handleData);

    return () => {
      clearInterval(intervalTimer);
      recorder.removeEventListener("dataavailable", handleData);
    };
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return { audio, time, isRecording, startRecording, stopRecording };
};

export default useAudioRecorder;
