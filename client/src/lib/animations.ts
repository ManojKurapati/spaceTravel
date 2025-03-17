import { type Variants } from 'framer-motion';

// Basic animations
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number): Variants => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
};

export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number): Variants => {
  return {
    hidden: {
      y: direction === 'up' ? 70 : direction === 'down' ? -70 : 0,
      x: direction === 'left' ? 70 : direction === 'right' ? -70 : 0,
      opacity: 0
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        delay,
      }
    }
  };
};

// Stagger container for children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Card animations
export const cardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0, 240, 255, 0)'
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 0px 20px rgba(0, 240, 255, 0.3)'
  }
};

// Button animations
export const pulseAnimation: Variants = {
  rest: {
    scale: 1
  },
  hover: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

// Orbit animation
export const orbitAnimation: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      ease: 'linear',
      repeat: Infinity
    }
  }
};

// Floating animation
export const floatAnimation: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
};

// Countdown timer animation
export const countdownAnimation: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Neon glow pulse animation
export const neonPulse: Variants = {
  animate: {
    boxShadow: [
      '0 0 5px rgba(0, 240, 255, 0.5), 0 0 10px rgba(0, 240, 255, 0.3)',
      '0 0 15px rgba(0, 240, 255, 0.7), 0 0 25px rgba(0, 240, 255, 0.5)',
      '0 0 5px rgba(0, 240, 255, 0.5), 0 0 10px rgba(0, 240, 255, 0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Page transition animations
export const pageTransition = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  }
};

// AI typing animation for chat messages
export const typingAnimation: Variants = {
  initial: { width: 0 },
  animate: { 
    width: '100%',
    transition: { 
      duration: 1.5, 
      ease: 'easeInOut'
    }
  }
};
