import style from "./Clock.module.scss";

interface Props {
    period: number | undefined
}

export default function Clock({ period = 0 }: Props) {
    const minutes = Math.floor(period / 60);
    const seconds = period % 60;
    const [minuteTen, minuteUnit] = String(minutes).padStart(2, '0');
    const [secondTen, secondUnit] = String(seconds).padStart(2, '0');
    return (
        <>
            <p className={style.title}>Choose the card and start the timer</p>
            <span className={style.clockNumber}>{minuteTen}</span>
            <span className={style.clockNumber}>{minuteUnit}</span>
            <span className={style.divisionClock}>:</span>
            <span className={style.clockNumber}>{secondTen}</span>
            <span className={style.clockNumber}>{secondUnit}</span>
        </>
    )
}
