"use client";
import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import { HeroIcon } from "@/components/ui/hero-icon";
import { Button } from "@/components/ui/button";

import type { ChangeEvent, KeyboardEvent } from "react";
import type { Variants } from "framer-motion";
type SearchBarProps = {
  placeholder: string;
  className?: string;
  centerPlaceHolder?: boolean;
};

const XVariant: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.4 },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.2 },
  },
};

export function SearchBar({
  placeholder,
  className,
  centerPlaceHolder = false,
}: SearchBarProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const [showXMark, setShowXMark] = useState<boolean>(false);

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      isFocused ? setShowXMark(true) : setShowXMark(false);
    }, 50);
  }, [isFocused]);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => setInputValue(value);

  const clearInputValue = (escapeInput?: boolean) => {
    setInputValue("");

    if (inputRef.current) {
      escapeInput ? inputRef.current.blur() : inputRef.current.focus();
    }
  };

  const handleEscape = ({ key }: KeyboardEvent<HTMLInputElement>): void => {
    if (key === "Escape") clearInputValue(true);
  };

  return (
    <label
      className={cn(
        "group flex items-center justify-between gap-4 rounded-full px-4 py-2 transition relative focus-within:ring-2 focus-within:ring-main-accent dark:focus-within:ring-main-accent",
        className ?? "bg-main-background-2 focus-within:bg-main-background-1"
      )}
    >
      {!isFocused && inputValue.length == 0 && centerPlaceHolder && (
        <span className="pointer-events-none w-full text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 text-light-secondary dark:text-dark-secondary">
          <i>
            <HeroIcon
              className="h-4 w-4 text-light-secondary transition-colors dark:text-dark-secondary"
              iconName="MagnifyingGlassIcon"
            />
          </i>
          {placeholder}
        </span>
      )}
      {(isFocused || inputValue.length != 0 || !centerPlaceHolder) && (
        <i>
          <HeroIcon
            className="h-5 w-5 text-light-secondary transition-colors 
                       group-focus-within:text-main-accent dark:text-dark-secondary"
            iconName="MagnifyingGlassIcon"
          />
        </i>
      )}
      <input
        className="peer flex-1 bg-transparent outline-none placeholder:text-light-secondary dark:placeholder:text-dark-secondary"
        type="text"
        placeholder={centerPlaceHolder ? "" : placeholder}
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onKeyUp={handleEscape}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <AnimatePresence>
        {showXMark && inputValue.length && (
          <motion.div {...XVariant}>
            <Button
              className={cn(
                "accent-tab bg-main-accent p-1 transition hover:brightness-90"
              )}
              onClick={() => clearInputValue()}
            >
              <HeroIcon
                className="h-3 w-3 stroke-white pointer-events-none"
                iconName="XMarkIcon"
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </label>
  );
}
