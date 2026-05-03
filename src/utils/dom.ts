export function createElement(
  tag: string,
  className?: string,
  attributes?: Record<string, string>,
  children?: (HTMLElement | string)[],
): HTMLElement {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }
  if (children) {
    children.forEach((child) => {
      if (typeof child === "string") {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child);
      }
    });
  }
  return el;
}

export function addClasses(el: HTMLElement, ...classNames: string[]): void {
  el.classList.add(...classNames);
}

export function removeClasses(el: HTMLElement, ...classNames: string[]): void {
  el.classList.remove(...classNames);
}

export function toggleClass(el: HTMLElement, className: string, force?: boolean): void {
  el.classList.toggle(className, force);
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
