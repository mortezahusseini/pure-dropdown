import classNames from "classnames";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useClickAway, useUpdateEffect } from "react-use";

import { DropdownProps, DropdownRef } from "./Dropdown.model";
import styles from "./Dropdown.module.scss";

export const Dropdown = forwardRef(function Dropdown(
  {
    content,
    containerClassName,
    children,
    open: propsOpen,
    scrollTarget: scrollTargetProp = "body",
    onClose,
    onOpen,
    boxClassName,
  }: DropdownProps,
  ref: ForwardedRef<DropdownRef>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(propsOpen ?? false);
  const [showOnTop, setShowOnTop] = useState(false);

  const isBoxShouldBeOnTop = useCallback((): boolean => {
    const scrollTarget = document.querySelector(scrollTargetProp);
    if (boxRef.current && scrollTarget) {
      const scrollTargetBounding = scrollTarget.getBoundingClientRect();
      const { bottom = 0 } =
        containerRef.current?.getBoundingClientRect() || {};
      const scrollTargetBottom =
        document.body.clientHeight - scrollTargetBounding.bottom;
      const dropdownWrapperBottom = document.body.clientHeight - bottom;
      const distanceOfDropdown = dropdownWrapperBottom - scrollTargetBottom;

      if (boxRef.current.clientHeight > distanceOfDropdown) {
        return true;
      }
    }
    return false;
  }, [scrollTargetProp]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const toggle = useCallback(() => {
    return isOpen ? close() : open();
  }, [isOpen, open, close]);

  useImperativeHandle(ref, () => ({ isOpen, open, close }), [
    close,
    isOpen,
    open,
  ]);

  useUpdateEffect(() => {
    return isOpen ? onOpen?.() : onClose?.();
  }, [isOpen]);

  useUpdateEffect(() => {
    setIsOpen(propsOpen ?? false);
  }, [propsOpen]);

  useEffect(() => {
    setShowOnTop(isBoxShouldBeOnTop());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) setShowOnTop(isBoxShouldBeOnTop()); 

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useClickAway(containerRef, () => {
    close();
  });   

  return (  
    <div
      className={classNames("relative", containerClassName)}
      ref={containerRef}
    >
      <div onClick={toggle} tabIndex={0} role="button" aria-pressed="false">
        {content}
      </div>

      <div
        className={classNames('rounded-xl overflow-y-auto', styles["box"], boxClassName, {
          [styles["box--on-top"]]: showOnTop,
          ["hidden"]: !isOpen,
        })}
        ref={boxRef}
      >
        {isOpen && children}
      </div>
    </div>
  );
});
