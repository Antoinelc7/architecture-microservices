const ModelUser = require("./model")
const jwt = require("jsonwebtoken")
const secretKey = 'zef11821csifz&872E2';

class User {
    /** 
     *  @url=/user
     *  @method=GET
     */
    static async allUsers(req, res) {
        try {
            const users = await ModelUser.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
        }
    }

    /** 
     *  @url=/user/:id
     *  @method=GET
     */
    static async oneUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await ModelUser.findOne({ _id: userId });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "Utilisateur non trouvé." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur." });
        }
    }

    /** 
     *  @url=/user/auth
     *  @method=POST
     */
    static async authUser(req, res) {
        const { login, password } = req.body;
        try {

            const user = await ModelUser.findOne({ login, password });

            if (user) {

                const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
                res.status(200).json({ message: "Authentification réussie.", token });

            } else {

                res.status(401).json({ error: "Identifiants incorrects." });

            }
        } catch (error) {

            res.status(500).json({ error: "Erreur lors de l'authentification de l'utilisateur." });

        }
    }

    /** 
     *  @url=/user
     *  @method=PUT
     */
    static async updateUser(req, res) {
        const userId = req.params.id;
        const updatedUser = req.body;
        try {
            const user = await ModelUser.findOne({ _id: userId });
            if (user) {

                Object.assign(user, updatedUser);
                await user.save();
                res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
                
            } else {

                res.status(404).json({ error: "Utilisateur non trouvé." });

            }
        } catch (error) {

            res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur." });

        }
    }

    /** 
     *  @url=/user
     *  @method=PATCH
     */
    static async partialUpdateUser(req, res) {
        const userId = req.params.id;
        const updatedFields = req.body;
        try {
            const user = await ModelUser.findOne({ _id: userId });
            if (user) {
                Object.assign(user, updatedFields);
                await user.save();
                res.status(200).json({ message: "Mise à jour réussie." });
            } else {
                res.status(404).json({ error: "Utilisateur non trouvé." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
        }
    }


    /** 
     *  @url=/user/:id
     *  @method=DELETE
     */
    static async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await ModelUser.findOne({ _id: userId });
            if (user) {
                await user.delete();
                res.status(200).json({ message: "Utilisateur supprimé avec succès." });
            } else {
                res.status(404).json({ error: "Utilisateur non trouvé." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
        }
    }
}

module.exports = User