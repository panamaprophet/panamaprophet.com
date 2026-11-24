import { TrackList } from '@/features/playback';
import type { Release } from '@/entities/release';
import { Links } from '@/shared/ui/Links';

const toLines = (input: string) => {
    return input
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
};

interface Props {
    release: Release,
    reverse?: boolean,
}

export const ReleaseSection = ({ release, reverse = false }: Props) => {
    const { title, description, tracks, media, links = {} } = release;

    const rowClassName = reverse
        ? 'flex flex-col gap-8 py-4 md:flex-row-reverse'
        : 'flex flex-col gap-8 py-4 md:flex-row';

    const paragraphs = toLines(description);

    return (
        <div className="mb-16 flex flex-col gap-8 px-4 last:mb-0">
            <div className={rowClassName}>
                <div className="relative h-0 w-full shrink-0 pb-[100%] md:w-1/2 md:pb-[50%] *:absolute *:inset-0 *:size-full *:object-cover">
                    {media.image && <img src={media.image} alt={title} loading="lazy" decoding="async" />}
                    {media.video && <iframe src={media.video} title={title} loading="lazy" allowFullScreen />}
                </div>

                <div className="flex flex-col justify-center gap-8 px-4">
                    <h2 className="text-[2.5em] leading-[1.17em] font-thin">
                        {title}
                    </h2>

                    <div className="flex flex-col gap-5.5 pb-4 leading-[1.8] text-[#666]">
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
