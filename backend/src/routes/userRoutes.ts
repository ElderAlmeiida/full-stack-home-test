import { Router, Request, Response } from 'express';
import { searchCSV } from '../utils';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const query = req.query.q?.toString() || '';
    try {
        const filteredData = searchCSV(query);
        res.status(200).json({ data: filteredData });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados.' });
    }
});

export default router;
