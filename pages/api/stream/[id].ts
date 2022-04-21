import { NextApiRequest, NextApiResponse } from 'next';
import { resolveStreamUrl } from '../../../resolvers/soundcloud';


const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    const { query } = request;
    const { id } = query;

    const url = await resolveStreamUrl({ id: Number(id) });

    response.status(200).json({ url });
};

export default handler;
