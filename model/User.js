var mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    email: String,
    senha: String,
    isAdmin: Boolean
});

const UserModel = mongoose.model("User", usersSchema);

module.exports = {
    list: async function() {
        const users = await UserModel.find({}).lean();
        return users;
    },
    
    save: async function(nome, idade, email, senha) {
        const users = new UserModel({
            nome: nome,
            idade: idade,
            email: email,
            senha: senha
        });
        await users.save();
        return users;
    },

    update: async function(email, obj) {
        let users = await UserModel.findOneAndUpdate({ email: email } , obj);
    },

    delete: async function(id) {
        return await UserModel.findByIdAndDelete(id);
    },

    getById: async function(id) {
        return await UserModel.findById(id).lean();
    },

    getByEmailAndSenha: async function(email, senha) {
        return await UserModel.find({ email: email, senha: senha });
    },

    getByEmail: async function(email) {
        return await UserModel.find({ email: email });
    }
}