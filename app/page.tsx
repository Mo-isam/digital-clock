"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";



export default function Home() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const intervel = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(intervel);
        };
    }, []);

    function timeformat() {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const second = time.getSeconds();
        const AMorPM = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || hours;

        return `${timepading(hours)}:${timepading(minutes)}:${timepading(
            second
        )} ${AMorPM}`;
    }
    function timepading(number: number) {
        return String(number).padStart(2, "0");
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.box}>
                    <span className={styles.clock}>{timeformat()}</span>
                </div>
            </main>
        </div>
    );
}
