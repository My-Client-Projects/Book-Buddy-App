import { useRef, useEffect, useState } from "react";
import NavBarLink from "./NavBarLink";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [linkNumber, setLinkNumber] = useState(1);
  const [toggle, setToggle] = useState(false);
  const listIcon = useRef();
  const navRef = useRef(null);

  function useOutsideClick(ref, isActive, menuRef) {

    const [isOutsideClick, setIsOutsideClick] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
          if (
            ref.current &&
            !ref.current.contains(event.target) &&
            !menuRef.current.contains(event.target)
          ) {
            setIsOutsideClick(true);
          } else {
            setIsOutsideClick(false);
          }
        }
        // Only add the event listener if `isActive` is true
        if (isActive) {
          document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
          setIsOutsideClick(false);
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref, isActive]);

      return isOutsideClick;
  }

  const navOutsideClick = useOutsideClick(navRef, toggle, listIcon);

  useEffect(() => {
    if (navOutsideClick && toggle) {
      setToggle(false);
    }
  }, [navOutsideClick]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const navStyles =
    toggle && !navOutsideClick
      ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }
      : { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" };
  
  const navList = [
    {
      id: 1,
      title: "Home",
      image: "bi-house",
    },
    {
      id: 2,
      title: "Reading List",
      image: "bi-book",
    },
  ];

  const navigationList = {
    "/home": 1,
    "reading-list": 2
  };

  const currentPage = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage !== "") {
      setLinkNumber(navigationList[currentPage]);
    } else {
      navigate("/");
      setLinkNumber(1);
    }
  }, [currentPage]);

  const location = useLocation();
  
  useEffect(() => {
    setToggle(false);
  }, [location]);

  return (
    <div className="navbar space-y-10 text-white bg-[#222032] flex flex-col w-[15%] py-10 h-screen border-r-black border-solid fixed max-[920px]:space-y-0 max-[920px]:flex-row max-[920px]:top-0 max-[920px]:left-0 max-[920px]:w-[100%] max-[920px]:h-fit max-[920px]:sticky max-[920px]:p-0 max-[920px]:items-center max-[920px]:justify-center max-[920px]:z-[10000] max-[720px]:p-[10px] max-[720px]:justify-between">
      <nav className="nav-links" style={navStyles} ref={navRef}>
        <ul className="flex flex-col max-[920px]:flex-row mx-5 gap-3 max-[920px]:m-0 max-[920px]:p-2">
          {navList.map((e) => (
            <NavBarLink
              linkNumber={linkNumber}
              setLinkNumber={setLinkNumber}
              title={e.title}
              icon={e.image}
              key={e.id}
              i={e.id}
            />
          ))}
        </ul>
      </nav>
      {toggle ? (
        <i
          className="navBtn bi bi-x cursor-pointer z-[9999999]"
          ref={listIcon}
          onClick={handleToggle}></i>
      ) : (
        <i
          className="navBtn bi bi-list cursor-pointer z-[9999999]"
          ref={listIcon}
          onClick={handleToggle}></i>
      )}
    </div>
  );
};

export default NavBar;