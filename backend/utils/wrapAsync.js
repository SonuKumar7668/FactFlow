export const wrapAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
                // console.log(err.status);
                return res.status(500).json({ "error": "Enternal Server Error" });
        });
    }
}