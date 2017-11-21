const mongoose = require( "mongoose" );

// 连接  数据库 job
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

        // 用户名
        "user": { type: String, require: true },

        // 用户密码
        "pwd": { type: String,  require: true },

        // 用户类型 boss or genius
        "type": {  type: String,require: true },

        // 用户头像
        "avatar": { type: String },

        // 用户个人简介
        "desc": { type: String },

        // 职位名称 
        "title": { type: String },

        // 公司名称 只有用户类型为 boss 的用户拥有这个字段
        "company": { type: String },

        // 职位薪资 只有用户类型为 boss 的用户拥有这个字段
        "money": { type: String }
    },
    chat: {

        // 聊天对话 id
        "chatid":      { type: String, require: true, },

        // 发送方 id
        "from":        { type: String, require: true },

        // 接收方 id
        "to":          { type: String, require: true },

        // 聊天信息是否已读
        "read":        { type: Boolean, default: false },

        // 连天内容 这里指每一条聊天信息的内容
        "content":     { type: String, require: true, default: "" },

        // 聊天信息创建时间 或者发送时间
        "create_time": { type: Number, default: Date.now }
    }
};

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
// 每个模式映射到 MongoDB 集合，并定义该集合内的文档的形状。对应 mysql 中可以将 schema 理解为对表结构的定义
// 使用 new mongogse.Schema( object ) 来定义模式 defining scheam
// 模型 model 有 schema 编译生成 具有抽象的属性和行为 存在一些静态方法和实例方法 
// Models are fancy constructors compiled from our Schema definitions
// model 的每一个实例就是一个 document，document 是 MongoDB 中数据的基本单元 document 可以保存到数据库和在数据可中检索
// 所有数据中文档的创建和检索都由模型来处理
// 使用 mongoose.model( name, schema ) 来创建模型

for ( let m in models ) {
    mongoose.model( m, new mongoose.Schema( models[m] ) );
}
module.exports = {
    getModel: function ( name ) {
        return mongoose.model( name );
    }
}