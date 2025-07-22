import { motion } from 'framer-motion';

const defaultAnimations = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.3
    }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const fadeInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const bounceVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  }
};

const AnimatedElement = ({ 
  children, 
  className = '', 
  variant = 'default', 
  delay = 0,
  duration,
  viewport = { once: true, amount: 0.3 },
  ...props 
}) => {
  let selectedVariant;
  
  switch(variant) {
    case 'fadeIn':
      selectedVariant = fadeInVariants;
      break;
    case 'fadeInUp':
      selectedVariant = fadeInUpVariants;
      break;
    case 'fadeInLeft':
      selectedVariant = fadeInLeftVariants;
      break;
    case 'fadeInRight':
      selectedVariant = fadeInRightVariants;
      break;
    case 'scale':
      selectedVariant = scaleVariants;
      break;
    case 'bounce':
      selectedVariant = bounceVariants;
      break;
    default:
      selectedVariant = defaultAnimations;
  }
  
  // Apply custom duration if provided
  if (duration) {
    selectedVariant = {
      ...selectedVariant,
      visible: {
        ...selectedVariant.visible,
        transition: {
          ...selectedVariant.visible.transition,
          duration
        }
      }
    };
  }
  
  // Apply delay if provided
  if (delay > 0) {
    selectedVariant = {
      ...selectedVariant,
      visible: {
        ...selectedVariant.visible,
        transition: {
          ...selectedVariant.visible.transition,
          delay
        }
      }
    };
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      variants={selectedVariant}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement;