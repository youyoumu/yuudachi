import { applyThemeFromImage, BING_WALLPAPER_URL } from "../lib/wallpaper";

export default function Hero() {
  return (
    <div class="relative h-[30vh] w-full overflow-hidden">
      <img
        src={BING_WALLPAPER_URL}
        crossorigin="anonymous"
        onLoad={(event) => applyThemeFromImage(event.currentTarget)}
        class="h-full w-full object-cover"
        alt=""
      />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--md-sys-color-surface)]" />
    </div>
  );
}
