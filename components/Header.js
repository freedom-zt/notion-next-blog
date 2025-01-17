import { useEffect, useRef } from 'react';
import Link from 'next/link';
import BLOG from '@/blog.config';
import { useLocale } from '@/lib/locale';
import ThemeToggler from './ThemeToggler';
import Image from 'next/image';
import logoImg from '../public/apple-touch-icon.png';

const NavBar = () => {
  const locale = useLocale();
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: false },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true },
  ];
  return (
    <div className="flex flex-shrink-0 gap-2">
      <ul className="flex flex-row items-center">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav hover:text-primary dark:hover:text-primary"
              >
                <Link href={link.to}>{link.name}</Link>
              </li>
            )
        )}
      </ul>
      <ThemeToggler />
    </div>
  );
};

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar;
  const navRef = useRef(null);
  const sentinalRef = useRef([]);
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full');
      } else {
        navRef.current?.classList.remove('sticky-nav-full');
      }
    } else {
      navRef.current?.classList.add('remove-sticky');
    }
  };
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler);
    obvserver.observe(sentinalRef.current);
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef]);
  return (
    <>
      <div className="h-4 observer-element md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/" aria-label={BLOG.title}>
            <div>
              <Image src={logoImg} alt="freedom" width={50} height={50} />
            </div>
            {/* <div className="h-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="24"
                  height="24"
                  className="text-black fill-current dark:text-white"
                />
                <rect width="24" height="24" fill="url(#paint0_radial)" />
                <defs>
                  <radialGradient
                    id="paint0_radial"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="rotate(45) scale(39.598)"
                  >
                    <stop stopColor="#CFCFCF" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#E9E9E9" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div> */}
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
