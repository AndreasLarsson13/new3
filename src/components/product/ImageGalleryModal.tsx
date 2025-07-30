// components/product/image-gallery-modal.tsx
import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa'; // För stängningsikonen
import Carousel from '@components/ui/carousel/carousel'; // Om du vill använda din befintliga Carousel
import { SwiperSlide } from 'swiper/react';

interface Image {
    original: string;
    // Lägg till andra bildfält om de finns, t.ex. 'thumbnail', 'altText'
}

interface ImageGalleryModalProps {
    images: Image[];
    isOpen: boolean;
    onClose: () => void;
    initialSlide?: number; // Om du vill att modalen ska öppnas på en specifik bild
}

const productGalleryModalResponsive = {
    '1024': {
        slidesPerView: 1,
    },
    '768': {
        slidesPerView: 1,
    },
    '0': {
        slidesPerView: 1,
    },
};

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
    images,
    isOpen,
    onClose,
    initialSlide = 0,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Stäng modalen vid klick utanför eller ESC-tangent
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <div ref={modalRef} className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-full overflow-hidden flex flex-col">
                {/* Stängningsknapp */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2 bg-white bg-opacity-75"
                    aria-label="Stäng bildgalleri"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                {/* Bildgalleri */}
                <div className="flex-grow overflow-hidden p-4">
                    {images && images.length > 0 ? (
                        <Carousel
                            initialSlide={initialSlide}
                            pagination={{ clickable: true }}
                            navigation={true} // Lägg till navigeringspilar
                            breakpoints={productGalleryModalResponsive}
                            className="w-full h-full"
                            buttonGroupClassName="hidden md:flex" // Visa pilar på desktop
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={`modal-gallery-${index}`} className="flex items-center justify-center">
                                    <img
                                        src={image.original}
                                        alt={`Produktbild ${index + 1}`}
                                        className="max-w-full max-h-[80vh] object-contain mx-auto" // Begränsa storlek för att passa modalen
                                    />
                                </SwiperSlide>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Inga bilder att visa.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};