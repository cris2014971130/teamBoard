import role from "../models/role.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Datos incompletos");
  //el primero que encuentre findOne
  //utilizado porque se necesita solo saber que exista un rol
  const existingRole = await role.findOne({name: req.body.name}); 
    if(existingRole)
        return res.status(400).send("Este rol ya existe");
    const roleSchema = new role({
        name: req.body.name,
        description: req.body.description,
        dbStatus: true,
    });
    
    const result = await roleSchema.save();
    if(!result) res.sendStatus(500).send("No se pudo agregar en la BD");  
    return res.status(200).send({result});    
};

export default {registerRole}
