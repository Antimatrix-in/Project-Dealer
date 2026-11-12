import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UPWORKS – Project Development Services",
    short_name: "UPWORKS",
    description: "Premier Engineering Research and Final Year Project Development Services",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F6FA",
    theme_color: "#101D38",
    icons: [
      {
        src: "/icon.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/images/upworks-icon.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

