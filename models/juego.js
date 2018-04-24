var mongoose = require('mongoose');

var juegoSchema = mongoose.Schema({
    juego: {
            nombre_juego: String,
            ranking: [{  
                       username: String,
                       ganadas:Number,
                       perdidas: Number,
                       empatadas: Number,
                   }],
    },
});


module.exports = mongoose.model('Juego', juegoSchema);