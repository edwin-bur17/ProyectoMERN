import mongoose from "mongoose"
import bcrypt from "bcrypt"

// Creación del modelo usuario
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,

}
);

// Antes de que se guarde en la bd
usuarioSchema.pre('save', async function(next){
    if (!this.isModified("password")) { // si no esta modificado el password
        next()
    }
    
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("usuario", usuarioSchema)
export default Usuario;