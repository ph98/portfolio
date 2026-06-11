import { marqueeWords } from '../data';

export default function Marquee() {
  const track = (ariaHidden: boolean) => (
    <div className="marquee__track" aria-hidden={ariaHidden}>
      {marqueeWords.map((w) => (
        <span className="marquee__item" key={w}>{w}</span>
      ))}
    </div>
  );
  return (
    <div className="marquee" role="presentation">
      {track(false)}
      {track(true)}
    </div>
  );
}
