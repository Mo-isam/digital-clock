"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
function Home() {
    const [isRunning, setrunning] = useState(false);
    const [elapsedTime, setElapsed] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimerRef = useRef(0);
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setElapsed(Date.now() - startTimerRef.current);
            }, 10);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
            }
        };
    }, [isRunning]);
    function timeformat(milliseconds: number) {
        let totalsecond = Math.floor(milliseconds / 1000);
        let milesecond = Math.floor((milliseconds % 1000) / 10);
        let second = Math.floor(totalsecond % 60);
        let mints = Math.floor((totalsecond % 3600) / 60);
        let hours = Math.floor(totalsecond / 3600);

        return `${pading(hours)}:${pading(mints)}:${pading(second)}:${pading(
            milesecond
        )}`;
    }
    function pading(x: number) {
        return String(x).padStart(2, "0");
    }
    const start = () => {
        setrunning(true);
        startTimerRef.current = Date.now() - elapsedTime;
    };
    const stop = () => {
        setrunning(false);
    };
    const reset = () => {
        setrunning(false);
        setElapsed(0);
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.box}>
                    <span className={styles.clock}>
                        {timeformat(elapsedTime)}
                    </span>
                </div>
                <div>
                    <button onClick={start}>Start</button>
                    <button onClick={stop}>Stop</button>
                    <button onClick={reset}>Reset</button>
                </div>
            </main>
        </div>
    );
}
export default Home;
