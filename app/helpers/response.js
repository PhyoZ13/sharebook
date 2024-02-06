const success = (res,message = "Successfully", data = []) => {
    return res.json({
        status : true,
        message : message,
        data : data
    },200);
}

const error = (res, message = "") => {
    return res.json({
        status : false,
        message : message
    },400);
}

module.exports = {
    success,
    error
}