import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Juliuswadi Cha Raja",
    short_name: "JCR",
    description:
      "Official website of Juliuswadi Cha Raja Ganpati Mandal.",

    start_url: "/",

    display: "standalone",

    background_color: "#FFF8F2",

    theme_color: "#ea580c",

    icons: [
      {
        src: "/logo/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}