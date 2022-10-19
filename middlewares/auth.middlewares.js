
const isLoggesIn = (req, res, next) => {
    if(req.session.activeUser === undefined) {
       //si no tienes sesión fuera de aquí
       res.redirect("/auth/login")
    }
    else {
       //bienvenido, continúa con la ruta
       next()
    }
   }
   
   module.exports = {
       isLoggesIn
   }