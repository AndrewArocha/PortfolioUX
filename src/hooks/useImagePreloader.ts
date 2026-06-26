// src/hooks/useImagePreloader.ts
import { useState, useEffect } from 'react';

export default function useImagePreloader(imageList: string[]) {
    const [imagesPreloaded, setImagesPreloaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isCancelled = false;
        let loadedCount = 0;

        async function loadImages() {
            const promises = imageList.map((src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    // Resolve on both load and error so a single broken image doesn't crash the app
                    img.onload = () => {
                        loadedCount++;
                        setProgress(Math.round((loadedCount / imageList.length) * 100));
                        resolve(true);
                    };
                    img.onerror = () => {
                        loadedCount++;
                        setProgress(Math.round((loadedCount / imageList.length) * 100));
                        resolve(true); 
                    };
                });
            });

            await Promise.all(promises);

            if (!isCancelled) {
                // Add a tiny 500ms artificial delay here just so the user can see 
                // the cool 100% loading bar before it vanishes
                setTimeout(() => setImagesPreloaded(true), 500);
            }
        }

        loadImages();

        return () => {
            isCancelled = true;
        };
    }, [imageList]);

    return { imagesPreloaded, progress };
}