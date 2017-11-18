const mongoose = require( "mongoose" );

// 数据可 job
const DB_URL = "mongodb://localhost:27017/job";
mongoose.connect( DB_URL );

const connection = mongoose.connection;
connection.on( "connected", function () {
    console.log( "mongodb is connected" );
});
connection.on( "error", function () {
    console.log( "connected has an error" );
});


const models = {
    user: {
        "user": {
            type: String,
            require: true
        },
        "pwd": {
            type: String,
            require: true
        },
        "type": {
            type: String,
            require: true
        },
        "avatar": {
            type: String
        },
        // 个人简介
        "desc": {
            type: String
        },
        // 职位名称
        "title": {
            type: String
        },
        "company": {
            type: String
        },
        "money": {
            type: String
        }
    },
    chat: {
        "chatid": { type: String, require: true, },
        "from": { type: String, require: true },
        "to": { type: String, require: true },
        "read": { type: Boolean, default: false },
        "content": { type: String, require: true, default: "" },
        "create_time": { type: Number, default: new Date().getTime() }
    }
};
for ( let m in models ) {
    mongoose.model( m, new mongoose.Schema( models[m] ) );
}
module.exports = {
    getModel: function ( name ) {
        return mongoose.model( name );
    }
}