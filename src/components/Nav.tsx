import { scrollToSection } from '../scroll';

const links = [
  { label: 'About', target: '#about' },
  { label: 'Experience', target: '#experience' },
  { label: 'Skills', target: '#skills' },
  { label: 'Contact', target: '#contact' },
];

export default function Nav() {
  return (
    <header className="nav">
      <a
        className="nav__logo"
        href="#top"
        onClick={(e) => { e.preventDefault(); scrollToSection('#top'); }}
      >
        ph<span>98</span>_
      </a>
      <nav className="nav__links" aria-label="Main navigation">
        {links.map((l) => (
          <a
            key={l.target}
            href={l.target}
            onClick={(e) => { e.preventDefault(); scrollToSection(l.target); }}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
