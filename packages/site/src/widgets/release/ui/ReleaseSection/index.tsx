import { TrackList } from '@/features/playback';
import type { Release } from '@/entities/release';
import { Links } from '@/shared/ui/Links';
import './index.css';

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
        ? 'release-section__row release-section__row_reverse'
        : 'release-section__row';

    const paragraphs = toLines(description);

    return (
        <div className="release-section">
            <div className={rowClassName}>
                <div className="release-section__media">
                    {media.image && <img src={media.image} alt={title} loading="lazy" decoding="async" />}
                    {media.video && <iframe src={media.video} title={title} loading="lazy" allowFullScreen />}
                </div>

                <div className="release-section__info">
                    <h2 className="release-section__title">
                        {title}
                    </h2>

                    <div className="release-section__description">
                        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>

                    <Links urls={links} />
                </div>
            </div>

            <div className="release-section__row">
                {tracks && <TrackList tracks={tracks} />}
            </div>
        </div>
    );
};
