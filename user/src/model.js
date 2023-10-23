const users = require("./models/User");

class User {

    _id 
    firstName
    lastName
    login
    password

    constructor(config  = {}){
        this._id        = config._id
        this.firstName  = config.firstName
        this.lastName   = config.lastName
        this.login      = config.login
        this.password   = config.password
    }

    static async findOne(query){
        return new Promise((resolve,reject) => {
            users.findOne(query, (err,doc) => {
                if (err){
                    return reject(err)
                }

                if (!doc){
                    return resolve(doc)
                }

                resolve(new this(doc))
            })
        })
    }

    static find(query){
        return new Promise((resolve,reject) => {
            user.find(query, (err,doc) => {
                if (err){
                    return reject(err)
                }

                if (!doc){
                    return resolve(doc)
                }

                let result = []
                for (let data of doc){
                    result.push(new this(data))
                }
                resolve(result)
            })
        })
    }

    async delete(){
        return new Promise((resolve, reject) => {
            user.remove({_id: this._id},(err) => {
                err ? reject(false) : resolve(true)
            })
        })
    }

    async save(){        
        return new Promise((resolve, reject) => {
            if (this._id){
                user.update({_id: this._id},this,(err) => {
                    err ? reject(false) : resolve(true)
                })
            } else {
                user.insert(this,(err) =>{
                    err ? reject(false) : resolve(true)
                })
            }
        })
    }

}

module.exports = User