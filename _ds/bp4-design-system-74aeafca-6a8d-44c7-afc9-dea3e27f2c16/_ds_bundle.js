/* @ds-bundle: {"format":3,"namespace":"BP4DesignSystem_74aeaf","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"e4ed89fbd86f","components/core/Button.jsx":"512b67db94b7","components/core/Card.jsx":"22fb303dd49c","components/data/Avatar.jsx":"e3659722221e","components/forms/Input.jsx":"5e9105698ba8","components/forms/Switch.jsx":"8d127ecb693e","components/navigation/Tabs.jsx":"6b49304d700c","ui_kits/website/Sections.jsx":"4a237ac4447c","ui_kits/website/Site.jsx":"d6278d80ccbb","ui_kits/website/strings.js":"5f6900522395"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BP4DesignSystem_74aeaf = window.BP4DesignSystem_74aeaf || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BP4 Badge — compact status / category pill.
 * Tones: brand, neutral, success, warning, error, info.
 */
function Badge({
  children,
  tone = "brand",
  solid = false,
  style = {},
  ...rest
}) {
  const map = {
    brand: {
      soft: "var(--bp-orange-100)",
      softText: "var(--bp-orange-700)",
      solid: "var(--color-brand)"
    },
    neutral: {
      soft: "var(--bp-neutral-200)",
      softText: "var(--bp-neutral-700)",
      solid: "var(--bp-neutral-700)"
    },
    success: {
      soft: "var(--bp-success-soft)",
      softText: "var(--bp-success)",
      solid: "var(--bp-success)"
    },
    warning: {
      soft: "var(--bp-warning-soft)",
      softText: "var(--bp-orange-800)",
      solid: "var(--bp-warning)"
    },
    error: {
      soft: "var(--bp-error-soft)",
      softText: "var(--bp-error)",
      solid: "var(--bp-error)"
    },
    info: {
      soft: "var(--bp-info-soft)",
      softText: "var(--bp-info)",
      solid: "var(--bp-info)"
    }
  };
  const t = map[tone] || map.brand;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 11px",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.4,
      borderRadius: "var(--radius-pill)",
      background: solid ? t.solid : t.soft,
      color: solid ? "var(--bp-white)" : t.softText,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BP4 Button — the friendly, rounded primary action.
 * Variants: primary (orange), secondary (ink outline), ghost, inverse.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "8px 16px",
      fontSize: 14,
      gap: 7,
      radius: "var(--radius-md)"
    },
    md: {
      padding: "12px 22px",
      fontSize: 15,
      gap: 9,
      radius: "var(--radius-lg)"
    },
    lg: {
      padding: "16px 30px",
      fontSize: 17,
      gap: 10,
      radius: "var(--radius-lg)"
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--color-brand)",
      color: "var(--text-on-brand)",
      border: "2px solid transparent",
      boxShadow: "var(--shadow-brand)"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-strong)",
      border: "2px solid var(--border-default)",
      boxShadow: "none"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-brand)",
      border: "2px solid transparent",
      boxShadow: "none"
    },
    inverse: {
      background: "var(--surface-inverse)",
      color: "var(--text-on-inverse)",
      border: "2px solid transparent",
      boxShadow: "var(--shadow-md)"
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      display: full ? "flex" : "inline-flex",
      width: full ? "100%" : "auto",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1,
      borderRadius: s.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "transform var(--duration-fast) var(--ease-bounce), filter var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard)",
      ...v,
      ...style
    },
    onMouseDown: e => !disabled && (e.currentTarget.style.transform = "scale(0.96)"),
    onMouseUp: e => e.currentTarget.style.transform = "scale(1)",
    onMouseEnter: e => !disabled && (e.currentTarget.style.filter = "brightness(0.94)"),
    onMouseLeave: e => {
      e.currentTarget.style.filter = "none";
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BP4 Card — soft, rounded surface container.
 * The default content panel: white surface, soft shadow, generous radius.
 */
function Card({
  children,
  padded = true,
  hover = false,
  accent = false,
  style = {},
  ...rest
}) {
  const [lift, setLift] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => hover && setLift(true),
    onMouseLeave: () => hover && setLift(false),
    style: {
      background: "var(--surface-card)",
      border: accent ? "2px solid var(--border-brand)" : "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)",
      boxShadow: lift ? "var(--shadow-lg)" : "var(--shadow-sm)",
      padding: padded ? "var(--space-6)" : 0,
      transition: "box-shadow var(--duration-normal) var(--ease-standard), transform var(--duration-normal) var(--ease-out)",
      transform: lift ? "translateY(-3px)" : "none",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BP4 Avatar — circular profile mark with initials fallback.
 */
function Avatar({
  name = "",
  src = null,
  size = 44,
  tone = "brand",
  style = {},
  ...rest
}) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join("");
  const tones = {
    brand: {
      bg: "var(--bp-orange-100)",
      fg: "var(--bp-orange-700)"
    },
    neutral: {
      bg: "var(--bp-neutral-200)",
      fg: "var(--bp-neutral-700)"
    },
    ink: {
      bg: "var(--bp-neutral-900)",
      fg: "var(--bp-white)"
    }
  };
  const t = tones[tone] || tones.brand;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "50%",
      background: src ? "transparent" : t.bg,
      color: t.fg,
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: size * 0.38,
      overflow: "hidden",
      flex: "none",
      userSelect: "none",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || "•");
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BP4 Input — text field with label, optional hint and error.
 */
function Input({
  label,
  hint,
  error,
  iconLeft = null,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || `bp-input-${Math.random().toString(36).slice(2, 8)}`;
  const borderColor = error ? "var(--bp-error)" : focus ? "var(--color-brand)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--font-body)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "11px 14px",
      background: "var(--surface-card)",
      border: `2px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? "0 0 0 4px var(--bp-orange-100)" : "none",
      transition: "border-color var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard)"
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "var(--text-muted)"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: 15,
      fontFamily: "var(--font-body)",
      color: "var(--text-strong)",
      minWidth: 0
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? "var(--bp-error)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BP4 Switch — rounded toggle.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "var(--text-strong)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      position: "relative",
      width: 44,
      height: 26,
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--color-brand)" : "var(--bp-neutral-300)",
      transition: "background var(--duration-normal) var(--ease-standard)",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: checked ? 21 : 3,
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "var(--bp-white)",
      boxShadow: "var(--shadow-sm)",
      transition: "left var(--duration-normal) var(--ease-bounce)"
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BP4 Tabs — underline-style segmented navigation.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {},
  ...rest
}) {
  const active = value ?? (tabs[0] && tabs[0].id);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: 4,
      borderBottom: "2px solid var(--border-subtle)",
      fontFamily: "var(--font-display)",
      ...style
    }
  }, rest), tabs.map(tab => {
    const isActive = tab.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      onClick: () => onChange && onChange(tab.id),
      style: {
        position: "relative",
        padding: "10px 16px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontFamily: "var(--font-display)",
        fontSize: 15,
        fontWeight: isActive ? 700 : 600,
        color: isActive ? "var(--text-brand)" : "var(--text-muted)",
        transition: "color var(--duration-normal) var(--ease-standard)"
      }
    }, tab.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 8,
        right: 8,
        bottom: -2,
        height: 3,
        borderRadius: "var(--radius-pill)",
        background: isActive ? "var(--color-brand)" : "transparent",
        transition: "background var(--duration-normal) var(--ease-standard)"
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
/* BP4 marketing-site sections — self-contained, token-styled, bilingual.
   Text comes from the `t` (translations) prop; structure stays in code.
   Exposed on window.BPSections. */

function Eyebrow({
  children,
  light
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: light ? "rgba(255,255,255,0.85)" : "var(--text-brand)",
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      background: light ? "rgba(255,255,255,0.6)" : "var(--color-brand)",
      borderRadius: 2
    }
  }), children);
}
function Stat({
  value,
  label
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 38,
      color: "var(--text-strong)",
      letterSpacing: "-0.02em",
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "var(--text-muted)",
      marginTop: 6
    }
  }, label));
}

/* icon + color per service slot (text is injected from t.services.items) */
const SERVICE_STYLE = [{
  icon: "users",
  bg: "var(--bp-orange-50)",
  fg: "var(--color-brand)"
}, {
  icon: "zap",
  bg: "var(--bp-teal-50)",
  fg: "var(--bp-teal-500)"
}, {
  icon: "heart",
  bg: "var(--bp-celeste-soft)",
  fg: "var(--bp-celeste-700)"
}];
function Services({
  t
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 0",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "0 32px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, t.services.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 44,
      letterSpacing: "-0.02em",
      color: "var(--text-strong)",
      margin: "16px 0 0",
      maxWidth: 640,
      lineHeight: 1.05
    }
  }, t.services.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 18,
      color: "var(--text-body)",
      maxWidth: 560,
      marginTop: 16,
      lineHeight: 1.6
    }
  }, t.services.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      marginTop: 48
    }
  }, t.services.items.map((s, i) => {
    const st = SERVICE_STYLE[i] || SERVICE_STYLE[0];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "bp-svc-card",
      style: {
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-xl)",
        padding: 28,
        boxShadow: "var(--shadow-sm)",
        transition: "transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-standard)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        borderRadius: "var(--radius-lg)",
        background: st.bg,
        color: st.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": st.icon,
      style: {
        width: 26,
        height: 26
      }
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 21,
        color: "var(--text-strong)",
        margin: "20px 0 0",
        lineHeight: 1.2
      }
    }, s.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 15,
        color: "var(--text-body)",
        marginTop: 10,
        lineHeight: 1.6
      }
    }, s.body));
  }))));
}
function Process({
  t
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 0",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "0 32px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, t.process.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 44,
      letterSpacing: "-0.02em",
      color: "var(--text-strong)",
      margin: "16px 0 48px",
      maxWidth: 560,
      lineHeight: 1.05
    }
  }, t.process.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 20
    }
  }, t.process.steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 18,
      color: "var(--color-brand)",
      background: "var(--bp-orange-50)",
      width: 44,
      height: 44,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 19,
      color: "var(--text-strong)",
      margin: "18px 0 0"
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "var(--text-body)",
      marginTop: 8,
      lineHeight: 1.6
    }
  }, s.body))))));
}
function CTABand({
  t,
  onStart
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "32px 0 96px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "0 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-brand)",
      borderRadius: "var(--radius-2xl)",
      padding: "64px 56px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -60,
      bottom: -80,
      width: 320,
      height: 280,
      background: "rgba(255,255,255,0.12)",
      borderRadius: "var(--radius-blob)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    light: true
  }, t.ctaBand.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 46,
      letterSpacing: "-0.02em",
      color: "#fff",
      margin: "16px 0 0",
      maxWidth: 620,
      lineHeight: 1.05
    }
  }, t.ctaBand.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 18,
      color: "rgba(255,255,255,0.92)",
      marginTop: 16,
      maxWidth: 520,
      lineHeight: 1.6
    }
  }, t.ctaBand.body), /*#__PURE__*/React.createElement("button", {
    onClick: onStart,
    className: "bp-btn-press",
    style: {
      marginTop: 28,
      padding: "16px 30px",
      border: "none",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-inverse)",
      color: "#fff",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 17,
      cursor: "pointer",
      boxShadow: "var(--shadow-lg)"
    }
  }, t.ctaBand.button)))));
}
window.BPSections = {
  Eyebrow,
  Stat,
  Services,
  Process,
  CTABand
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
/* BP4 marketing-site shell: header (with ES/EN toggle), hero, footer,
   contact modal + app. Bilingual via window.BPStrings. */

const {
  Eyebrow,
  Stat,
  Services,
  Process,
  CTABand
} = window.BPSections;
function LangToggle({
  lang,
  setLang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      background: "var(--bp-neutral-100)",
      borderRadius: "var(--radius-pill)",
      padding: 3
    }
  }, ["es", "en"].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => setLang(l),
    style: {
      border: "none",
      cursor: "pointer",
      padding: "6px 13px",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 13,
      background: lang === l ? "var(--surface-card)" : "transparent",
      color: lang === l ? "var(--text-strong)" : "var(--text-muted)",
      boxShadow: lang === l ? "var(--shadow-xs)" : "none",
      transition: "all var(--duration-normal) var(--ease-standard)"
    }
  }, l.toUpperCase())));
}
function Header({
  t,
  lang,
  setLang,
  onStart
}) {
  const [active, setActive] = React.useState(0);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "rgba(248,250,250,0.82)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "14px 32px",
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logos/bp4-logo-orange.png",
    alt: "bp4",
    style: {
      height: 38,
      width: "auto"
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 4,
      marginLeft: 4
    }
  }, t.nav.map((n, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setActive(i),
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      padding: "8px 13px",
      fontFamily: "var(--font-body)",
      fontSize: 15,
      fontWeight: active === i ? 600 : 500,
      color: active === i ? "var(--text-strong)" : "var(--text-muted)",
      borderRadius: "var(--radius-sm)",
      whiteSpace: "nowrap"
    }
  }, n))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(LangToggle, {
    lang: lang,
    setLang: setLang
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 15,
      color: "var(--text-strong)",
      whiteSpace: "nowrap"
    }
  }, t.login), /*#__PURE__*/React.createElement("button", {
    onClick: onStart,
    className: "bp-btn-press",
    style: {
      padding: "11px 20px",
      border: "none",
      borderRadius: "var(--radius-lg)",
      background: "var(--color-brand)",
      color: "#fff",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 15,
      cursor: "pointer",
      boxShadow: "var(--shadow-brand)",
      whiteSpace: "nowrap"
    }
  }, t.cta))));
}
function Hero({
  t,
  onStart
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "84px 0 72px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "0 32px",
      display: "grid",
      gridTemplateColumns: "1.15fr 0.85fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, t.hero.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 64,
      lineHeight: 1.0,
      letterSpacing: "-0.03em",
      color: "var(--text-strong)",
      margin: "20px 0 0"
    }
  }, t.hero.title1, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic",
      color: "var(--color-brand)"
    }
  }, t.hero.title2)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 19,
      color: "var(--text-body)",
      marginTop: 22,
      maxWidth: 480,
      lineHeight: 1.6
    }
  }, t.hero.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onStart,
    className: "bp-btn-press",
    style: {
      padding: "15px 28px",
      border: "none",
      borderRadius: "var(--radius-lg)",
      background: "var(--color-brand)",
      color: "#fff",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 16,
      cursor: "pointer",
      boxShadow: "var(--shadow-brand)"
    }
  }, t.cta), /*#__PURE__*/React.createElement("button", {
    className: "bp-btn-press",
    style: {
      padding: "15px 28px",
      borderRadius: "var(--radius-lg)",
      background: "transparent",
      border: "2px solid var(--border-default)",
      color: "var(--text-strong)",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 16,
      cursor: "pointer"
    }
  }, t.hero.secondary)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 44,
      marginTop: 48
    }
  }, t.stats.map(([v, l], i) => /*#__PURE__*/React.createElement(Stat, {
    key: i,
    value: v,
    label: l
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 420,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--bp-orange-50)",
      borderRadius: "var(--radius-blob)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      width: 280,
      height: 240,
      right: 0,
      top: 30,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-lg)",
      padding: 22,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "var(--bp-orange-100)",
      color: "var(--bp-orange-700)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
      fontWeight: 700
    }
  }, "SR"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 15,
      color: "var(--text-strong)"
    }
  }, "Sof\xEDa Ram\xEDrez"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, t.hero.role))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--border-subtle)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, ["Go", "Kubernetes", t.lang === "en" ? "Remote" : "Remoto"].map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 12,
      fontWeight: 600,
      padding: "4px 10px",
      borderRadius: "var(--radius-pill)",
      background: "var(--bp-neutral-100)",
      color: "var(--text-body)"
    }
  }, tag))), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "auto",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      fontWeight: 600,
      padding: "5px 11px",
      borderRadius: "var(--radius-pill)",
      background: "var(--bp-teal-50)",
      color: "var(--bp-teal-700)",
      alignSelf: "flex-start",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 14,
      height: 14
    }
  }), " ", t.hero.match)), /*#__PURE__*/React.createElement("img", {
    src: "assets/logos/bp4-logo-orange.png",
    alt: "",
    style: {
      position: "absolute",
      left: 4,
      bottom: 24,
      width: 120,
      opacity: 0.95
    }
  }))));
}
function Footer({
  t
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-inverse)",
      padding: "56px 0 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "0 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 280
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logos/bp4-logo-white.png",
    alt: "bp4",
    style: {
      height: 40
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "rgba(255,255,255,0.6)",
      marginTop: 16,
      lineHeight: 1.6
    }
  }, t.footer.tagline)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 64
    }
  }, t.footer.cols.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 14,
      color: "#fff",
      marginBottom: 14,
      letterSpacing: "0.04em",
      textTransform: "uppercase"
    }
  }, col.h), col.items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    style: {
      display: "block",
      fontFamily: "var(--font-body)",
      fontSize: 14,
      color: "rgba(255,255,255,0.65)",
      textDecoration: "none",
      padding: "5px 0"
    }
  }, it)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "40px auto 0",
      padding: "0 32px",
      borderTop: "1px solid rgba(255,255,255,0.12)",
      paddingTop: 22,
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "rgba(255,255,255,0.45)"
    }
  }, t.footer.legal));
}
function Field({
  label,
  placeholder
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      padding: "11px 14px",
      borderRadius: "var(--radius-md)",
      border: `2px solid ${focus ? "var(--color-brand)" : "var(--border-default)"}`,
      outline: "none",
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "var(--text-strong)",
      boxShadow: focus ? "0 0 0 4px var(--bp-orange-100)" : "none",
      transition: "all var(--duration-normal) var(--ease-standard)"
    }
  }));
}
function ContactModal({
  t,
  open,
  onClose
}) {
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => {
    if (open) setSent(false);
  }, [open]);
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [sent, open]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 50,
      background: "rgba(14,53,65,0.55)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      animation: "bpFade 200ms ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-2xl)",
      padding: 36,
      width: 440,
      maxWidth: "100%",
      boxShadow: "var(--shadow-xl)",
      animation: "bpPop 280ms cubic-bezier(0.34,1.56,0.64,1)"
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: "var(--bp-teal-50)",
      color: "var(--bp-teal-700)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 18px"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 32,
      height: 32
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 24,
      color: "var(--text-strong)",
      margin: 0
    }
  }, t.modal.successTitle), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "var(--text-body)",
      marginTop: 10
    }
  }, t.modal.successBody), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "bp-btn-press",
    style: {
      marginTop: 22,
      padding: "12px 24px",
      border: "none",
      borderRadius: "var(--radius-lg)",
      background: "var(--color-brand)",
      color: "#fff",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 15,
      cursor: "pointer"
    }
  }, t.modal.close)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 26,
      color: "var(--text-strong)",
      margin: 0,
      letterSpacing: "-0.01em"
    }
  }, t.modal.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "var(--text-body)",
      marginTop: 8
    }
  }, t.modal.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      marginTop: 22
    }
  }, t.modal.fields.map((f, i) => /*#__PURE__*/React.createElement(Field, {
    key: i,
    label: f.label,
    placeholder: f.ph
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSent(true),
    className: "bp-btn-press",
    style: {
      marginTop: 24,
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "var(--radius-lg)",
      background: "var(--color-brand)",
      color: "#fff",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 16,
      cursor: "pointer",
      boxShadow: "var(--shadow-brand)"
    }
  }, t.modal.submit))));
}
function App() {
  const [lang, setLang] = React.useState(() => localStorage.getItem("bp4-lang") || "es");
  const [modal, setModal] = React.useState(false);
  const t = {
    ...window.BPStrings[lang],
    lang
  };
  React.useEffect(() => {
    localStorage.setItem("bp4-lang", lang);
  }, [lang]);
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [lang, modal]);
  document.documentElement.lang = lang === "en" ? "en" : "es-419";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    t: t,
    lang: lang,
    setLang: setLang,
    onStart: () => setModal(true)
  }), /*#__PURE__*/React.createElement(Hero, {
    t: t,
    onStart: () => setModal(true)
  }), /*#__PURE__*/React.createElement(Services, {
    t: t
  }), /*#__PURE__*/React.createElement(Process, {
    t: t
  }), /*#__PURE__*/React.createElement(CTABand, {
    t: t,
    onStart: () => setModal(true)
  }), /*#__PURE__*/React.createElement(Footer, {
    t: t
  }), /*#__PURE__*/React.createElement(ContactModal, {
    t: t,
    open: modal,
    onClose: () => setModal(false)
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
window.lucide && window.lucide.createIcons();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/strings.js
try { (() => {
/* BP4 — bilingual copy layer (es-419 Latinoamérica · en).
   Centralizes every user-facing string for the marketing-site UI kit.
   Exposed on window.BPStrings. Toggle drives the whole site. */

window.BPStrings = {
  es: {
    label: "ES",
    nav: ["Servicios", "Cómo trabajamos", "Nosotros", "Contacto"],
    login: "Ingresar",
    cta: "Armemos tu equipo",
    hero: {
      eyebrow: "Staffing IT · +13 años",
      title1: "Tu equipo de software,",
      title2: "listo para crecer",
      body: "Sumamos perfiles tech evaluados en profundidad, con selección ágil y acompañamiento cultural. Sabés exactamente dónde está tu inversión.",
      secondary: "Ver cómo trabajamos",
      role: "Senior Backend · Go",
      match: "Match cultural 96%"
    },
    stats: [["+13", "años de experiencia"], ["+500", "perfiles ubicados"], ["94%", "de retención"]],
    services: {
      eyebrow: "Qué hacemos",
      title: "Aceleramos la expansión de tu equipo",
      body: "Más de 13 años ayudando a empresas de software a crecer con el talento correcto.",
      items: [{
        title: "Staffing especializado en IT",
        body: "Sumamos a tu equipo perfiles tech evaluados en profundidad, listos para rendir desde el día uno."
      }, {
        title: "Selección ágil",
        body: "Procesos rápidos y prolijos. Te presentamos candidatos que de verdad encajan, sin vueltas."
      }, {
        title: "Acompañamiento cultural",
        body: "Cuidamos el match cultural y la retención con planes de desarrollo para cada persona."
      }]
    },
    process: {
      eyebrow: "Cómo trabajamos",
      title: "Simple, ágil y con buena onda",
      steps: [{
        title: "Nos contás",
        body: "Qué equipo querés armar, qué stack y qué cultura buscás."
      }, {
        title: "Buscamos y evaluamos",
        body: "Filtramos perfiles en profundidad, técnica y culturalmente."
      }, {
        title: "Te presentamos",
        body: "Solo candidatos que encajan. Vos elegís, nosotros coordinamos."
      }, {
        title: "Acompañamos",
        body: "Planes de desarrollo y reportes claros para optimizar la inversión."
      }]
    },
    ctaBand: {
      eyebrow: "Empecemos",
      title: "Armemos tu equipo de software, juntos.",
      body: "Contanos qué buscás y te respondemos en 24 horas. ¡Vamos!",
      button: "Armemos tu equipo"
    },
    footer: {
      tagline: "Aceleramos la expansión de equipos de software. Con buena onda, desde hace +13 años.",
      cols: [{
        h: "Servicios",
        items: ["Staffing IT", "Selección ágil", "Acompañamiento"]
      }, {
        h: "Empresa",
        items: ["Nosotros", "Cultura", "Contacto"]
      }],
      legal: "© 2026 BP4 · Hecho con buena onda."
    },
    modal: {
      title: "Armemos tu equipo",
      body: "Contanos qué buscás y nos ponemos en campaña.",
      fields: [{
        label: "Tu nombre",
        ph: "¿Cómo te llamás?"
      }, {
        label: "Email de trabajo",
        ph: "vos@empresa.com"
      }, {
        label: "¿Qué equipo querés armar?",
        ph: "Ej: 2 devs Go + 1 QA, remoto"
      }],
      submit: "Enviar",
      successTitle: "¡Listo!",
      successBody: "Te respondemos en 24hs. ¡Gracias por escribirnos!",
      close: "Cerrar"
    }
  },
  en: {
    label: "EN",
    nav: ["Services", "How we work", "About", "Contact"],
    login: "Log in",
    cta: "Let's build your team",
    hero: {
      eyebrow: "IT Staffing · 13+ years",
      title1: "Your software team,",
      title2: "ready to grow",
      body: "We add deeply-vetted tech profiles with agile hiring and cultural support — so you know exactly where your investment stands.",
      secondary: "See how we work",
      role: "Senior Backend · Go",
      match: "96% culture match"
    },
    stats: [["13+", "years of experience"], ["500+", "roles filled"], ["94%", "retention"]],
    services: {
      eyebrow: "What we do",
      title: "We accelerate your team's growth",
      body: "Over 13 years helping software companies scale with the right talent.",
      items: [{
        title: "Specialized IT staffing",
        body: "We add deeply-vetted tech profiles to your team, ready to perform from day one."
      }, {
        title: "Agile hiring",
        body: "Fast, tidy processes. We bring you candidates who truly fit — no run-around."
      }, {
        title: "Cultural support",
        body: "We protect culture match and retention with a growth plan for every person."
      }]
    },
    process: {
      eyebrow: "How we work",
      title: "Simple, agile and full of good vibes",
      steps: [{
        title: "You tell us",
        body: "The team you want to build, the stack and the culture you're after."
      }, {
        title: "We source & vet",
        body: "We screen profiles in depth — technically and culturally."
      }, {
        title: "We introduce",
        body: "Only candidates who fit. You choose, we coordinate."
      }, {
        title: "We stay with you",
        body: "Growth plans and clear reports to optimize your investment."
      }]
    },
    ctaBand: {
      eyebrow: "Let's start",
      title: "Let's build your software team, together.",
      body: "Tell us what you need and we'll reply within 24 hours. Let's go!",
      button: "Let's build your team"
    },
    footer: {
      tagline: "We accelerate the growth of software teams. With good vibes, for 13+ years.",
      cols: [{
        h: "Services",
        items: ["IT Staffing", "Agile hiring", "Cultural support"]
      }, {
        h: "Company",
        items: ["About", "Culture", "Contact"]
      }],
      legal: "© 2026 BP4 · Made with good vibes."
    },
    modal: {
      title: "Let's build your team",
      body: "Tell us what you're after and we'll get to work.",
      fields: [{
        label: "Your name",
        ph: "What's your name?"
      }, {
        label: "Work email",
        ph: "you@company.com"
      }, {
        label: "What team do you want to build?",
        ph: "e.g. 2 Go devs + 1 QA, remote"
      }],
      submit: "Send",
      successTitle: "Done!",
      successBody: "We'll reply within 24h. Thanks for reaching out!",
      close: "Close"
    }
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/strings.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
