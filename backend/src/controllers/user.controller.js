import * as userRepo from "../repositories/user.repository.js";

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundUser = await userRepo.findById(id);
    
        if (!foundUser){
            const error = new Error(`User with ID ${id} not found`);
            error.statusCode = 404; 
            return next(error); // Pass to Express global error handler
        }
        return res.status(200).json({ status: 'success', data: foundUser });
    } catch (error) {
        if (error.name === 'CastError') {
            error.message = 'Invalid ID format provided';
            error.statusCode = 400;
        }
        
        return next(error);      
    }

}

export const updateUserPreference = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundUser = await userRepo.findById(id);
        if (!foundUser){
            const error = new Error(`User with ID ${id} not found`);
            error.statusCode = 404; 
            return next(error); // Pass to Express global error handler
        }

        await userRepo.updatePreferences(id, req.body);
        res.status(200).json({ status: "success" });

    } catch (error) {
        error.statusCode = error.statusCode || 500;
        return next(error);
    }
}


