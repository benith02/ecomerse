import React, { useEffect, useRef, useState } from "react";
import "./Style.css"; // Make sure to include this CSS

const DynamicNavigation = ({
  links = [],
  backgroundColor = "#c2c2c223",
  textColor = "#fff",
  highlightColor = "rgba(255,255,255,0.1)",
  glowIntensity = 5,
  className = "",
  showLabelsOnMobile = false,
  onLinkClick,
  activeLink,
  enableRipple = true,
}) => {
  const navRef = useRef(null);
  const highlightRef = useRef(null);
  const safeLinks = Array.isArray(links) ? links : [];

  const [active, setActive] = useState(
    activeLink || (safeLinks.length > 0 ? safeLinks[0].id : null)
  );

  const updateHighlightPosition = (id) => {
    if (!navRef.current || !highlightRef.current) return;
    const linkElement = navRef.current.querySelector(`#nav-item-${id || active}`);
    if (!linkElement) return;

    const { left, width } = linkElement.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    highlightRef.current.style.transform = `translateX(${left - navRect.left}px)`;
    highlightRef.current.style.width = `${width}px`;
  };

  const createRipple = (event) => {
    if (!enableRipple) return;
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - diameter / 2}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - diameter / 2}px`;
    circle.className = "ripple";
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();
    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  const handleLinkClick = (id, e) => {
    e.preventDefault();
    if (enableRipple) createRipple(e);
    setActive(id);
    if (onLinkClick) onLinkClick(id);
  };

  const handleLinkHover = (id) => {
    updateHighlightPosition(id);
  };

  useEffect(() => {
    updateHighlightPosition();
    const handleResize = () => updateHighlightPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active, safeLinks]);

  useEffect(() => {
    if (activeLink && activeLink !== active) setActive(activeLink);
  }, [activeLink]);

  if (!safeLinks.length) return null;

  return (
    <nav
      ref={navRef}
      className={`dynamic-nav ${className}`}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        boxShadow: `0 0 ${glowIntensity}px rgba(255,255,255,0.3)`,
        width: "max-content",
      }}
    >
      <div
        ref={highlightRef}
        className="highlight"
        style={{ backgroundColor: highlightColor }}
      ></div>

      <ul className="nav-links">
        {safeLinks.map((link) => (
          <li key={link.id} id={`nav-item-${link.id}`} className="nav-item">
            <a
              href={link.href || "#"}
              className={`nav-link ${active === link.id ? "active" : ""} ${
                showLabelsOnMobile ? "show-label" : ""
              }`}
              onClick={(e) => handleLinkClick(link.id, e)}
              onMouseEnter={() => handleLinkHover(link.id)}
            >
              {link.icon && <span className="icon">{link.icon}</span>}
              <span className="label">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DynamicNavigation;
