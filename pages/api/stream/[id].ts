import { NextApiRequest, NextApiResponse } from 'next';
import { resolveStreamUrl } from '../../../resolvers/soundcloud';


const handler = async ({ query }: NextApiRequest, response: NextApiResponse) => {
    const url = await resolveStreamUrl({ id: Number(query.id) });

    response.status(200).json({ url });
};

export default handler;
