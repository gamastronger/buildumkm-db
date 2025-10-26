import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({ src, alt, className = '', wrapperClassName = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const currentRef = imgRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${wrapperClassName}`}>
      {isInView && (
        <>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-50 animate-pulse"
          />
          <motion.img
            src={src}
            alt={alt}
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onLoad={() => setIsLoaded(true)}
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;
