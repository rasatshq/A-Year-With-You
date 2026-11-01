export interface TimelineItem {
  id: string;
  image: string;
  caption: string;
  dateLabel: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  subcaption?: string;
  aspect?: "portrait" | "landscape" | "square";
}

export interface ReasonItem {
  id: number;
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface AnniversaryData {
  projectName: string;
  tagline: string;
  anniversaryDate: string;
  partnerNickname: string;
  opening: {
    badge: string;
    heading: string;
    subheading: string;
    cta: string;
    replayCta: string;
  };
  hero: {
    badge: string;
    heading: string;
    tagline: string;
    primaryPhoto: string;
    cta: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    items: TimelineItem[];
  };
  gallery: {
    title: string;
    subtitle: string;
    items: GalleryItem[];
  };
  letter: {
    title: string;
    subtitle: string;
    envelopeLabel: string;
    cta: string;
    salutation: string;
    paragraphs: string[];
    signoff: string;
    signature: string;
  };
  reasons: {
    title: string;
    subtitle: string;
    items: ReasonItem[];
  };
  music: {
    title: string;
    subtitle: string;
    songTitle: string;
    artist: string;
    album: string;
    audioSrc: string;
    coverArt: string;
  };
  surprise: {
    initialTitle: string;
    initialSubtitle: string;
    buttonText: string;
    revealedTitle: string;
    revealedSubtitle: string;
    messageParagraphs: string[];
    highlight: string;
    photo: string;
  };
  closing: {
    title: string;
    subtitle: string;
    photo: string;
    paragraphs: string[];
    closingLove: string;
    signoff: string;
    footerText: string;
    date: string;
    replayText: string;
  };
}
