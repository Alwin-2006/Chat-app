const errorMiddleware = (err,req,res,next) => {
    try{
        let error = {...err};
        if(err.code === 11000){
            const message = 'Duplicate field!';
            error = new Error(message);
            error.statusCode = 400; 
        }
        if(err.name === 'CastError'){
            error = new Error('Wrong datatype!');
            error.statusCode = 404;
        }
        if(err.name === 'ValidationError'){
            const msg = Object.values(err.errors).map(e => e.message);
            error = new Error(msg.join(', '));
        }
        res.status(error.statusCode || err.statusCode || 500).json({success:false, error: error.message || 'Server error'});
    }catch(error){
        next(error);
    }
}
export default errorMiddleware;