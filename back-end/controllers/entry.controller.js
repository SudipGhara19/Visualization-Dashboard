import errorHandler from "../utils/errorHandler.js"
import Entry from "../models/entry.model.js"


// create new entry API--
export const createEntry = async (req, res, next) => {
    if(!req.body || req.body === ""){
        next(errorHandler(403, 'Please provide all the required fields.'));
        return;
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
     const newEntry = new Entry({
        ...req.body,
        slug,
    });

    try{
        const savedEntry = await newEntry.save();
        res.status(201).json({
            savedEntry,
            message: 'New entry created successfully.'
        });
    }catch(error){
        console.log(error);
        next(error);
    }
}

//creating API for Multiple-Entries or an Array of entries
export const createMultipleEntry = async (req, res, next) => {
    if(!req.body || !Array.isArray(req.body) || req.body.length === 0){
        next(errorHandler(403, 'Please provide more than one entry.'))
        return;
    }

    const entries = req.body.map((entry) => {
        if(!entry.title){
            next(errorHandler(403, 'Each entry mush have a title.'))
            return;
        }

        const slug = entry.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
        return {
            ...entry,
            slug,
        }
    });

    const totalEntries = entries.length;

    try{
        const savedEntries = await Entry.insertMany(entries);
        res.status(201).json({
            savedEntries,
            totalEntries,
            message: `New ${totalEntries} entries created successfully.`,

        });
        
    }catch(error){
        console.log(error);
        next(error);
    }
}