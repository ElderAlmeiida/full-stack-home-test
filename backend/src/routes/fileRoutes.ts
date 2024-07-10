import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { parseCSV } from '../utils';
import { data } from '../database';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No files sent.' });
    }

    try {
        const rows = await parseCSV(req.file.buffer);
        data.rows = rows;  // Atualiza a estrutura de dados com os novos dados CSV
        res.status(200).json({ message: 'The file was sent successfully.' });
    } catch (error) {
        next(error);
    }
});

export default router;
