import React from 'react'

export default function ParshaModal({ parsha, onClose }) {
    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-end"
            onClick={onClose}
        >
            <div
                className="bg-background-secondary rounded-t-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-11 h-1 bg-white/25 rounded-full" />
                </div>

                {/* Content */}
                <div className="px-8 pb-8">
                    {/* Close button */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-full bg-background-secondary flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-5xl mb-2 text-text-primary">
                        {parsha.english || parsha.name}
                    </h2>

                    {/* Hebrew title */}
                    {parsha.hebrew && (
                        <p className="text-2xl text-brand-primary text-right mb-1" style={{ direction: 'rtl' }}>
                            {parsha.hebrew}
                        </p>
                    )}

                    {/* Verses */}
                    {parsha.verses && (
                        <p className="text-base text-text-muted mb-4">
                            {parsha.verses}
                        </p>
                    )}

                    {/* Blurb */}
                    {parsha.blurb && (
                        <p className="text-base text-text-primary leading-relaxed mt-4">
                            {parsha.blurb}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}