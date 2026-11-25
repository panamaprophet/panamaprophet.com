import { TrackList } from '@/features/playback';
import type { Release } from '@/entities/release';
import { Links } from '@/shared/ui/Links';

const toLines = (input: string) => {
    return input
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
};

export const ReleaseSection = ({ release }: { release: Release }) => {
    const { title, description, tracks, media, links = {} } = release;

    const paragraphs = toLines(description);

    return (
        <div className="group mb-16 flex flex-col gap-8 px-4 last:mb-0">
            <div className="flex flex-col gap-8 py-4 md:flex-row md:group-even:flex-row-reverse">
                <div className="aspect-square w-full shrink-0 self-start md:w-1/2 *:size-full *:object-cover">
                    {media.image && <img src={media.image} alt={title} loading="lazy" decoding="async" />}
                    {media.video && <iframe src={media.video} title={title} loading="lazy" allowFullScreen />}
                </div>

                <div className="flex flex-col justify-center gap-8 px-4">
                    <h2 className="text-[2.5em] leading-[1.17em] font-thin">
                        {title}
                    </h2>

                    <div className="flex flex-col gap-4 leading-[1.8] text-[#666]">
                        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>

                    <Links urls={links} />
                </div>
            </div>

            <div className="flex py-4">
                {tracks && <TrackList tracks={tracks} />}
            </div>
        </div>
    );
};
