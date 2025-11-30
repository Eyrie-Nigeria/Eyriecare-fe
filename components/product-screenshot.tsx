"use client";

import { motion } from "framer-motion";

interface ProductScreenshotProps {
  title: string;
  description: string;
  imageUrl?: string;
  className?: string;
}

export function ProductScreenshot({
  title,
  description,
  imageUrl,
  className,
}: ProductScreenshotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="bg-white rounded-lg shadow-xl border overflow-hidden" style={{ borderColor: 'var(--color-soft-grey)' }}>
        <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b" style={{ borderColor: 'var(--color-soft-grey)' }}>
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="aspect-video bg-gradient-to-br from-sky-mist to-white flex items-center justify-center p-8">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-eyrie-blue/10 flex items-center justify-center">
                <span className="text-4xl">📋</span>
              </div>
              <p className="text-gray-500 text-sm">{title}</p>
              <p className="text-gray-400 text-xs mt-2">{description}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

