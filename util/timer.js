export default function time(duration, setTime) {
  var timer = duration,
    minutes,
    seconds;
  const a = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    setTime(minutes + ":" + seconds);
    timer -= 1;
  }, 1000);
  setTimeout(() => clearInterval(a), (duration + 1) * 1000);
}
