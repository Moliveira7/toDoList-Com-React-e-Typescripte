import { useEffect, useState, useRef } from "react";
import { timeToSeconds } from "../../common/utils/time";
import { ITask } from "../../types/task";
import Button from "../Button";
import Clock  from "./Clock";
import style from "./Stopwatch.module.scss";



interface Props {
    selected: ITask | undefined,
    endTask: () => void;
}

const breakSound = "../../audio/break.wav";

export default function StopWatch({ selected, endTask }: Props) {
    const [period, setPeriod] = useState<number>();
    // const [playLetsGoSound, setPlayLetsGoSound] = useState(false);
    const [playBreakSound, setPlayBreakSound] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
  
    function regressive(counter: number = 0) {
        setTimeout(() => {
          if (counter > 0) {
            setPeriod(counter - 1);
            return regressive(counter - 1);
          } else {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
              audioRef.current.src = breakSound;
              audioRef.current.play()
                .then(() => setPlayBreakSound(false))
                .catch((error) => {
                  console.error("Error playing audio:", error);
                  setPlayBreakSound(false);
                });
            }
            endTask();
          }
        }, 1000);
      
        // if (counter === period) {
        //   setPlayLetsGoSound(true);
        // }
      }
  
    const handleStartClick = () => {
      regressive(period);
      if (audioRef.current) {
        audioRef.current.play()
          .catch((err) => {
            // Tratamento de erro caso a reprodução seja bloqueada pelo navegador
            console.error('Não foi possível reproduzir o áudio:', err);
          });
      }
    };
  
    useEffect(() => {
      if (selected && selected.time) {
        setPeriod(timeToSeconds(selected.time));
      }
    }, [selected]);
  
    useEffect(() => {
      if (playBreakSound) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
        setPlayBreakSound(false);
      }
    }, [playBreakSound]);
  
    return (
      <div className={style.stopwatch}>
        <div className={style.watchWrapper}>
          <Clock period={period} />
        </div>
        <Button onClick={handleStartClick}>
          Start
        </Button>
        <audio ref={audioRef}>
          <source src=""  type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
        <audio>
          <source src="" type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      </div>
    )
  }
  
  
    
    
    
    
    
    
    






