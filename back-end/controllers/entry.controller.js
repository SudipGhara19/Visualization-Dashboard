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
        res.status(201).json(savedEntry);
    }catch(error){
        console.log(error);
        next(error);
    }
}

