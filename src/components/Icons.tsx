import type { JSX } from "@solidjs/web";

export type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

export function Pencil(props: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={props["stroke-width"] ?? 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class ?? "lucide lucide-pencil-icon lucide-pencil"}
    >
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

export function X(props: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={props["stroke-width"] ?? 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class ?? "lucide lucide-x-icon lucide-x"}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function RotateCcw(props: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={props["stroke-width"] ?? 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class ?? "lucide lucide-rotate-ccw-icon lucide-rotate-ccw"}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

export function Check(props: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={props["stroke-width"] ?? 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class ?? "lucide lucide-check-icon lucide-check"}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function RefreshCw(props: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={props["stroke-width"] ?? 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class ?? "lucide lucide-refresh-cw-icon lucide-refresh-cw"}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

export function Globe(props: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={props["stroke-width"] ?? 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class ?? "lucide lucide-globe-icon lucide-globe"}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
