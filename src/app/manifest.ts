import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Upwork Project Center",
    short_name: "Upwork Projects",
    description: "Premier Engineering Research and Final Year Project Guidance Center",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F1E7",
    theme_color: "#285A3B",
    icons: [
      {
        src: "/icon.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/images/upwork-project-center-icon.png",
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

