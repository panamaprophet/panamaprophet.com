import { Image } from '../Image';
import { Video } from '../Video';
import type { Release } from '../../model';

export const ReleaseMedia = ({ release: { title, media } }: { release: Release }) => (
    <>
        {media.image && <Image src={media.image} alt={title} />}
        {media.video && <Video src={media.video} title={title} />}
    </>
);
