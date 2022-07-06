import service from './service.js';

const createUser = (req, res) => {
    service.createUser(req.body).then((user) => {
        if (user) {
            res.send({
                success: true,
                payload: {
                    message: "User created",
                    data: {
                        user
                    }
                }
            })
        }
    }).catch((err) => {
        console.error("user not created", err);

        res.status(500).send({
            success: false,
            error: {
                code: '500',
                error: err
            }
        })
    })
};

const getUsers = (req, res) => {
    service.getUsers(req.params.page).then((users) => {
        res.send({
            success: true,
            payload: {
                data: {
                    ...users
                }
            }
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).send({
            success: false,
            error: {
                code: '500',
                error: err
            }
        });
    });
}

const updateUser = (req, res) => {
    service.updateUser(req.params.id, req.body).then((user) => {
        res.send({
            success: true,
            payload: {
                message: "User updated",
                data: {
                    user
                }
            }
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).send({
            success: false,
            error: {
                code: '500',
                error: err
            }
        });
    });
}

const deleteUser = (req, res) => {
    service.deleteUser(req.params.id).then((resp) => {
        if (resp == 1) {
            res.send({
                success: true,
                payload: {
                    message: "User deleted",
                }
            })
        } else {
            res.status(500).send({
                success: false,
                error: {
                    code: '500',
                    message: "User do not exist"
                }
            });
        }

    }).catch((err) => {
        res.status(500).send({
            success: false,
            error: {
                code: '500',
                error: err
            }
        });
    })
}

const controller = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};

export default controller;