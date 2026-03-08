"use client"

import { useState } from "react"
import { Play, ExternalLink, X } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"

const mediaItems = [
  {
    type: "video",
    title: { 
      en: "Talk & Tore: Katzer Interview", 
      de: "Talk & Tore: Katzer Interview" 
    },
    source: "YouTube",
    youtubeId: "iN8Iop4ZHzs",
    url: "https://www.youtube.com/watch?v=iN8Iop4ZHzs",
    thumbnail: "https://img.youtube.com/vi/iN8Iop4ZHzs/maxresdefault.jpg",
    description: { 
      en: "Exclusive interview with Markus Katzer about SK Rapid Wien", 
      de: "Exklusives Interview mit Markus Katzer über SK Rapid Wien" 
    },
  },
  {
    type: "video",
    title: { 
      en: "Markus Katzer Interview", 
      de: "Markus Katzer Interview" 
    },
    source: "YouTube",
    youtubeId: "pmQSWriv0JU",
    url: "https://www.youtube.com/watch?v=pmQSWriv0JU",
    thumbnail: "https://img.youtube.com/vi/pmQSWriv0JU/maxresdefault.jpg",
    description: { 
      en: "Discussion about his role at SK Rapid Wien", 
      de: "Diskussion über seine Rolle bei SK Rapid Wien" 
    },
  },
  {
    type: "video",
    title: { 
      en: "CEO Sports Talk - Markus Katzer", 
      de: "CEO Sports Talk - Markus Katzer" 
    },
    source: "YouTube",
    youtubeId: "FHdRBtT9Nmw",
    url: "https://www.youtube.com/watch?v=FHdRBtT9Nmw",
    thumbnail: "https://img.youtube.com/vi/FHdRBtT9Nmw/maxresdefault.jpg",
    description: { 
      en: "Strategic insights on football management and development", 
      de: "Strategische Einblicke in Fußballmanagement und Entwicklung" 
    },
  },
  {
    type: "video",
    title: { 
      en: "Insights on Austrian Football", 
      de: "Einblicke in österreichischen Fußball" 
    },
    source: "YouTube",
    youtubeId: "v3IAQ309so4",
    url: "https://www.youtube.com/watch?v=v3IAQ309so4",
    thumbnail: "https://img.youtube.com/vi/v3IAQ309so4/maxresdefault.jpg",
    description: { 
      en: "Markus Katzer shares insights on Austrian football landscape", 
      de: "Markus Katzer teilt Einblicke in die österreichische Fußballlandschaft" 
    },
  },
  {
    type: "video",
    title: { 
      en: "Rapid's Strategy & Future", 
      de: "Rapids Strategie & Zukunft" 
    },
    source: "YouTube",
    youtubeId: "CXJIXC08eDQ",
    url: "https://www.youtube.com/watch?v=CXJIXC08eDQ",
    thumbnail: "https://img.youtube.com/vi/CXJIXC08eDQ/maxresdefault.jpg",
    description: { 
      en: "Discussion on SK Rapid Wien's strategic direction", 
      de: "Diskussion über die strategische Ausrichtung von SK Rapid Wien" 
    },
  },
  {
    type: "video",
    title: { 
      en: "Player Development & Talent", 
      de: "Spielerentwicklung & Talent" 
    },
    source: "YouTube",
    youtubeId: "jqYBE8sotec",
    url: "https://www.youtube.com/watch?v=jqYBE8sotec",
    thumbnail: "https://img.youtube.com/vi/jqYBE8sotec/maxresdefault.jpg",
    description: { 
      en: "Focus on youth development and talent management at Rapid", 
      de: "Fokus auf Nachwuchsentwicklung und Talentmanagement bei Rapid" 
    },
  },
]

const galleryImages = [
  {
    id: 1,
    src: "https://derivates.kicker.de/image/upload/c_crop%2Cx_0%2Cy_0%2Cw_1500%2Ch_844/w_1000%2Cq_auto/v1/2023/05/26/6d6fbf72-3d27-4575-852a-3a5c327d888d.jpeg",
    alt: { en: "Markus Katzer - SK Rapid Wien CEO", de: "Markus Katzer - CEO von SK Rapid Wien" },
    caption: { en: "Professional Portrait", de: "Professionelles Porträt" },
    description: { en: "Markus Katzer, CEO Sports at SK Rapid Wien", de: "Markus Katzer, CEO Sports bei SK Rapid Wien" },
    relatedMediaIndices: [0, 1],
  },
  {
    id: 2,
    src: "https://www.ligaportal.at/bundesliga/images/24-25/sk-rapid/katzer-markus-rapid-gepa-ringsmuth.jpg",
    alt: { en: "Markus Katzer at SK Rapid Wien", de: "Markus Katzer bei SK Rapid Wien" },
    caption: { en: "At the Club", de: "Im Verein" },
    description: { en: "Markus Katzer during his work at SK Rapid Wien", de: "Markus Katzer während seiner Arbeit bei SK Rapid Wien" },
    relatedMediaIndices: [2, 3],
  },
  {
    id: 3,
    src: "https://derivates.kicker.de/image/upload/w_1333,h_1000,c_fill,g_auto:subject/v1/2023/11/25/1ecbe490-d15c-4d17-893e-463473cec24e.jpeg",
    alt: { en: "Markus Katzer Interview", de: "Markus Katzer Interview" },
    caption: { en: "Leadership & Vision", de: "Führung & Vision" },
    description: { en: "Discussing leadership and strategic vision for Austrian football", de: "Diskussion über Führung und strategische Vision für österreichischen Fußball" },
    relatedMediaIndices: [4],
  },
  {
    id: 4,
    src: "https://www.firstviennafc.at/bilder/library/img-16260-header.jpg?1672412094",
    alt: { en: "Austrian Football Scene", de: "Österreichische Fußballszene" },
    caption: { en: "In Action", de: "Im Einsatz" },
    description: { en: "Markus Katzer active in the Austrian football scene", de: "Markus Katzer aktiv in der österreichischen Fußballszene" },
    relatedMediaIndices: [5],
  },
]

export function MediaSection() {
  const { language } = useLanguage()
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<typeof galleryImages[0] | null>(null)
  
  const getTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; de: string }> = {
      video: { en: "Video", de: "Video" },
      podcast: { en: "Podcast", de: "Podcast" },
      article: { en: "Article", de: "Artikel" },
      interview: { en: "Interview", de: "Interview" },
    }
    return labels[type]?.[language] || type
  }
  
  return (
    <section id="media" className="section-gap px-0">
      <div className="page-container">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">
            {language === "en" ? "Press & Videos" : "Presse & Videos"}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 tracking-tight">
            {language === "en" ? "MEDIA" : "MEDIEN"}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
            {language === "en" 
              ? "Selected interviews, podcasts and media appearances about sporting strategy and development at SK Rapid Wien."
              : "Ausgewählte Interviews, Podcasts und Medienauftritte über sportliche Strategie und die Entwicklung bei SK Rapid Wien."
            }
          </p>
        </div>

        {/* Video/Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mediaItems.map((item, index) => (
            <div 
              key={index} 
              className="group block"
            >
              <div className="overflow-hidden border border-border hover:border-primary/50 transition-all">
                {item.youtubeId ? (
                  <div className="relative w-full bg-black">
                    <iframe
                      width="100%"
                      height="280"
                      src={`https://www.youtube.com/embed/${item.youtubeId}`}
                      title={item.title[language]}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-auto"
                    ></iframe>
                  </div>
                ) : (
                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative aspect-video bg-secondary">
                      <Image
                        src={item.thumbnail}
                        alt={item.title[language]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.type === "video" || item.type === "podcast" ? (
                          <div className="h-16 w-16 bg-primary flex items-center justify-center">
                            <Play className="h-8 w-8 text-primary-foreground" fill="currentColor" />
                          </div>
                        ) : (
                          <div className="h-16 w-16 bg-primary flex items-center justify-center">
                            <ExternalLink className="h-8 w-8 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-bold px-3 py-1.5 bg-primary text-primary-foreground uppercase tracking-widest">
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                    </div>
                  </a>
                )}
                <div className="p-6 bg-card">
                  <p className="text-xs text-primary font-bold tracking-widest uppercase mb-2">{item.source}</p>
                  <h3 className="font-black text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title[language]}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {item.description[language]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Gallery */}
        <div>
          <h3 className="text-2xl font-black mb-8 text-foreground uppercase tracking-tight">
            {language === "en" ? "Gallery" : "Galerie"}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedGalleryItem(image)}
                className="group relative aspect-square overflow-hidden cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={typeof image.alt === "string" ? image.alt : image.alt[language]}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-sm text-foreground font-bold uppercase tracking-wider">
                    {typeof image.caption === "string" ? image.caption : image.caption[language]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Detail Modal */}
        <Dialog open={!!selectedGalleryItem} onOpenChange={(open) => !open && setSelectedGalleryItem(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedGalleryItem && (
              <>
                <DialogTitle className="sr-only">
                  {typeof selectedGalleryItem.caption === "string" 
                    ? selectedGalleryItem.caption 
                    : selectedGalleryItem.caption[language]}
                </DialogTitle>
                <div className="space-y-6">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={selectedGalleryItem.src}
                    alt={typeof selectedGalleryItem.alt === "string" ? selectedGalleryItem.alt : selectedGalleryItem.alt[language]}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-black mb-2">
                      {typeof selectedGalleryItem.caption === "string" 
                        ? selectedGalleryItem.caption 
                        : selectedGalleryItem.caption[language]}
                    </h2>
                    <p className="text-muted-foreground">
                      {selectedGalleryItem.description[language]}
                    </p>
                  </div>

                  {selectedGalleryItem.relatedMediaIndices && selectedGalleryItem.relatedMediaIndices.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h3 className="text-lg font-bold mb-4">
                        {language === "en" ? "Related Media" : "Verwandte Medien"}
                      </h3>
                      <div className="space-y-3">
                        {selectedGalleryItem.relatedMediaIndices.map((mediaIndex) => {
                          const relatedMedia = mediaItems[mediaIndex]
                          return (
                            <a
                              key={mediaIndex}
                              href={relatedMedia.youtubeId ? `https://www.youtube.com/watch?v=${relatedMedia.youtubeId}` : "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-4 bg-secondary hover:bg-secondary/80 transition-colors rounded-lg group"
                            >
                              <div className="flex items-start gap-3">
                                <div className="h-8 w-8 bg-primary flex items-center justify-center flex-shrink-0 rounded">
                                  <Play className="h-4 w-4 text-primary-foreground" fill="currentColor" />
                                </div>
                                <div>
                                  <p className="text-xs text-primary font-bold tracking-widest uppercase mb-1">
                                    {relatedMedia.source}
                                  </p>
                                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                                    {relatedMedia.title[language]}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {relatedMedia.description[language]}
                                  </p>
                                </div>
                              </div>
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
