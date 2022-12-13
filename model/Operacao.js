var mongoose = require('mongoose');

const operacaoSchema = new mongoose.Schema({
    email: String,
    valor1: String,
    valor2: String,
    resultado: String,
    dificuldade: String,
    correcao: String
});

const OperacaoModel = mongoose.model("Operacao", operacaoSchema);

module.exports = {
    list: async function() {
        const operacao = await OperacaoModel.find({}).lean();
        return operacao;
    },
    
    save: async function(email, valor1, valor2, resultado, dificuldade, correcao) {
        console.log("aqui")
        const operacao = new OperacaoModel({
            email: email,
            valor1: valor1,
            valor2: valor2,
            resultado: resultado,
            dificuldade: dificuldade,
            correcao: correcao
        });
        await operacao.save();
        return operacao;
    },

    getByEmail: async function(email) {
        return await OperacaoModel.find({ email: email });
    }
}