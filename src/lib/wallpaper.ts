import {
  Hct,
  MaterialDynamicColors,
  SchemeTonalSpot,
  hexFromArgb,
  sourceColorFromImage,
} from "@material/material-color-utilities";

export const BING_WALLPAPER_URL =
  "https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN";

let themeSheet: CSSStyleSheet | null = null;

function getThemeSheet(): CSSStyleSheet {
  if (!themeSheet) {
    themeSheet = new CSSStyleSheet();
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, themeSheet];
  }
  return themeSheet;
}

export async function applyThemeFromImage(img: HTMLImageElement): Promise<void> {
  if (typeof document === "undefined") return;

  try {
    const source = await sourceColorFromImage(img);
    const scheme = new SchemeTonalSpot(Hct.fromInt(source), true, 0);
    const colors = new MaterialDynamicColors();

    const css = colors.allColors
      .map(
        (color) =>
          `--md-sys-color-${color.name.replaceAll("_", "-")}: ${hexFromArgb(color.getArgb(scheme))}`,
      )
      .join(";");

    getThemeSheet().replaceSync(`:root{${css}}`);
  } catch {
    // Keep the static theme if the image can't be read (e.g. tainted canvas).
  }
}
