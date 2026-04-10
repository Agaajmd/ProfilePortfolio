import { ImageResponse } from "next/og"
import { getProjectBySlug, resolveProjectImagePath } from "@/lib/projects"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  const title = project?.title ?? "Project"
  const description = project?.description ?? "Nur Jagad Muhammad Dani Portfolio"
  const projectImage = resolveProjectImagePath(project?.image ?? "/opengraph-image.png")
  const imageUrl = `https://nurjagadmuhammaddani.vercel.app${encodeURI(projectImage)}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            objectFit: "cover",
            opacity: 0.55,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(17,24,39,0.78) 45%, rgba(30,41,59,0.8) 100%)",
          }}
        />

        <img
          src="https://nurjagadmuhammaddani.vercel.app/Agaaa-logo.png"
          alt="Agaaa logo"
          width={180}
          height={180}
          style={{
            position: "absolute",
            top: 36,
            right: 36,
            borderRadius: 999,
            opacity: 0.95,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "56px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: "80%",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                fontSize: 24,
                opacity: 0.9,
              }}
            >
              Work Showcase
            </div>
            <div
              style={{
                fontSize: 62,
                lineHeight: 1.05,
                fontWeight: 700,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                opacity: 0.86,
                maxWidth: "90%",
              }}
            >
              {description.slice(0, 110)}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 28,
              opacity: 0.95,
              fontWeight: 600,
            }}
          >
            Nur Jagad Muhammad Dani
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
