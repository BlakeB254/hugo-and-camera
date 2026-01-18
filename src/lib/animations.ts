// Animation configurations for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// Lowrider bounce easing - mimics hydraulics
export const lowriderBounce = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

// Smooth chrome slide
export const chromeSlide = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
};

// Graffiti text reveal
export const graffitiReveal = {
  initial: {
    opacity: 0,
    scale: 0.5,
    filter: "blur(10px)"
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)"
  },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
};

// Pinstripe draw animation
export const pinstripeReveal = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: {
    pathLength: { duration: 2, ease: "easeInOut" },
    opacity: { duration: 0.5 },
  },
};

// Gallery card hover
export const galleryCardHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  },
};

// Image shine effect
export const shineEffect = {
  initial: { x: "-200%" },
  animate: {
    x: "200%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 3,
    }
  },
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    }
  },
};

// Lightbox animation
export const lightboxAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    }
  },
};
