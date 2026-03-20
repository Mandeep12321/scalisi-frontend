import classes from "./button.module.css";

export const Button = ({
  label,
  customStyle,
  secondaryButton,
  onClick,
  disabled = false,
  children,
  className,
  leftIcon,
  rightIcon,
  variant = "primary",
  loading = false,
  type,
  ...props
}) => {
  const buttonClasses = [
    classes.btn,
    disabled && classes.disabled,
    secondaryButton && classes.secondaryBtn,
    classes[variant],
    className,
  ].join(" ");

  return (
    <button
      className={buttonClasses}
      style={customStyle}
      onClick={onClick}
      disabled={disabled}
      {...props}
      type={type}
    >
      {loading && (
        <div
          className={["spinner-border", classes.spinnerBorder].join(" ")}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {leftIcon && leftIcon}
      {label && label}
      {children && children}
      {rightIcon && rightIcon}
    </button>
  );
};
