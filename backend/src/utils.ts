import csv from 'csv-parser';
import { data } from './database';

export const parseCSV = (buffer: Buffer): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        const stream = csv();

        stream.on('data', (data) => results.push(data));
        stream.on('end', () => resolve(results));
        stream.on('error', reject);

        stream.write(buffer);
        stream.end();
    });
};

export const searchCSV = (query: string): any[] => {
    if (!query) return data.rows;
    const lowerCaseQuery = query.toLowerCase();
    return data.rows.filter(row =>
        Object.values(row).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(lowerCaseQuery)
        )
    );
};
